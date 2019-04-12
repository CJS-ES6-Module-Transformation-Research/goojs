Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = AnimationComponent;

var _Component = require("../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

var _World = require("../../entities/World");

var _World2 = _interopRequireDefault(_World);

var _AnimationLayer = require("../../animationpack/layer/AnimationLayer");

var _AnimationLayer2 = _interopRequireDefault(_AnimationLayer);

var _JointData = require("../../animationpack/clip/JointData");

var _JointData2 = _interopRequireDefault(_JointData);

var _TransformData = require("../../animationpack/clip/TransformData");

var _TransformData2 = _interopRequireDefault(_TransformData);

var _TriggerData = require("../../animationpack/clip/TriggerData");

var _TriggerData2 = _interopRequireDefault(_TriggerData);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Holds the animation data.
 * @extends Component
 * @param {SkeletonPose} pose pose
 */
function AnimationComponent(pose) {
	_Component2.default.apply(this, arguments);

	this.type = 'AnimationComponent';

	/**
  * @type {Array<AnimationLayer>}
  */
	this.layers = [];
	this.floats = {};

	this._updateRate = 1.0 / 60.0;
	this._lastUpdate = 0.0;
	this._triggerCallbacks = {};

	// Base layer
	var layer = new _AnimationLayer2.default(_AnimationLayer2.default.BASE_LAYER_NAME);
	this.layers.push(layer);
	this._skeletonPose = pose;

	this.paused = false;
	this.lastTimeOfPause = -1;
}

AnimationComponent.type = 'AnimationComponent';

AnimationComponent.prototype = Object.create(_Component2.default.prototype);
AnimationComponent.prototype.constructor = AnimationComponent;

/**
 * Transition to another state. This is shorthand for applying transitions on the base layer, see {@link AnimationLayer.transitionTo} for more info
 * @param {string} stateKey
 * @param {boolean} allowDirectSwitch Allow the function to directly switch state if transitioning fails (missing or transition already in progress)
 * @param {Function} callback If the target state has a limited number of repeats, this callback is called when the animation finishes.
 * @returns {boolean} true if a transition was found and started
 */
AnimationComponent.prototype.transitionTo = function (stateKey, allowDirectSwitch, callback) {
	if (this.layers[0].transitionTo(stateKey, undefined, callback)) {
		return true;
	}
	if (!allowDirectSwitch) {
		return false;
	}
	return this.layers[0].setCurrentStateById(stateKey, true, undefined, callback);
};
/**
 * Get available states
 * returns {Array<string>} available state keys
 */
AnimationComponent.prototype.getStates = function () {
	return this.layers[0].getStates();
};
AnimationComponent.prototype.getCurrentState = function () {
	return this.layers[0].getCurrentState();
};
/**
 * Get available transitions
 * returns {Array<string>} available state keys
 */
AnimationComponent.prototype.getTransitions = function () {
	return this.layers[0].getTransitions();
};

/*
 * Update animations
 */
AnimationComponent.prototype.update = function (globalTime) {
	if (this.paused) {
		return;
	}

	// grab current global time
	globalTime = typeof globalTime !== 'undefined' ? globalTime : _World2.default.time;

	// check throttle
	if (this._updateRate !== 0.0) {
		if (globalTime > this._lastUpdate && globalTime - this._lastUpdate < this._updateRate) {
			return;
		}

		// we subtract a bit to maintain our desired rate, even if there are some gc pauses, etc.
		this._lastUpdate = globalTime - (globalTime - this._lastUpdate) % this._updateRate;
	}

	// move the time forward on the layers
	for (var i = 0, max = this.layers.length; i < max; i++) {
		this.layers[i].update(globalTime);
	}
};

/*
 * Applying calculated animations to the concerned data
 */
AnimationComponent.prototype.apply = function (transformComponent) {
	var data = this.getCurrentSourceData();
	if (!data) {
		return;
	}

	var pose = this._skeletonPose;

	// cycle through, pulling out and applying those we know about
	var keys = Object.keys(data);
	for (var i = 0, l = keys.length; i < l; i++) {
		var key = keys[i];
		var value = data[key];
		if (value instanceof _JointData2.default) {
			if (pose && value._jointIndex >= 0) {
				value.applyTo(pose._localTransforms[value._jointIndex]);
			}
		} else if (value instanceof _TransformData2.default) {
			if (transformComponent) {
				transformComponent.sync();
				value.applyTo(transformComponent.transform);
			}
		} else if (value instanceof _TriggerData2.default) {
			if (value.armed) {
				// pull callback(s) for the current trigger key, if exists, and call.
				// TODO: Integrate with GameMaker somehow
				for (var i = 0, maxI = value._currentTriggers.length; i < maxI; i++) {
					var callbacks = this._triggerCallbacks[value._currentTriggers[i]];
					if (callbacks && callbacks.length) {
						for (var j = 0, maxJ = callbacks.length; j < maxJ; j++) {
							callbacks[j]();
						}
					}
				}
				value.armed = false;
			}
		} else if (value instanceof Array) {
			this.floats[key] = value[0];
		}
	}
	if (pose) {
		pose.updateTransforms();
	}
};

/*
 * Called after the animations are applied
 */
AnimationComponent.prototype.postUpdate = function () {
	// post update to clear states
	for (var i = 0, max = this.layers.length; i < max; i++) {
		this.layers[i].postUpdate();
	}
};

/*
 * Gets the current animation data for all layers blended together
 */
AnimationComponent.prototype.getCurrentSourceData = function () {
	// set up our layer blending.
	if (this.layers.length === 0) {
		return [];
	}
	var last = this.layers.length - 1;
	this.layers[0]._layerBlender = null;
	for (var i = 0; i < last; i++) {
		this.layers[i + 1].updateLayerBlending(this.layers[i]);
	}
	return this.layers[last].getCurrentSourceData();
};

/**
 * Add a new {@link AnimationLayer} to the stack
 * @param {AnimationLayer} layer
 * @param {number} [index] if no index is supplied, it's put on top of the stack
 */
AnimationComponent.prototype.addLayer = function (layer, index) {
	if (!isNaN(index)) {
		this.layers.splice(index, 0, layer);
	} else {
		this.layers.push(layer);
	}
};

AnimationComponent.prototype.resetClips = function (globalTime) {
	for (var i = 0; i < this.layers.length; i++) {
		this.layers[i].resetClips(globalTime);
	}
};

AnimationComponent.prototype.shiftClipTime = function (shiftTime) {
	for (var i = 0; i < this.layers.length; i++) {
		this.layers[i].shiftClipTime(shiftTime);
	}
};

AnimationComponent.prototype.setTimeScale = function (timeScale) {
	for (var i = 0; i < this.layers.length; i++) {
		this.layers[i].setTimeScale(timeScale);
	}
};

AnimationComponent.prototype.pause = function () {
	if (!this.paused) {
		this.lastTimeOfPause = _World2.default.time;
		this.paused = true;
	}
};

AnimationComponent.prototype.stop = function () {
	if (this._skeletonPose) {
		this._skeletonPose.setToBindPose();
	}
	this.paused = true;
	this.lastTimeOfPause = -1;
};

AnimationComponent.prototype.resume = function () {
	if (this.paused || this.lastTimeOfPause === -1) {
		if (this.lastTimeOfPause === -1) {
			this.resetClips(_World2.default.time);
		} else {
			this.shiftClipTime(_World2.default.time - this.lastTimeOfPause);
		}
	}
	this.paused = false;
};

AnimationComponent.prototype.clone = function () {
	var cloned = new AnimationComponent();

	cloned.layers = this.layers.map(function (layer) {
		return layer.clone();
	});
	return cloned;
};
module.exports = exports.default;
