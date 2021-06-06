var mod_FadeTransitionState = FadeTransitionState;
import { AbstractTransitionState as AbstractTransitionState_AbstractTransitionState } from "../../animationpack/state/AbstractTransitionState";

/**
 * A transition that blends over a given time from one animation state to another, beginning the target clip from local time 0 at the start of the transition. This is best used with two clips that have similar motions.
 * @extends AbstractTransitionState
 */
function FadeTransitionState() {
	AbstractTransitionState_AbstractTransitionState.call(this);
}

FadeTransitionState.prototype = Object.create(AbstractTransitionState_AbstractTransitionState.prototype);
FadeTransitionState.prototype.constructor = FadeTransitionState;

/**
 * Update this state using the current global time.
 * @param globalTime the current global time.
 * @param layer the layer this state belongs to.
 */
FadeTransitionState.prototype.update = function (globalTime) {
	AbstractTransitionState_AbstractTransitionState.prototype.update.call(this, globalTime);

	// update both of our states
	if (this._sourceState) {
		this._sourceState.update(globalTime);
	}
	if (this._targetState) {
		this._targetState.update(globalTime);
	}
};

/*
 */
FadeTransitionState.prototype.getCurrentLoop = function () {
	return this._targetState.getCurrentLoop();
};

/**
 * Post update. If the state has no more clips and no end transition, this will clear this state from the layer.
 * @param layer the layer this state belongs to.
 */
FadeTransitionState.prototype.postUpdate = function () {
	// post update both of our states
	if (this._sourceState) {
		this._sourceState.postUpdate();
	}
	if (this._targetState) {
		this._targetState.postUpdate();
	}
};

FadeTransitionState.prototype.resetClips = function (globalTime) {
	AbstractTransitionState_AbstractTransitionState.prototype.resetClips.call(this, globalTime);
	if (this._targetState) {
		this._targetState.resetClips(globalTime);
	}
};

FadeTransitionState.prototype.shiftClipTime = function (shiftTime) {
	AbstractTransitionState_AbstractTransitionState.prototype.shiftClipTime.call(this, shiftTime);
	if (this._targetState) {
		this._targetState.shiftClipTime(shiftTime);
	}
	if (this._sourceState) {
		this._sourceState.shiftClipTime(shiftTime);
	}
};

/**
 * A transition that blends over a given time from one animation state to another, beginning the target clip from local time 0 at the start of the transition. This is best used with two clips that have similar motions.
 * @extends AbstractTransitionState
 */
export { mod_FadeTransitionState as FadeTransitionState };