var EnvironmentHandler_EnvironmentHandler = EnvironmentHandler;

import {
    ConfigHandler as loadershandlersConfigHandler_ConfigHandlerjs,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../entities/SystemBus";

import {
    GLOBAL_AMBIENT as ShaderBuilderjs_GLOBAL_AMBIENT,
    CLEAR_COLOR as ShaderBuilderjs_CLEAR_COLOR,
    USE_FOG as ShaderBuilderjs_USE_FOG,
    FOG_SETTINGS as ShaderBuilderjs_FOG_SETTINGS,
    FOG_COLOR as ShaderBuilderjs_FOG_COLOR,
} from "../../renderer/shaders/ShaderBuilder";

import { Snow as utilSnow_Snowjs } from "../../util/Snow";
import { rsvpjs as utilrsvp_rsvpjsjs } from "../../util/rsvp";
var ShaderBuilderjs_FOG_COLOR_binding = ShaderBuilderjs_FOG_COLOR;
var ShaderBuilderjs_FOG_SETTINGS_binding = ShaderBuilderjs_FOG_SETTINGS;
var ShaderBuilderjs_USE_FOG_binding = ShaderBuilderjs_USE_FOG;
var ShaderBuilderjs_CLEAR_COLOR_binding = ShaderBuilderjs_CLEAR_COLOR;
var ShaderBuilderjs_GLOBAL_AMBIENT_binding = ShaderBuilderjs_GLOBAL_AMBIENT;

var defaults = {
	backgroundColor: [0.3, 0.3, 0.3, 1],
	globalAmbient: [0, 0, 0],
	fog: {
		enabled: false,
		color: [1, 1, 1],
		near: 10,
		far: 1000
	}
};
var soundDefaults = {
	volume: 1,
	reverb: 0,
	rolloffFactor: 0.4,
	maxDistance: 100
};

function EnvironmentHandler() {
	loadershandlersConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

EnvironmentHandler.prototype = Object.create(loadershandlersConfigHandler_ConfigHandlerjs.prototype);
EnvironmentHandler.prototype.constructor = EnvironmentHandler;
ConfigHandlerjs__registerClass('environment', EnvironmentHandler);

EnvironmentHandler.prototype._prepare = function (config) {
	utilObjectUtils_ObjectUtilsjs.defaults(config, defaults);
};

EnvironmentHandler.prototype._create = function () {
	return {
		weatherState: {}
	};
};

EnvironmentHandler.prototype._remove = function (ref) {
	var object = this._objects.get(ref);
	this._objects.delete(ref);
	if (!object) {
		return;
	}

	// Remove weather
	for (var key in object.weatherState) {
		EnvironmentHandler.weatherHandlers[key].remove(object.weatherState);
	}

	// Reset environment
	entitiesSystemBus_SystemBusjsjs.emit('goo.setClearColor', defaults.backgroundColor);
	ShaderBuilderjs_CLEAR_COLOR_binding = defaults.backgroundColor;
	ShaderBuilderjs_GLOBAL_AMBIENT_binding = defaults.globalAmbient.slice(0, 3);
	ShaderBuilderjs_USE_FOG_binding = defaults.fog.enabled;
	ShaderBuilderjs_FOG_COLOR_binding = defaults.fog.color.slice(0, 3);
	ShaderBuilderjs_FOG_SETTINGS_binding = [defaults.fog.near, defaults.fog.far];

	// Reset Sound
	var soundSystem = this.world.getSystem('SoundSystem');
	if (soundSystem) {
		soundSystem.updateConfig(soundDefaults);
		soundSystem.setReverb(null);
	}
};

/**
 * Adds/updates/removes an environment
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated environment or null if removed
 */
EnvironmentHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return loadershandlersConfigHandler_ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (object) {
		if (!object) { return; }

		var backgroundColor = config.backgroundColor;
		var alpha = backgroundColor[3];
		object.backgroundColor = [
			backgroundColor[0] * alpha,
			backgroundColor[1] * alpha,
			backgroundColor[2] * alpha,
			backgroundColor[3]
		];
		object.globalAmbient = config.globalAmbient.slice(0, 3);

		object.fog = utilObjectUtils_ObjectUtilsjs.deepClone(config.fog);

		// Background color
		entitiesSystemBus_SystemBusjsjs.emit('goo.setClearColor', object.backgroundColor);

		// Fog and ambient
		ShaderBuilderjs_CLEAR_COLOR_binding = object.backgroundColor;
		ShaderBuilderjs_GLOBAL_AMBIENT_binding = object.globalAmbient;
		ShaderBuilderjs_USE_FOG_binding = object.fog.enabled;
		ShaderBuilderjs_FOG_COLOR_binding = object.fog.color.slice(0, 3);
		ShaderBuilderjs_FOG_SETTINGS_binding = [object.fog.near, config.fog.far];

		// Weather
		for (var key in config.weather) {
			var handler = EnvironmentHandler.weatherHandlers[key];
			if (handler) {
				handler.update.call(that, config.weather[key], object.weatherState);
			}
		}

		var promises = [];

		// Skybox
		if (config.skyboxRef) {
			EnvironmentHandler.currentSkyboxRef = config.skyboxRef;
			promises.push(that._load(config.skyboxRef, { reload: true }));
		} else if (EnvironmentHandler.currentSkyboxRef) {
			var p = that.updateObject(EnvironmentHandler.currentSkyboxRef, null)
			.then(function () {
				delete EnvironmentHandler.currentSkyboxRef;
			});
			promises.push(p);
		}

		// Sound
		var soundSystem = that.world.getSystem('SoundSystem');
		if (config.sound && soundSystem) {
			soundSystem.updateConfig(config.sound);
			if (config.sound.reverbRef) {
				var p = that._load(config.sound.reverbRef, options).then(function (sound) {
					soundSystem.setReverb(sound._buffer);
				});
				promises.push(p);
			} else {
				soundSystem.setReverb(null);
			}
		}
		return utilrsvp_rsvpjsjs.all(promises).then(function () { return object; });
	});
};


EnvironmentHandler.weatherHandlers = {
	snow: {
		update: function (config, weatherState) {
			if (config.enabled) {
				if (!weatherState.snow || !weatherState.snow.enabled) {
					// add snow
					weatherState.snow = weatherState.snow || {};
					weatherState.snow.enabled = true;
					weatherState.snow.snow = new utilSnow_Snowjs(this.world.gooRunner);
				}

				weatherState.snow.snow.setEmissionVelocity(config.velocity);
				weatherState.snow.snow.setReleaseRatePerSecond(config.rate);
				weatherState.snow.snow.setEmissionHeight(config.height);
			} else if (weatherState.snow && weatherState.snow.enabled) {
				// remove snow
				weatherState.snow.snow.remove();
				weatherState.snow.enabled = false;
				delete weatherState.snow.snow;
			}
		},
		remove: function (weatherState) {
			if (weatherState.snow && weatherState.snow.snow) {
				weatherState.snow.snow.remove();
				weatherState.snow.enabled = false;
				delete weatherState.snow.snow;
			}
		}
	}
};

/**
 * Handling environments
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { EnvironmentHandler_EnvironmentHandler as EnvironmentHandler };