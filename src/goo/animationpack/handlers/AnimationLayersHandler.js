var mod_AnimationLayersHandler = AnimationLayersHandler;

import {
    ConfigHandler as ConfigHandler_ConfigHandler,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { AnimationLayer as AnimationLayer_AnimationLayer } from "../../animationpack/layer/AnimationLayer";
import { rsvpjs as RSVP } from "../../util/rsvp";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";

/**
 * Handler for loading animation layers
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @extends ConfigHandler
 * @private
 */
function AnimationLayersHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
}

AnimationLayersHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
AnimationLayersHandler.prototype.constructor = AnimationLayersHandler;
ConfigHandlerjs__registerClass('animation', AnimationLayersHandler);

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
	return ConfigHandler_ConfigHandler.prototype._update.call(this, ref, config, options).then(function (object) {
		if (!object) { return; }
		var promises = [];

		var i = 0;
		ObjectUtils_ObjectUtils.forEach(config.layers, function (layerCfg) {
			promises.push(that._parseLayer(layerCfg, object[i++], options));
		}, null, 'sortValue');

		return RSVP.all(promises).then(function (layers) {
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
		layer = new AnimationLayer_AnimationLayer(layerConfig.name);
	} else {
		layer._name = layerConfig.name;
	}

	layer.id = layerConfig.id;
	layer._transitions = ObjectUtils_ObjectUtils.deepClone(layerConfig.transitions);

	if (layer._layerBlender) {
		if (layerConfig.blendWeight !== undefined) {
			layer._layerBlender._blendWeight = layerConfig.blendWeight;
		} else {
			layer._layerBlender._blendWeight = 1.0;
		}
	}

	// Load all the stuff we need
	var promises = [];
	ObjectUtils_ObjectUtils.forEach(layerConfig.states, function (stateCfg) {
		promises.push(that.loadObject(stateCfg.stateRef, options).then(function (state) {
			layer.setState(state.id, state);
		}));
	}, null, 'sortValue');

	// Populate layer
	return RSVP.all(promises).then(function () {
		that._setInitialState(layer, layerConfig.initialStateRef);
		return layer;
	});
};

/**
 * Handler for loading animation layers
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @extends ConfigHandler
 * @private
 */
export { mod_AnimationLayersHandler as AnimationLayersHandler };
