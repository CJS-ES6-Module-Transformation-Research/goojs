Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LightComponentHandler;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _LightComponent = require("../../entities/components/LightComponent");

var _LightComponent2 = _interopRequireDefault(_LightComponent);

var _PointLight = require("../../renderer/light/PointLight");

var _PointLight2 = _interopRequireDefault(_PointLight);

var _SpotLight = require("../../renderer/light/SpotLight");

var _SpotLight2 = _interopRequireDefault(_SpotLight);

var _DirectionalLight = require("../../renderer/light/DirectionalLight");

var _DirectionalLight2 = _interopRequireDefault(_DirectionalLight);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of light components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function LightComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'LightComponent';
}

LightComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
LightComponentHandler.prototype.constructor = LightComponentHandler;
_ComponentHandler2.default._registerClass('light', LightComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @private
 */
LightComponentHandler.prototype._prepare = function (config) {
	_ObjectUtils2.default.defaults(config, {
		direction: [0, 0, 0],
		color: [1, 1, 1],
		shadowCaster: false,
		lightCookie: null
	});

	if (config.type !== 'DirectionalLight') {
		config.range = config.range !== undefined ? config.range : 1000;
	}

	if (config.shadowCaster) {
		config.shadowSettings = config.shadowSettings || {};
		_ObjectUtils2.default.defaults(config.shadowSettings, {
			shadowType: 'Basic',
			near: 1,
			far: 1000,
			resolution: [512, 512],
			darkness: 0.5,
			shadowOffset: -0.001
		});

		var settings = config.shadowSettings;

		if (settings.projection === 'Parallel') {
			settings.size = settings.size !== undefined ? settings.size : 400;
		} else {
			settings.fov = settings.fov !== undefined ? settings.fov : 55;
		}
	}
};

/**
 * Create light component object based on the config.
 * @returns {LightComponent} the created component object
 * @private
 */
LightComponentHandler.prototype._create = function () {
	return new _LightComponent2.default();
};

/**
 * Update engine cameracomponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
LightComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;
	var Light = {
		SpotLight: _SpotLight2.default,
		DirectionalLight: _DirectionalLight2.default,
		PointLight: _PointLight2.default
	};

	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}
		var light = component.light;
		if (!light || Light[config.type] !== light.constructor) {
			light = new Light[config.type]();
			component.light = light;
		}

		for (var key in config) {
			var value = config[key];
			if (light.hasOwnProperty(key)) {
				if (key === 'shadowSettings') {
					for (var key in value) {
						var shadowVal = value[key];
						if (light.shadowSettings[key] instanceof _Vector2.default) {
							light.shadowSettings[key].setDirect(shadowVal[0], shadowVal[1], shadowVal[2]);
						} else {
							light.shadowSettings[key] = _ObjectUtils2.default.clone(shadowVal);
						}
					}
				} else if (light[key] instanceof _Vector2.default) {
					light[key].setDirect(value[0], value[1], value[2]);
				} else {
					light[key] = _ObjectUtils2.default.clone(value);
				}
			}
		}

		if (config.type === 'PointLight') {
			light.shadowCaster = false;
		}

		if (config.lightCookie && config.type !== 'PointLight') {
			var textureObj = config.lightCookie;

			if (!textureObj || !textureObj.textureRef || textureObj.enabled === false) {
				light.lightCookie = null;
				return component;
			} else {
				return that._load(textureObj.textureRef, options).then(function (texture) {
					light.lightCookie = texture;
					return component;
				});
			}
		} else {
			light.lightCookie = null;
			return component;
		}
	});
};
module.exports = exports.default;
