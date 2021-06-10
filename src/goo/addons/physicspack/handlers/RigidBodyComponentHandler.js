var mod_RigidBodyComponentHandler = RigidBodyComponentHandler;
import { ComponentHandler as ComponentHandler_ComponentHandler } from "../../../loaders/handlers/ComponentHandler";
import { RigidBodyComponent as RigidBodyComponent_RigidBodyComponent } from "../../../addons/physicspack/components/RigidBodyComponent";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../../util/ObjectUtils";
import { Vector3 as Vector3_Vector3 } from "../../../math/Vector3";

/**
 * For handling loading of rigid body components
 * @extends ComponentHandler
 * @hidden
 */
function RigidBodyComponentHandler() {
	ComponentHandler_ComponentHandler.apply(this, arguments);
	this._type = 'RigidBodyComponent';
}

RigidBodyComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandler.prototype);
RigidBodyComponentHandler.prototype.constructor = RigidBodyComponentHandler;
ComponentHandler_ComponentHandler._registerClass('rigidBody', RigidBodyComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
RigidBodyComponentHandler.prototype._prepare = function (config) {
	return ObjectUtils_ObjectUtils.defaults(config, {
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
	return new RigidBodyComponent_RigidBodyComponent();
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
	return ComponentHandler_ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		component.mass = config.mass;
		component.isKinematic = config.isKinematic;
		component.setVelocity(new Vector3_Vector3(config.velocity));
		component.setAngularVelocity(new Vector3_Vector3(config.angularVelocity));
		component.linearDamping = config.linearDrag;
		component.angularDamping = config.angularDrag;

		component.constraints = (
			(config.freezePositionX ? RigidBodyComponent_RigidBodyComponent.FREEZE_POSITION_X : 0) |
			(config.freezePositionY ? RigidBodyComponent_RigidBodyComponent.FREEZE_POSITION_Y : 0) |
			(config.freezePositionZ ? RigidBodyComponent_RigidBodyComponent.FREEZE_POSITION_Z : 0) |
			(config.freezeRotationX ? RigidBodyComponent_RigidBodyComponent.FREEZE_ROTATION_X : 0) |
			(config.freezeRotationY ? RigidBodyComponent_RigidBodyComponent.FREEZE_ROTATION_Y : 0) |
			(config.freezeRotationZ ? RigidBodyComponent_RigidBodyComponent.FREEZE_ROTATION_Z : 0)
		);

		return component;
	});
};

/**
 * For handling loading of rigid body components
 * @extends ComponentHandler
 * @hidden
 */
export { mod_RigidBodyComponentHandler as RigidBodyComponentHandler };
