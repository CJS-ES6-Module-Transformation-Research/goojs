var mod_CameraComponentHandler = CameraComponentHandler;

import {
    ComponentHandler as ComponentHandler_ComponentHandler,
    _registerClass as ComponentHandlerjs__registerClass,
} from "../../loaders/handlers/ComponentHandler";

import { CameraComponent as CameraComponent_CameraComponent } from "../../entities/components/CameraComponent";
import { Camera as Camera_Camera } from "../../renderer/Camera";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";

/**
 * For handling loading of camera components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function CameraComponentHandler() {
	ComponentHandler_ComponentHandler.apply(this, arguments);
	this._type = 'CameraComponent';
}

CameraComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandler.prototype);
ComponentHandlerjs__registerClass('camera', CameraComponentHandler);
CameraComponentHandler.prototype.constructor = CameraComponentHandler;

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
CameraComponentHandler.prototype._prepare = function (config) {
	ObjectUtils_ObjectUtils.defaults(config, {
		near: 1,
		far: 10000,
		projectionMode: 'Perspective',
		aspect: 1,
		lockedRatio: false
	});
	if (config.projectionMode === 'Perspective' && config.fov === undefined) {
		config.fov = 45;
	}
	if (config.projectionMode === 'Parallel' && config.size === undefined) {
		config.size = 100;
	}
	if (config.projectionMode !== 'Perspective' && config.projectionMode !== 'Parallel') {
		config.projectionMode = 'Perspective';
	}
};

/**
 * Create camera component object.
 * @param {Entity} entity The entity on which this component should be added.
 * @returns {CameraComponent} the created component object
 * @private
 */
CameraComponentHandler.prototype._create = function () {
	var camera = new Camera_Camera(45, 1, 1, 1000);
	var component = new CameraComponent_CameraComponent(camera);
	return component;
};

// TODO: Handle if cameracomponent is removed and camera is active

/**
 * Update engine cameracomponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
CameraComponentHandler.prototype.update = function (entity, config, options) {
	return ComponentHandler_ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }
		component.camera.setProjectionMode(Camera_Camera[config.projectionMode]);
		component.camera.lockedRatio = false;
		if (config.projectionMode === 'Perspective') {
			component.camera.setFrustumPerspective(config.fov, null, config.near, config.far);
		} else {
			var size = config.size;
			component.camera.setFrustum(config.near, config.far, -size, size, size, -size, null);
			component.camera.size = size;
		}
		return component;
	});
};

/**
 * For handling loading of camera components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { mod_CameraComponentHandler as CameraComponentHandler };
