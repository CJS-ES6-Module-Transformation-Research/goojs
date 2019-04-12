Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SteadyState;

var _AbstractState = require("../../animationpack/state/AbstractState");

var _AbstractState2 = _interopRequireDefault(_AbstractState);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * A "steady" state is an animation state that is concrete and stand-alone (vs. a state that handles transitioning between two states, for example.)
 * @extends AbstractState
 * @param {string} name Name of state
 */
function SteadyState(name) {
	_AbstractState2.default.call(this);

	this.id = null;
	this._name = name;
	this._transitions = {};
	this._sourceTree = null;
}

SteadyState.prototype = Object.create(_AbstractState2.default.prototype);
SteadyState.prototype.constructor = SteadyState;

/**
 * Sets the clipsource of the steadystate
 * @param {(ClipSource|BinaryLerpSource|FrozenClipSource|ManagedTransformSource)} clipSource
 */
SteadyState.prototype.setClipSource = function (clipSource) {
	this._sourceTree = clipSource;
};

/*
 * Updates the states clip instances
 */
SteadyState.prototype.update = function (globalTime) {
	if (!this._sourceTree.setTime(globalTime)) {
		if (this.onFinished) {
			this.onFinished();
		}
	}
};

/*
 * Gets the current animation data, used in {@link AnimationLayer}
 */
SteadyState.prototype.getCurrentSourceData = function () {
	return this._sourceTree.getSourceData();
};

/*
 */
SteadyState.prototype.getCurrentLoop = function () {
	return this._sourceTree.currentLoop;
};

/*
 * Resets the animationclips in the sourcetree
 * @param {number} globalStartTime Usually current time
 */
SteadyState.prototype.resetClips = function (globalStartTime) {
	_AbstractState2.default.prototype.resetClips.call(this, globalStartTime);
	this._sourceTree.resetClips(globalStartTime);
};

SteadyState.prototype.shiftClipTime = function (shiftTime) {
	_AbstractState2.default.prototype.shiftClipTime.call(this, shiftTime);
	this._sourceTree.shiftClipTime(shiftTime);
};

SteadyState.prototype.setTimeScale = function (timeScale) {
	this._sourceTree.setTimeScale(timeScale);
};

SteadyState.prototype.clone = function () {
	var cloned = new SteadyState(this._name);

	for (var key in this._transitions) {
		cloned._transitions[key] = this._transitions[key];
	}

	cloned._sourceTree = this._sourceTree.clone();

	return cloned;
};
module.exports = exports.default;
