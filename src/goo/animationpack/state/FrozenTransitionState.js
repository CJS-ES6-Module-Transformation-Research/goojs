var FrozenTransitionState_FrozenTransitionState = FrozenTransitionState;
import {     AbstractTransitionState as animationpackstateAbstractTransitionState_AbstractTransitionStatejs, } from "../../animationpack/state/AbstractTransitionState";
function FrozenTransitionState() {
	animationpackstateAbstractTransitionState_AbstractTransitionStatejs.call(this);
}

FrozenTransitionState.prototype = Object.create(animationpackstateAbstractTransitionState_AbstractTransitionStatejs.prototype);
FrozenTransitionState.prototype.constructor = FrozenTransitionState;

/**
 * Update this state using the current global time.
 * @param {number} globalTime the current global time.
 */
FrozenTransitionState.prototype.update = function (globalTime) {
	animationpackstateAbstractTransitionState_AbstractTransitionStatejs.prototype.update.call(this, globalTime);

	// update only the target state - the source state is frozen
	if (this._targetState) {
		this._targetState.update(globalTime);
	}
};

/**
 * Post update. If the state has no more clips and no end transition, this will clear this state from the layer.
 * @param layer the layer this state belongs to.
 */
FrozenTransitionState.prototype.postUpdate = function () {
	// update only the B state - the first is frozen
	if (this._targetState) {
		this._targetState.postUpdate();
	}
};

/**
 * Resets the clips to start at given time
 * @param {number} globalTime
 */
FrozenTransitionState.prototype.resetClips = function (globalTime) {
	animationpackstateAbstractTransitionState_AbstractTransitionStatejs.prototype.resetClips.call(this, globalTime);
	this._targetState.resetClips(globalTime);
};

FrozenTransitionState.prototype.shiftClipTime = function (shiftTime) {
	animationpackstateAbstractTransitionState_AbstractTransitionStatejs.prototype.shiftClipTime.call(this, shiftTime);
	this._targetState.shiftClipTime(shiftTime);
};

/**
 * A two state transition that freezes the starting state at its current position and blends that over time with a target state. The target
 *        state moves forward in time during the blend as normal.
 */
export { FrozenTransitionState_FrozenTransitionState as FrozenTransitionState };