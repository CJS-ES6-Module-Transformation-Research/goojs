import {
    ComponentHandler as ComponentHandler_ComponentHandlerjs,
    _registerClass as ComponentHandlerjs__registerClass,
} from "../../../loaders/handlers/ComponentHandler";

import { RigidBodyComponent as RigidBodyComponentjs } from "../../../addons/physicspack/components/RigidBodyComponent";
import { defaults as ObjectUtilsjs_defaults } from "../../../util/ObjectUtils";
import { Vector3 as Vector3js } from "../../../math/Vector3";
function RigidBodyComponentHandler() {
	ComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'RigidBodyComponent';
}

RigidBodyComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandlerjs.prototype);
RigidBodyComponentHandler.prototype.constructor = RigidBodyComponentHandler;
ComponentHandlerjs__registerClass('rigidBody', RigidBodyComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
RigidBodyComponentHandler.prototype._prepare = function (config) {
	return ObjectUtilsjs_defaults(config, {
		mass: 1,
		isKinematic: false,
		velocity: [0, 0, 0],
		angularVelocity: [0, 0, 0],
		linearDrag: 0,
		angularDrag: 0,
		freezePositionX: false,
		freezePositionY: false,
		freezePositionZ: false,
		freezeRotationX: false,
		freezeRotationY: false,
		freezeRotationZ: false
	});
};

/**
 * Create a rigid body component.
 * @returns {RigidBodyComponent} the created component object
 * @private
 */
RigidBodyComponentHandler.prototype._create = function () {
	return new RigidBodyComponentjs();
};

/**
 * Removes the rigid body component
 * @param {string} ref
 */
RigidBodyComponentHandler.prototype._remove = function (entity) {
	entity.clearComponent('RigidBodyComponent');
};

/**
 * Update engine rigid body component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
RigidBodyComponentHandler.prototype.update = function (entity, config, options) {
	return ComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		component.mass = config.mass;
		component.isKinematic = config.isKinematic;
		component.setVelocity(new Vector3js(config.velocity));
		component.setAngularVelocity(new Vector3js(config.angularVelocity));
		component.linearDamping = config.linearDrag;
		component.angularDamping = config.angularDrag;

		component.constraints = (
			(config.freezePositionX ? RigidBodyComponentjs_FREEZE_POSITION_X : 0) |
			(config.freezePositionY ? RigidBodyComponentjs_FREEZE_POSITION_Y : 0) |
			(config.freezePositionZ ? RigidBodyComponentjs_FREEZE_POSITION_Z : 0) |
			(config.freezeRotationX ? RigidBodyComponentjs_FREEZE_ROTATION_X : 0) |
			(config.freezeRotationY ? RigidBodyComponentjs_FREEZE_ROTATION_Y : 0) |
			(config.freezeRotationZ ? RigidBodyComponentjs_FREEZE_ROTATION_Z : 0)
		);

		return component;
	});
};

var exported_RigidBodyComponentHandler = RigidBodyComponentHandler;

/**
 * For handling loading of rigid body components
 * @extends ComponentHandler
 * @hidden
 */
export { exported_RigidBodyComponentHandler as RigidBodyComponentHandler };
