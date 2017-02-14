/* Conditionals */

export function IF(condition, operator, offset) {
    if (!operator(condition())) {
        OFFSET.call(this, offset);
    }
}

export function SNIF(condition, operator, offset) {
    // Should never be called -- original game internal use only
}

export function NEVERIF(condition, operator, offset) {
    // Should never be called -- original game internal use only
}

export function SWIF(cmdState, condition, operator, offset) {
    const status = operator(condition());
    if (!(status && !cmdState.status)) {
        OFFSET.call(this, offset);
    }
    cmdState.status = status;
}

export function ONEIF(cmdState, condition, operator, offset) {
    const status = operator(condition());
    if (!(status && !cmdState.used)) {
        OFFSET.call(this, offset);
    }
    if (status) {
        cmdState.used = true;
    }
}

export function OR_IF(condition, operator, offset) {
    if (operator(condition())) {
        OFFSET.call(this, offset);
    }
}

export function AND_IF(condition, operator, offset) {
    IF.call(this, condition, operator, offset);
}

export function ELSE(offset) {
    OFFSET.call(this, offset);
}

export function ENDIF() {
    // Nothing to do here
}

export function SWITCH(condition) {
    this.state.switchValue = condition();
}

export function OR_CASE(operator, offset) {
    CASE.call(this, operator, offset);
}

export function CASE(operator, offset) {
    if (!operator(this.state.switchValue)) {
        this.state.offset = offset - 1;
    }
}

export function DEFAULT(offset) {

}

export function BREAK(offset) {
    OFFSET.call(this, offset);
}

export function END_SWITCH() {
    delete this.state.switchValue;
}

/* Comportements */

export function COMPORTEMENT() {
    this.state.comportementOffset = this.state.offset;
}

export function SET_COMPORTEMENT(offset) {
    this.state.reentryOffset = offset;
    this.state.continue = false;
}

export function SET_COMPORTEMENT_OBJ(actor, offset) {
    actor.scripts.life.context.state.reentryOffset = offset;
}

export function END_COMPORTEMENT() {
    this.state.reentryOffset = this.state.comportementOffset;
    this.state.continue = false;
}

export function SAVE_COMPORTEMENT() {
    this.state.savedOffset = this.state.comportementOffset;
}

export function RESTORE_COMPORTEMENT() {
    if (this.state.savedOffset) {
        this.state.reentryOffset = this.state.savedOffset;
        this.state.continue = false;
    }
}

/* Tracks */

export function TRACK(index) {
    this.state.trackIndex = index;
    this.state.trackOffset = this.state.offset;
}

export function SET_TRACK(offset) {
    this.moveState.reentryOffset = offset;
    this.moveState.stopped = false;
}

export function SET_TRACK_OBJ(actor, offset) {
    actor.scripts.move.context.state.reentryOffset = offset;
}

export function STOP_CURRENT_TRACK() {
    this.moveState.savedOffset = this.moveState.trackOffset;
    this.moveState.stopped = true;
}

export function RESTORE_LAST_TRACK() {
    if (this.moveState.savedOffset) {
        this.moveState.reentryOffset = this.moveState.savedOffset;
        this.moveState.stopped = false;
    }
}

/* Misc */

export function END() {
    this.state.terminated = true;
    this.state.continue = false;
}

export function NOP() {

}

export function RETURN() {
    this.state.reentryOffset = this.state.offset;
    this.state.continue = false;
}

export function OFFSET(offset) {
    this.state.offset = offset - 1;
}

export function GOTO(offset) {
    this.state.reentryOffset = offset;
    this.state.continue = false;
}

export function STOP() {
    this.state.stopped = true;
    this.state.continue = false;
}