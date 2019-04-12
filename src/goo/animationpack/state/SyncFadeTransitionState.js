Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SyncFadeTransitionState;

var _FadeTransitionState = require("../../animationpack/state/FadeTransitionState");

var _FadeTransitionState2 = _interopRequireDefault(_FadeTransitionState);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * A transition that blends over a given time from one animation state to another, synchronizing the target state to the initial state's start time. This is best used with two clips that have similar motions.
 * @param targetState the name of the steady state we want the Animation Layer to be in at the end of the transition.
 * @param fadeTime the amount of time we should take to do the transition.
 * @param blendType {StateBlendType} the way we should interpolate the weighting during the transition.
 */
function SyncFadeTransitionState() {
	_FadeTransitionState2.default.call(this);
}

SyncFadeTransitionState.prototype = Object.create(_FadeTransitionState2.default.prototype);
SyncFadeTransitionState.prototype.constructor = SyncFadeTransitionState;

SyncFadeTransitionState.prototype.resetClips = function (globalTime) {
	_FadeTransitionState2.default.prototype.resetClips.call(this, globalTime);
	this._targetState.resetClips(this._sourceState._globalStartTime);
};

SyncFadeTransitionState.prototype.shiftClipTime = function (shiftTime) {
	_FadeTransitionState2.default.prototype.shiftClipTime.call(this, shiftTime);
	this._targetState.shiftClipTime(this._sourceState._globalStartTime + shiftTime);
	this._sourceState.shiftClipTime(shiftTime);
};
module.exports = exports.default;
