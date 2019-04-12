Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = AnimationLayersHandler;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _ConfigHandler2 = _interopRequireDefault(_ConfigHandler);

var _AnimationLayer = require("../../animationpack/layer/AnimationLayer");

var _AnimationLayer2 = _interopRequireDefault(_AnimationLayer);

var _rsvp = require("../../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Handler for loading animation layers
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @extends ConfigHandler
 * @private
 */
function AnimationLayersHandler() {
	_ConfigHandler2.default.apply(this, arguments);
}

AnimationLayersHandler.prototype = Object.create(_ConfigHandler2.default.prototype);
AnimationLayersHandler.prototype.constructor = AnimationLayersHandler;
_ConfigHandler2.default._registerClass('animation', AnimationLayersHandler);

/**
 * Creates an empty array to store animation layers
 * @param {string} ref
 * @returns {Array<AnimationLayer>}
 * @private
 */
AnimationLayersHandler.prototype._create = function (ref) {
	var layer = [];
	this._objects.set(ref, layer);
	return layer;
};

/**
 * Sets current state on a layer if possible, otherwise clears  current state
 * @param {AnimationLayer} layer
 * @param {string} name
 */
AnimationLayersHandler.prototype._setInitialState = function (layer, stateKey) {
	if (stateKey) {
		var state = layer.getStateById(stateKey);
		if (layer._currentState !== state) {
			layer.setCurrentStateById(stateKey, true);
		}
	} else {
		layer.setCurrentState();
	}
};

/**
 * Adds/updates/removes the animation layers
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated animation state or null if removed
 */
AnimationLayersHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return _ConfigHandler2.default.prototype._update.call(this, ref, config, options).then(function (object) {
		if (!object) {
			return;
		}
		var promises = [];

		var i = 0;
		_ObjectUtils2.default.forEach(config.layers, function (layerCfg) {
			promises.push(that._parseLayer(layerCfg, object[i++], options));
		}, null, 'sortValue');

		return _rsvp2.default.all(promises).then(function (layers) {
			object.length = layers.length;
			for (var i = 0; i < layers.length; i++) {
				object[i] = layers[i];
			}
			return object;
		});
	});
};

/**
 * Parses a single layer, puts the correct properties and {@link SteadyState} onto it
 * @param {Object} layerConfig
 * @param {layer}
 * @returns {RSVP.Promise} resolves with layer
 * @private
 */
AnimationLayersHandler.prototype._parseLayer = function (layerConfig, layer, options) {
	var that = this;

	if (!layer) {
		layer = new _AnimationLayer2.default(layerConfig.name);
	} else {
		layer._name = layerConfig.name;
	}

	layer.id = layerConfig.id;
	layer._transitions = _ObjectUtils2.default.deepClone(layerConfig.transitions);

	if (layer._layerBlender) {
		if (layerConfig.blendWeight !== undefined) {
			layer._layerBlender._blendWeight = layerConfig.blendWeight;
		} else {
			layer._layerBlender._blendWeight = 1.0;
		}
	}

	// Load all the stuff we need
	var promises = [];
	_ObjectUtils2.default.forEach(layerConfig.states, function (stateCfg) {
		promises.push(that.loadObject(stateCfg.stateRef, options).then(function (state) {
			layer.setState(state.id, state);
		}));
	}, null, 'sortValue');

	// Populate layer
	return _rsvp2.default.all(promises).then(function () {
		that._setInitialState(layer, layerConfig.initialStateRef);
		return layer;
	});
};
module.exports = exports.default;
