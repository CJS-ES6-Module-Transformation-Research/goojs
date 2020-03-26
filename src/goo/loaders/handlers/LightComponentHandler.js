import { ComponentHandler as loadershandlersComponentHandler_ComponentHandlerjs } from "../../loaders/handlers/ComponentHandler";
import { LightComponent as entitiescomponentsLightComponent_LightComponentjs } from "../../entities/components/LightComponent";
import { PointLight as rendererlightPointLight_PointLightjs } from "../../renderer/light/PointLight";
import { SpotLight as rendererlightSpotLight_SpotLightjs } from "../../renderer/light/SpotLight";
import { DirectionalLight as rendererlightDirectionalLight_DirectionalLightjs } from "../../renderer/light/DirectionalLight";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
function LightComponentHandler() {
	loadershandlersComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'LightComponent';
}

LightComponentHandler.prototype = Object.create(loadershandlersComponentHandler_ComponentHandlerjs.prototype);
LightComponentHandler.prototype.constructor = LightComponentHandler;
loadershandlersComponentHandler_ComponentHandlerjs._registerClass('light', LightComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @private
 */
LightComponentHandler.prototype._prepare = function (config) {
	utilObjectUtils_ObjectUtilsjs.defaults(config, {
		direction: [0, 0, 0],
		color: [1, 1, 1],
		shadowCaster: false,
		lightCookie: null
	});

	if (config.type !== 'DirectionalLight') {
		config.range = (config.range !== undefined) ? config.range : 1000;
	}

	if (config.shadowCaster) {
		config.shadowSettings = config.shadowSettings || {};
		utilObjectUtils_ObjectUtilsjs.defaults(config.shadowSettings, {
			shadowType: 'Basic',
			near: 1,
			far: 1000,
			resolution: [512, 512],
			darkness: 0.5,
			shadowOffset: -0.001
		});

		var settings = config.shadowSettings;

		if (settings.projection === 'Parallel') {
			settings.size = (settings.size !== undefined) ? settings.size : 400;
		} else {
			settings.fov = (settings.fov !== undefined) ? settings.fov : 55;
		}
	}
};

/**
 * Create light component object based on the config.
 * @returns {LightComponent} the created component object
 * @private
 */
LightComponentHandler.prototype._create = function () {
	return new entitiescomponentsLightComponent_LightComponentjs();
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
		SpotLight: rendererlightSpotLight_SpotLightjs,
		DirectionalLight: rendererlightDirectionalLight_DirectionalLightjs,
		PointLight: rendererlightPointLight_PointLightjs
	};

	return loadershandlersComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }
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
						if (light.shadowSettings[key] instanceof mathVector3_Vector3js) {
							light.shadowSettings[key].setDirect(shadowVal[0], shadowVal[1], shadowVal[2]);
						} else {
							light.shadowSettings[key] = utilObjectUtils_ObjectUtilsjs.clone(shadowVal);
						}
					}
				} else if (light[key] instanceof mathVector3_Vector3js) {
					light[key].setDirect(value[0], value[1], value[2]);
				} else {
					light[key] = utilObjectUtils_ObjectUtilsjs.clone(value);
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

var exported_LightComponentHandler = LightComponentHandler;

/**
 * For handling loading of light components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { exported_LightComponentHandler as LightComponentHandler };
