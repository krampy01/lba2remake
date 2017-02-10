import * as lf from '../process/life';
import * as st from '../process/structural';
import Indent from '../indent';

export const LifeOpcode = [
    { opcode: 0x00, command: "END", callback: st.END, indent: Indent.KEEP },
    { opcode: 0x01, command: "NOP", callback: st.NOP, indent: Indent.KEEP },
    { opcode: 0x02, command: "SNIF", callback: st.SNIF, args: ['_Uint16:offset'], condition: true, operator: true, indent: Indent.ADD},
    { opcode: 0x03, command: "OFFSET", callback: st.OFFSET, indent: Indent.KEEP},
    { opcode: 0x04, command: "NEVERIF", callback: st.NEVERIF, args: ['_Uint16:offset'], condition: true, operator: true, indent: Indent.ADD},
    { opcode: 0x05, command: "UNKNOWN(0x05)", callback: st.NOP, indent: Indent.KEEP},
    { opcode: 0x06, command: "UNKNOWN(0x06)", callback: st.NOP, indent: Indent.KEEP},
    { opcode: 0x07, command: "UNKNOWN(0x07)", callback: st.NOP, indent: Indent.KEEP},
    { opcode: 0x08, command: "UNKNOWN(0x08)", callback: st.NOP, indent: Indent.KEEP},
    { opcode: 0x09, command: "UNKNOWN(0x09)", callback: st.NOP, indent: Indent.KEEP},
    { opcode: 0x0A, command: "PALETTE", callback: lf.PALETTE, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x0B, command: "RETURN", callback: st.RETURN, indent: Indent.KEEP},
    { opcode: 0x0C, command: "IF", callback: st.IF, args: ['_Uint16:offset'], condition: true, operator: true, indent: Indent.ADD},
    { opcode: 0x0D, command: "SWIF", callback: st.SWIF, args: ['_Uint16:offset'], condition: true, operator: true, indent: Indent.ADD},
    { opcode: 0x0E, command: "ONEIF", callback: st.ONEIF, args: ['_Uint16:offset'], condition: true, operator: true, indent: Indent.ADD},
    { opcode: 0x0F, command: "ELSE", callback: st.ELSE, args: ['_Uint16:offset'], indent: Indent.SUB_ADD},
    { opcode: 0x10, command: "ENDIF", callback: st.ENDIF, indent: Indent.SUB},
    { opcode: 0x11, command: "BODY", callback: lf.BODY, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x12, command: "BODY_OBJ", callback: lf.BODY_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x13, command: "ANIM", callback: lf.ANIM, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x14, command: "ANIM_OBJ", callback: lf.ANIM_OBJ, args: ['Uint8:actor', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x15, command: "SET_CAMERA", callback: lf.SET_CAMERA, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x16, command: "CAMERA_CENTER", callback: lf.CAMERA_CENTER, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x17, command: "SET_TRACK", callback: st.SET_TRACK, args: ['Int16'], indent: Indent.KEEP},
    { opcode: 0x18, command: "SET_TRACK_OBJ", callback: st.SET_TRACK_OBJ, args: ['Uint8:actor', 'Int16'], indent: Indent.KEEP},
    { opcode: 0x19, command: "MESSAGE", callback: lf.MESSAGE, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x1A, command: "CAN_FALL", callback: lf.CAN_FALL, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x1B, command: "SET_DIRMODE", callback: lf.SET_DIRMODE, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x1C, command: "SET_DIRMODE_OBJ", callback: lf.SET_DIRMODE_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x1D, command: "CAM_FOLLOW", callback: lf.CAM_FOLLOW, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x1E, command: "SET_BEHAVIOUR", callback: lf.SET_BEHAVIOUR, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x1F, command: "SET_VAR_CUBE", callback: lf.SET_VAR_CUBE, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x20, command: "COMPORTEMENT", callback: st.COMPORTEMENT, args: ['Uint8'], indent: Indent.ADD},
    { opcode: 0x21, command: "SET_COMPORTEMENT", callback: st.SET_COMPORTEMENT, args: ['Uint16:offset'], indent: Indent.KEEP},
    { opcode: 0x22, command: "SET_COMPORTEMENT_OBJ", callback: st.SET_COMPORTEMENT_OBJ, args: ['Uint8:actor', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x23, command: "END_COMPORTEMENT", callback: st.END_COMPORTEMENT, indent: Indent.SUB},
    { opcode: 0x24, command: "SET_VAR_GAME", callback: lf.SET_VAR_GAME, args: ['Uint8', 'Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x25, command: "KILL_OBJ", callback: lf.KILL_OBJ, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x26, command: "SUICIDE", callback: lf.SUICIDE, indent: Indent.KEEP},
    { opcode: 0x27, command: "USE_ONE_LITTLE_KEY", callback: lf.USE_ONE_LITTLE_KEY, indent: Indent.KEEP},
    { opcode: 0x28, command: "GIVE_GOLD_PIECES", callback: lf.GIVE_GOLD_PIECES, args: ['Int16'], indent: Indent.KEEP},
    { opcode: 0x29, command: "END_LIFE", callback: lf.END_LIFE, indent: Indent.KEEP},
    { opcode: 0x2A, command: "STOP_CURRENT_TRACK", callback: st.STOP_CURRENT_TRACK, indent: Indent.KEEP},
    { opcode: 0x2B, command: "RESTORE_LAST_TRACK", callback: st.RESTORE_LAST_TRACK, indent: Indent.KEEP},
    { opcode: 0x2C, command: "MESSAGE_OBJ", callback: lf.MESSAGE_OBJ, args: ['Uint8:actor', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x2D, command: "INC_CHAPTER", callback: lf.INC_CHAPTER, indent: Indent.KEEP},
    { opcode: 0x2E, command: "FOUND_OBJECT", callback: lf.FOUND_OBJECT, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x2F, command: "SET_DOOR_LEFT", callback: lf.SET_DOOR_LEFT, args: ['Int16'], indent: Indent.KEEP},
    { opcode: 0x30, command: "SET_DOOR_RIGHT", callback: lf.SET_DOOR_RIGHT, args: ['Int16'], indent: Indent.KEEP},
    { opcode: 0x31, command: "SET_DOOR_UP", callback: lf.SET_DOOR_UP, args: ['Int16'], indent: Indent.KEEP},
    { opcode: 0x32, command: "SET_DOOR_DOWN", callback: lf.SET_DOOR_DOWN, args: ['Int16'], indent: Indent.KEEP},
    { opcode: 0x33, command: "GIVE_BONUS", callback: lf.GIVE_BONUS, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x34, command: "CHANGE_CUBE", callback: lf.CHANGE_CUBE, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x35, command: "OBJ_COL", callback: lf.OBJ_COL, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x36, command: "BRICK_COL", callback: lf.BRICK_COL, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x37, command: "OR_IF", callback: st.OR_IF, args: ['_Uint16:offset'], precond: true, condition: true, operator: true, indent: Indent.KEEP},
    { opcode: 0x38, command: "INVISIBLE", callback: lf.INVISIBLE, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x39, command: "SHADOW_OBJ", callback: lf.SHADOW_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x3A, command: "POS_POINT", callback: lf.POS_POINT, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x3B, command: "SET_MAGIC_LEVEL", callback: lf.SET_MAGIC_LEVEL, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x3C, command: "SUB_MAGIC_POINT", callback: lf.SUB_MAGIC_POINT, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x3D, command: "SET_LIFE_POINT_OBJ", callback: lf.SET_LIFE_POINT_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x3E, command: "SUB_LIFE_POINT_OBJ", callback: lf.SUB_LIFE_POINT_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x3F, command: "HIT_OBJ", callback: lf.HIT_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x40, command: "PLAY_SMK", callback: lf.PLAY_SMK, args: ['string'], indent: Indent.KEEP},
    { opcode: 0x41, command: "ECLAIR", callback: lf.ECLAIR, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x42, command: "INC_CLOVER_BOX", callback: lf.INC_CLOVER_BOX, indent: Indent.KEEP},
    { opcode: 0x43, command: "SET_USED_INVENTORY", callback: lf.SET_USED_INVENTORY, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x44, command: "ADD_CHOICE", callback: lf.ADD_CHOICE, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x45, command: "ASK_CHOICE", callback: lf.ASK_CHOICE, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x46, command: "INIT_BUGGY", callback: lf.INIT_BUGGY, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x47, command: "MEMO_SLATE", callback: lf.MEMO_SLATE, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x48, command: "SET_HOLO_POS", callback: lf.SET_HOLO_POS, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x49, command: "CLR_HOLO_POS", callback: lf.CLR_HOLO_POS, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x4A, command: "ADD_FUEL", callback: lf.ADD_FUEL, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x4B, command: "SUB_FUEL", callback: lf.SUB_FUEL, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x4C, command: "SET_GRM", callback: lf.SET_GRM, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x4D, command: "SET_CHANGE_CUBE", callback: lf.SET_CHANGE_CUBE, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x4E, command: "MESSAGE_ZOE", callback: lf.MESSAGE_ZOE, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x4F, command: "FULL_POINT", callback: lf.FULL_POINT, indent: Indent.KEEP},
    { opcode: 0x50, command: "BETA", callback: lf.BETA, args: ['Int16'], indent: Indent.KEEP},
    { opcode: 0x51, command: "FADE_TO_PAL", callback: lf.FADE_TO_PAL, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x52, command: "ACTION", callback: lf.ACTION, indent: Indent.KEEP},
    { opcode: 0x53, command: "SET_FRAME", callback: lf.SET_FRAME, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x54, command: "SET_SPRITE", callback: lf.SET_SPRITE, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x55, command: "SET_FRAME_3DS", callback: lf.SET_FRAME_3DS, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x56, command: "IMPACT_OBJ", callback: lf.IMPACT_OBJ, args: ['Uint8:actor', 'Uint16', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x57, command: "IMPACT_POINT", callback: lf.IMPACT_POINT, args: ['Uint8', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x58, command: "ADD_MESSAGE", callback: lf.ADD_MESSAGE, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x59, command: "BALLOON", callback: lf.BALLOON, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x5A, command: "NO_SHOCK", callback: lf.NO_SHOCK, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x5B, command: "ASK_CHOICE_OBJ", callback: lf.ASK_CHOICE_OBJ, args: ['Uint8:actor', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x5C, command: "CINEMA_MODE", callback: lf.CINEMA_MODE, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x5D, command: "SAVE_HERO", callback: lf.SAVE_HERO, indent: Indent.KEEP},
    { opcode: 0x5E, command: "RESTORE_HERO", callback: lf.RESTORE_HERO, indent: Indent.KEEP},
    { opcode: 0x5F, command: "ANIM_SET", callback: lf.ANIM_SET, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x60, command: "RAIN", callback: lf.RAIN, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x61, command: "GAME_OVER", callback: lf.GAME_OVER, indent: Indent.KEEP},
    { opcode: 0x62, command: "THE_END", callback: lf.THE_END, indent: Indent.KEEP},
    { opcode: 0x63, command: "ESCALATOR", callback: lf.ESCALATOR, indent: Indent.KEEP},
    { opcode: 0x64, command: "PLAY_MUSIC", callback: lf.PLAY_MUSIC, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x65, command: "TRACK_TO_VAR_GAME", callback: lf.TRACK_TO_VAR_GAME, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x66, command: "VAR_GAME_TO_TRACK", callback: lf.VAR_GAME_TO_TRACK, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x67, command: "ANIM_TEXTURE", callback: lf.ANIM_TEXTURE, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x68, command: "ADD_MESSAGE_OBJ", callback: lf.ADD_MESSAGE_OBJ, args: ['Uint8:actor', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x69, command: "BRUTAL_EXIT", callback: lf.BRUTAL_EXIT, indent: Indent.KEEP},
    { opcode: 0x6A, command: "REPLACE", callback: lf.REPLACE, indent: Indent.KEEP},
    { opcode: 0x6B, command: "SCALE", callback: lf.SCALE, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x6C, command: "SET_ARMOR", callback: lf.SET_ARMOR, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x6D, command: "SET_ARMOR_OBJ", callback: lf.SET_ARMOR_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x6E, command: "ADD_LIFE_POINT_OBJ", callback: lf.ADD_LIFE_POINT_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x6F, command: "STATE_INVENTORY", callback: lf.STATE_INVENTORY, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x70, command: "AND_IF", callback: st.AND_IF, args: ['_Uint16:offset'], precond: true, condition: true, operator: true, indent: Indent.KEEP},
    { opcode: 0x71, command: "SWITCH", callback: st.SWITCH, condition: 'SWITCH', indent: Indent.ADD},
    { opcode: 0x72, command: "OR_CASE", callback: st.OR_CASE, argsFirst: true, args: ['_Uint16:offset'], operator: true, indent: Indent.KEEP},
    { opcode: 0x73, command: "CASE", callback: st.CASE, argsFirst: true, args: ['_Uint16:offset'], operator: true, indent: Indent.ADD},
    { opcode: 0x74, command: "DEFAULT", callback: st.DEFAULT, indent: Indent.ADD},
    { opcode: 0x75, command: "BREAK", callback: st.BREAK, args: ['_Uint16:offset'], indent: Indent.SUB},
    { opcode: 0x76, command: "END_SWITCH", callback: st.END_SWITCH, indent: Indent.SUB},
    { opcode: 0x77, command: "SET_HIT_ZONE", callback: lf.SET_HIT_ZONE, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x78, command: "SAVE_COMPORTEMENT", callback: st.SAVE_COMPORTEMENT, indent: Indent.KEEP},
    { opcode: 0x79, command: "RESTORE_COMPORTEMENT", callback: st.RESTORE_COMPORTEMENT, indent: Indent.KEEP},
    { opcode: 0x7A, command: "SAMPLE", callback: lf.SAMPLE, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x7B, command: "SAMPLE_RND", callback: lf.SAMPLE_RND, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x7C, command: "SAMPLE_ALWAYS", callback: lf.SAMPLE_ALWAYS, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x7D, command: "SAMPLE_STOP", callback: lf.SAMPLE_STOP, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x7E, command: "REPEAT_SAMPLE", callback: lf.REPEAT_SAMPLE, args: ['Uint16', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x7F, command: "BACKGROUND", callback: lf.BACKGROUND, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x80, command: "ADD_VAR_GAME", callback: lf.ADD_VAR_GAME, args: ['Uint8', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x81, command: "SUB_VAR_GAME", callback: lf.SUB_VAR_GAME, args: ['Uint8', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x82, command: "ADD_VAR_CUBE", callback: lf.ADD_VAR_CUBE, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x83, command: "SUB_VAR_CUBE", callback: lf.SUB_VAR_CUBE, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x84, command: "UNKNOWN(0x84)", callback: st.NOP, indent: Indent.KEEP},
    { opcode: 0x85, command: "SET_RAIL", callback: lf.SET_RAIL, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x86, command: "INVERSE_BETA", callback: lf.INVERSE_BETA, indent: Indent.KEEP},
    { opcode: 0x87, command: "NO_BODY", callback: lf.NO_BODY, indent: Indent.KEEP},
    { opcode: 0x88, command: "ADD_GOLD_PIECES", callback: lf.ADD_GOLD_PIECES, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x89, command: "STOP_CURRENT_TRACK_OBJ", callback: lf.STOP_CURRENT_TRACK_OBJ, args: ['Uint8:actor'], indent: Indent.KEEP},
    { opcode: 0x8A, command: "RESTORE_LAST_TRACK_OBJ", callback: lf.RESTORE_LAST_TRACK_OBJ, args: ['Uint8:actor'], indent: Indent.KEEP},
    { opcode: 0x8B, command: "SAVE_COMPORTEMENT_OBJ", callback: lf.SAVE_COMPORTEMENT_OBJ, args: ['Uint8:actor'], indent: Indent.KEEP},
    { opcode: 0x8C, command: "RESTORE_COMPORTEMENT_OBJ", callback: lf.RESTORE_COMPORTEMENT_OBJ, args: ['Uint8:actor'], indent: Indent.KEEP},
    { opcode: 0x8D, command: "SPY", callback: lf.SPY, args: ['Uint8'], indent: Indent.KEEP},
    { opcode: 0x8E, command: "DEBUG", callback: lf.DEBUG, indent: Indent.KEEP},
    { opcode: 0x8F, command: "DEBUG_OBJ", callback: lf.DEBUG_OBJ, args: ['Uint8:actor'], indent: Indent.KEEP},
    { opcode: 0x90, command: "POPCORN", callback: lf.POPCORN, indent: Indent.KEEP},
    { opcode: 0x91, command: "FLOW_POINT", callback: lf.FLOW_POINT, args: ['Uint8', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x92, command: "FLOW_OBJ", callback: lf.FLOW_OBJ, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x93, command: "SET_ANIM_DIAL", callback: lf.SET_ANIM_DIAL, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x94, command: "PCX", callback: lf.PCX, args: ['Uint16'], indent: Indent.KEEP},
    { opcode: 0x95, command: "END_MESSAGE", callback: lf.END_MESSAGE, indent: Indent.KEEP},
    { opcode: 0x96, command: "END_MESSAGE_OBJ", callback: lf.END_MESSAGE_OBJ, args: ['Uint8:actor'], indent: Indent.KEEP},
    { opcode: 0x97, command: "PARM_SAMPLE", callback: lf.PARM_SAMPLE, args: ['Uint16', 'Uint8', 'Uint16'], indent: Indent.KEEP}, // not sure about this one
    { opcode: 0x98, command: "NEW_SAMPLE", callback: lf.NEW_SAMPLE, args: ['Uint16', 'Uint16', 'Uint8', 'Uint16'], indent: Indent.KEEP},
    { opcode: 0x99, command: "POS_OBJ_AROUND", callback: lf.POS_OBJ_AROUND, args: ['Uint8:actor', 'Uint8'], indent: Indent.KEEP},
    { opcode: 0x9A, command: "PCX_MESS_OBJ", callback: lf.PCX_MESS_OBJ, args: ['Uint8:actor', 'Uint16', 'Uint16'], indent: Indent.KEEP}
];
