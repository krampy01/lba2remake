import React from 'react';
import DebugData from '../../../DebugData';

export const SceneGraphNode = {
    type: 'SceneGraphNode',
    dynamic: true,
    needsData: true,
    style: {
        height: 20,
        fontSize: 16,
        lineHeight: '20px'
    },
    key: (obj, idx) => idx,
    name: obj => obj.name || obj.uuid.substr(0, 8),
    icon: (obj) => {
        switch (obj.type) {
            case 'Mesh':
                return 'editor/icons/mesh.png';
            case 'LineSegments':
                return 'editor/icons/lines.png';
            case 'PerspectiveCamera':
                return 'editor/icons/camera.png';
        }
        return 'editor/icons/three.png';
    },
    numChildren: obj => obj.children.length,
    child: () => SceneGraphNode,
    childData: (obj, idx) => obj.children[idx],
    props: obj => [
        {
            id: 'visible',
            value: obj.visible,
            render: (value) => {
                const toggleVisible = () => {
                    obj.visible = !obj.visible;
                };
                return <img style={{cursor: 'pointer'}} onClick={toggleVisible} src={`editor/icons/${value ? 'visible' : 'hidden'}.png`}/>;
            }
        },
        {
            id: 'type',
            value: obj.type,
            render: value => <span style={{color: '#037acc'}}>{value}</span>
        }
    ],
    onClick: () => {}
};

export const SceneGraphRootNode = {
    dynamic: true,
    name: () => {
        const scene = DebugData.scope.scene;
        if (scene) {
            return `Scene #${scene.index}`;
        }
        return 'None';
    },
    icon: () => 'editor/icons/areas/graph.png',
    iconStyle: {
        width: 16,
        height: 16
    },
    numChildren: () => {
        const scene = DebugData.scope.scene;
        if (scene && scene.threeScene) {
            return 1;
        }
        return 0;
    },
    child: () => SceneGraphNode,
    childData: () => {
        const scene = DebugData.scope.scene;
        return scene && scene.threeScene;
    }
};
