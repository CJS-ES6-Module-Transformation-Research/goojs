var RigidBodyComponentHandler_RigidBodyComponentHandler = RigidBodyComponentHandler;
import { ComponentHandler as loadershandlersComponentHandler_ComponentHandlerjs } from "../../../loaders/handlers/ComponentHandler";
import {     RigidBodyComponent as addonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs, } from "../../../addons/physicspack/components/RigidBodyComponent";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../../util/ObjectUtils";
import { Vector3 as mathVector3_Vector3js } from "../../../math/Vector3";
function RigidBodyComponentHandler() {
	loadershandlersComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'RigidBodyComponent';
}

RigidBodyComponentHandler.prototype = Object.create(loadershandlersComponentHandler_ComponentHandlerjs.prototype);
RigidBodyComponentHandler.prototype.constructor = RigidBodyComponentHandler;
loadershandlersComponentHandler_ComponentHandlerjs._registerClass('rigidBody', RigidBodyComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
RigidBodyComponentHandler.prototype._prepare = function (config) {
	return utilObjectUtils_ObjectUtilsjs.defaults(config, {
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
	return new addonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs();
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
	return loadershandlersComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		component.mass = config.mass;
		component.isKinematic = config.isKinematic;
		component.setVelocity(new mathVector3_Vector3js(config.velocity));
		component.setAngularVelocity(new mathVector3_Vector3js(config.angularVelocity));
		component.linearDamping = config.linearDrag;
		component.angularDamping = config.angularDrag;

		component.constraints = (
			(config.freezePositionX ? addonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs.FREEZE_POSITION_X : 0) |
			(config.freezePositionY ? addonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs.FREEZE_POSITION_Y : 0) |
			(config.freezePositionZ ? addonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs.FREEZE_POSITION_Z : 0) |
			(config.freezeRotationX ? addonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs.FREEZE_ROTATION_X : 0) |
			(config.freezeRotationY ? addonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs.FREEZE_ROTATION_Y : 0) |
			(config.freezeRotationZ ? addonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs.FREEZE_ROTATION_Z : 0)
		);

		return component;
	});
};

/**
 * For handling loading of rigid body components
 * @extends ComponentHandler
 * @hidden
 */
export { RigidBodyComponentHandler_RigidBodyComponentHandler as RigidBodyComponentHandler };
