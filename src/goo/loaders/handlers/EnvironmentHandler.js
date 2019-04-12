Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = EnvironmentHandler;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _ConfigHandler2 = _interopRequireDefault(_ConfigHandler);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _SystemBus = require("../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

var _ShaderBuilder = require("../../renderer/shaders/ShaderBuilder");

var _ShaderBuilder2 = _interopRequireDefault(_ShaderBuilder);

var _Snow = require("../../util/Snow");

var _Snow2 = _interopRequireDefault(_Snow);

var _rsvp = require("../../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

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
	_ConfigHandler2.default.apply(this, arguments);
}

EnvironmentHandler.prototype = Object.create(_ConfigHandler2.default.prototype);
EnvironmentHandler.prototype.constructor = EnvironmentHandler;
_ConfigHandler2.default._registerClass('environment', EnvironmentHandler);

EnvironmentHandler.prototype._prepare = function (config) {
	_ObjectUtils2.default.defaults(config, defaults);
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
	_SystemBus2.default.emit('goo.setClearColor', defaults.backgroundColor);
	_ShaderBuilder2.default.CLEAR_COLOR = defaults.backgroundColor;
	_ShaderBuilder2.default.GLOBAL_AMBIENT = defaults.globalAmbient.slice(0, 3);
	_ShaderBuilder2.default.USE_FOG = defaults.fog.enabled;
	_ShaderBuilder2.default.FOG_COLOR = defaults.fog.color.slice(0, 3);
	_ShaderBuilder2.default.FOG_SETTINGS = [defaults.fog.near, defaults.fog.far];

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
	return _ConfigHandler2.default.prototype._update.call(this, ref, config, options).then(function (object) {
		if (!object) {
			return;
		}

		var backgroundColor = config.backgroundColor;
		var alpha = backgroundColor[3];
		object.backgroundColor = [backgroundColor[0] * alpha, backgroundColor[1] * alpha, backgroundColor[2] * alpha, backgroundColor[3]];
		object.globalAmbient = config.globalAmbient.slice(0, 3);

		object.fog = _ObjectUtils2.default.deepClone(config.fog);

		// Background color
		_SystemBus2.default.emit('goo.setClearColor', object.backgroundColor);

		// Fog and ambient
		_ShaderBuilder2.default.CLEAR_COLOR = object.backgroundColor;
		_ShaderBuilder2.default.GLOBAL_AMBIENT = object.globalAmbient;
		_ShaderBuilder2.default.USE_FOG = object.fog.enabled;
		_ShaderBuilder2.default.FOG_COLOR = object.fog.color.slice(0, 3);
		_ShaderBuilder2.default.FOG_SETTINGS = [object.fog.near, config.fog.far];

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
			var p = that.updateObject(EnvironmentHandler.currentSkyboxRef, null).then(function () {
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
		return _rsvp2.default.all(promises).then(function () {
			return object;
		});
	});
};

EnvironmentHandler.weatherHandlers = {
	snow: {
		update: function update(config, weatherState) {
			if (config.enabled) {
				if (!weatherState.snow || !weatherState.snow.enabled) {
					// add snow
					weatherState.snow = weatherState.snow || {};
					weatherState.snow.enabled = true;
					weatherState.snow.snow = new _Snow2.default(this.world.gooRunner);
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
		remove: function remove(weatherState) {
			if (weatherState.snow && weatherState.snow.snow) {
				weatherState.snow.snow.remove();
				weatherState.snow.enabled = false;
				delete weatherState.snow.snow;
			}
		}
	}
};
module.exports = exports.default;
