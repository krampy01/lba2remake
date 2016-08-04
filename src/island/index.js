import async from 'async';
import THREE from 'three';
import _ from 'lodash';

import {loadHqrAsync} from '../hqr';
import {prepareGeometries} from './geometries';
import {loadLayout} from './layout';
import {loadGround} from './ground';
import {loadSea} from './sea';
import {loadObjects} from './objects';
import {loadTexture} from '../texture';

export function loadIsland({name, skyIndex, skyColor, fogDensity}, callback) {
    async.auto({
        ress: loadHqrAsync('RESS.HQR'),
        ile: loadHqrAsync(`${name}.ILE`),
        obl: loadHqrAsync(`${name}.OBL`)
    }, function(err, files) {
        callback(loadIslandSync(files, skyIndex, skyColor, fogDensity));
    });
}

function loadTextureTest(island, object) {
    _.each(island.layout.groundSections, section => {
        for (let i = 0; i < section.triangles.length / 2; ++i) {
            const flags = [section.triangles[i * 2], section.triangles[i * 2 + 1]];
            const bits = (bitfield, offset, length) => (bitfield & (((1 << length) - 1)) << offset) >> offset;
            const indexes = _.map(flags, f => bits(f, 19, 13));
            const uvs = _.map(indexes, index => {
                const offset = index * 12;
                return [
                    section.textureInfo[offset + 1], section.textureInfo[offset + 3],
                    section.textureInfo[offset + 5], section.textureInfo[offset + 7],
                    section.textureInfo[offset + 9], section.textureInfo[offset + 11]
                ];
            });
        }
    });
    object.add(new THREE.Mesh(new THREE.PlaneGeometry(128, 128, 1, 1), new THREE.MeshBasicMaterial({
        map: loadTexture(island.files.ile.getEntry(1), island.palette)
    })));
}

function loadIslandSync(files, skyIndex, skyColor, fogDensity) {
    const island = {
        files: files,
        palette: new Uint8Array(files.ress.getEntry(0)),
        layout: loadLayout(files.ile),
        skyIndex: skyIndex,
        skyColor: skyColor,
        fogDensity: fogDensity
    };

    const object = new THREE.Object3D();
    loadTextureTest(island, object);
    /*
    const geometries = loadGeometries(island);
    _.each(geometries, ({positions, uvs, colors, uvGroups, material}, name) => {
        if (positions && positions.length > 0) {
            const bufferGeometry = new THREE.BufferGeometry();
            bufferGeometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
            if (uvs) {
                bufferGeometry.addAttribute('uv', new THREE.BufferAttribute(new Uint8Array(uvs), 2, true));
            }
            if (colors) {
                bufferGeometry.addAttribute('color', new THREE.BufferAttribute(new Uint8Array(colors), 4, true));
            }
            if (uvGroups) {
                bufferGeometry.addAttribute('uvGroup', new THREE.BufferAttribute(new Uint8Array(uvGroups), 4, true));
            }
            const mesh = new THREE.Mesh(bufferGeometry, material);
            mesh.name = name;
            object.add(mesh);
        }
    });

    const sky = new THREE.Mesh(new THREE.PlaneGeometry(128, 128, 1, 1), geometries.sky.material);
    sky.rotateX(Math.PI / 2.0);
    sky.position.y = 2.0;
    object.add(sky);
    */

    return object;
}

function loadGeometries(island) {
    const geometries = prepareGeometries(island);
    const usedTiles = {};
    const objects = [];

    _.each(island.layout.groundSections, section => {
        const tilesKey = [section.x, section.z].join(',');
        usedTiles[tilesKey] = [];
        loadGround(island, section, geometries, usedTiles[tilesKey]);
        loadObjects(island, section, geometries, objects);
    });

    _.each(island.layout.seaSections, section => {
        const xd = Math.floor(section.x / 2);
        const zd = Math.floor(section.z / 2);
        const offsetX = 1 - Math.abs(section.x % 2);
        const offsetZ = Math.abs(section.z % 2);
        const tilesKey = [xd, zd].join(',');
        loadSea(section, geometries, usedTiles[tilesKey], offsetX, offsetZ, island.skyIndex);
    });

    return geometries;
}
