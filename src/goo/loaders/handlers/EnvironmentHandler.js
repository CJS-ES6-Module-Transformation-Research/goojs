var mod_EnvironmentHandler = EnvironmentHandler;
import { ConfigHandler as ConfigHandler_ConfigHandler } from "../../loaders/handlers/ConfigHandler";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";
import { SystemBusjs as SystemBus } from "../../entities/SystemBus";
import { ShaderBuilder as ShaderBuilder_ShaderBuilder } from "../../renderer/shaders/ShaderBuilder";
import { Snow as Snow_Snow } from "../../util/Snow";
import { rsvpjs as RSVP } from "../../util/rsvp";

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

/**
 * Handling environments
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function EnvironmentHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
}

EnvironmentHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
EnvironmentHandler.prototype.constructor = EnvironmentHandler;
ConfigHandler_ConfigHandler._registerClass('environment', EnvironmentHandler);

EnvironmentHandler.prototype._prepare = function (config) {
	ObjectUtils_ObjectUtils.defaults(config, defaults);
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
	SystemBus.emit('goo.setClearColor', defaults.backgroundColor);
	ShaderBuilder_ShaderBuilder.CLEAR_COLOR = defaults.backgroundColor;
	ShaderBuilder_ShaderBuilder.GLOBAL_AMBIENT = defaults.globalAmbient.slice(0, 3);
	ShaderBuilder_ShaderBuilder.USE_FOG = defaults.fog.enabled;
	ShaderBuilder_ShaderBuilder.FOG_COLOR = defaults.fog.color.slice(0, 3);
	ShaderBuilder_ShaderBuilder.FOG_SETTINGS = [defaults.fog.near, defaults.fog.far];

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
	return ConfigHandler_ConfigHandler.prototype._update.call(this, ref, config, options).then(function (object) {
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

		object.fog = ObjectUtils_ObjectUtils.deepClone(config.fog);

		// Background color
		SystemBus.emit('goo.setClearColor', object.backgroundColor);

		// Fog and ambient
		ShaderBuilder_ShaderBuilder.CLEAR_COLOR = object.backgroundColor;
		ShaderBuilder_ShaderBuilder.GLOBAL_AMBIENT = object.globalAmbient;
		ShaderBuilder_ShaderBuilder.USE_FOG = object.fog.enabled;
		ShaderBuilder_ShaderBuilder.FOG_COLOR = object.fog.color.slice(0, 3);
		ShaderBuilder_ShaderBuilder.FOG_SETTINGS = [object.fog.near, config.fog.far];

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
		return RSVP.all(promises).then(function () { return object; });
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
					weatherState.snow.snow = new Snow_Snow(this.world.gooRunner);
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
export { mod_EnvironmentHandler as EnvironmentHandler };