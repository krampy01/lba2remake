import { last, dropRight } from 'lodash';
import { newBlock } from './utils';
import * as conditions from './conditions';

/*
** IF
*/

export function GENERIC_IF(type, workspace, cmd, ctx) {
    const { connection, logicStack } = ctx;
    const ifBlocks = ctx.ifBlocks || [];
    const block = newBlock(workspace, type, cmd);
    connection.connect(block.previousConnection);
    const condConnection = block.getInput('condition').connection;
    const thenConnection = block.getInput('then_statements').connection;
    const logicCmd = last(logicStack) as any;
    if (logicCmd) {
        const logicType = logicCmd.data.op.command === 'AND_IF'
            ? 'lba_and'
            : 'lba_or';
        const logicBlock = newBlock(workspace, logicType, logicCmd);
        condConnection.connect(logicBlock.outputConnection);
        const left = logicBlock.getInput('left').connection;
        addCondition(workspace, logicCmd, { ...ctx, connection: left });
        const right = logicBlock.getInput('right').connection;
        addCondition(workspace, cmd, { ...ctx, connection: right });
    } else {
        addCondition(workspace, cmd, { ...ctx, connection: condConnection });
    }
    return {
        connection: thenConnection,
        ifBlocks: [...ifBlocks, block],
        logicStack: null
    };
}

export function ELSE(_workspace, _cmd, ctx) {
    const ifBlock = last(ctx.ifBlocks) as any;
    ifBlock.enableElseBlock();
    const elseConnection = ifBlock.getInput('else_statements').connection;
    return {
        connection: elseConnection,
    };
}

export function ENDIF(_workspace, _cmd, ctx) {
    const ifBlock = last(ctx.ifBlocks) as any;
    return {
        ifBlocks: dropRight(ctx.ifBlocks),
        connection: ifBlock.nextConnection
    };
}

function addCondition(workspace, cmd, ctx) {
    const condName = cmd.data.condition.op.command;
    if (condName in conditions) {
        conditions[condName](workspace, cmd, ctx);
    }
}

/*
** SWITCH
*/

export function SWITCH(workspace, cmd, ctx) {
    const { connection } = ctx;
    const block = newBlock(workspace, 'lba_switch', cmd);
    const switchBlocks = ctx.switchBlocks || [];
    connection.connect(block.previousConnection);
    const condName = cmd.data.condition.op.command;
    if (condName in conditions) {
        conditions[condName](workspace, cmd, {
            ...ctx,
            connection: block.getInput('condition').connection
        });
    }
    return {
        switchBlocks: [...switchBlocks, block]
    };
}

export function CASE(_workspace, _cmd, ctx) {
    const { switchBlocks } = ctx;
    const block = last(switchBlocks) as any;
    const { statementsInput } = block.addCase();
    return {
        connection: statementsInput.connection
    };
}

export function DEFAULT(_workspace, _cmd, ctx) {
    const { switchBlocks } = ctx;
    const block = last(switchBlocks) as any;
    block.enableDefaultCase();
    const statementsInput = block.getInput('default_statement');
    return {
        connection: statementsInput.connection
    };
}

export function END_SWITCH(_workspace, _cmd, ctx) {
    const switchBlocks = last(ctx.switchBlocks) as any;
    return {
        switchBlocks: dropRight(ctx.switchBlocks),
        connection: switchBlocks.nextConnection
    };
}

/*
** LOGIC
*/

export function LOGIC_OPERATOR(_workspace, cmd, ctx) {
    const logicStack = ctx.logicStack || [];
    return { logicStack: [...logicStack, cmd] };
}
