var mod_LightComponentHandler = LightComponentHandler;
import { ComponentHandler as ComponentHandler_ComponentHandler } from "../../loaders/handlers/ComponentHandler";
import { LightComponent as LightComponent_LightComponent } from "../../entities/components/LightComponent";
import { PointLight as PointLight_PointLight } from "../../renderer/light/PointLight";
import { SpotLight as SpotLight_SpotLight } from "../../renderer/light/SpotLight";
import { DirectionalLight as DirectionalLight_DirectionalLight } from "../../renderer/light/DirectionalLight";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";

/**
 * For handling loading of light components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function LightComponentHandler() {
	ComponentHandler_ComponentHandler.apply(this, arguments);
	this._type = 'LightComponent';
}

LightComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandler.prototype);
LightComponentHandler.prototype.constructor = LightComponentHandler;
ComponentHandler_ComponentHandler._registerClass('light', LightComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @private
 */
LightComponentHandler.prototype._prepare = function (config) {
	ObjectUtils_ObjectUtils.defaults(config, {
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
		ObjectUtils_ObjectUtils.defaults(config.shadowSettings, {
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
	return new LightComponent_LightComponent();
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
		SpotLight: SpotLight_SpotLight,
		DirectionalLight: DirectionalLight_DirectionalLight,
		PointLight: PointLight_PointLight
	};

	return ComponentHandler_ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
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
						if (light.shadowSettings[key] instanceof Vector3_Vector3) {
							light.shadowSettings[key].setDirect(shadowVal[0], shadowVal[1], shadowVal[2]);
						} else {
							light.shadowSettings[key] = ObjectUtils_ObjectUtils.clone(shadowVal);
						}
					}
				} else if (light[key] instanceof Vector3_Vector3) {
					light[key].setDirect(value[0], value[1], value[2]);
				} else {
					light[key] = ObjectUtils_ObjectUtils.clone(value);
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

/**
 * For handling loading of light components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { mod_LightComponentHandler as LightComponentHandler };
