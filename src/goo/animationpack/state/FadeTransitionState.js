Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FadeTransitionState;

var _AbstractTransitionState = require("../../animationpack/state/AbstractTransitionState");

var _AbstractTransitionState2 = _interopRequireDefault(_AbstractTransitionState);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * A transition that blends over a given time from one animation state to another, beginning the target clip from local time 0 at the start of the transition. This is best used with two clips that have similar motions.
 * @extends AbstractTransitionState
 */
function FadeTransitionState() {
	_AbstractTransitionState2.default.call(this);
}

FadeTransitionState.prototype = Object.create(_AbstractTransitionState2.default.prototype);
FadeTransitionState.prototype.constructor = FadeTransitionState;

/**
 * Update this state using the current global time.
 * @param globalTime the current global time.
 * @param layer the layer this state belongs to.
 */
FadeTransitionState.prototype.update = function (globalTime) {
	_AbstractTransitionState2.default.prototype.update.call(this, globalTime);

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
	_AbstractTransitionState2.default.prototype.resetClips.call(this, globalTime);
	if (this._targetState) {
		this._targetState.resetClips(globalTime);
	}
};

FadeTransitionState.prototype.shiftClipTime = function (shiftTime) {
	_AbstractTransitionState2.default.prototype.shiftClipTime.call(this, shiftTime);
	if (this._targetState) {
		this._targetState.shiftClipTime(shiftTime);
	}
	if (this._sourceState) {
		this._sourceState.shiftClipTime(shiftTime);
	}
};
module.exports = exports.default;
