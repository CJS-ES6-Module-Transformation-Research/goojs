var ColliderComponentHandler_ColliderComponentHandler = ColliderComponentHandler;

import {
    ComponentHandler as loadershandlersComponentHandler_ComponentHandlerjs,
    _registerClass as ComponentHandlerjs__registerClass,
} from "../../../loaders/handlers/ComponentHandler";

import {     ColliderComponent as addonsphysicspackcomponentsColliderComponent_ColliderComponentjs, } from "../../../addons/physicspack/components/ColliderComponent";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../../util/ObjectUtils";
import {     SphereCollider as addonsphysicspackcollidersSphereCollider_SphereColliderjs, } from "../../../addons/physicspack/colliders/SphereCollider";
import { BoxCollider as addonsphysicspackcollidersBoxCollider_BoxColliderjs } from "../../../addons/physicspack/colliders/BoxCollider";
import { PlaneCollider as addonsphysicspackcollidersPlaneCollider_PlaneColliderjs } from "../../../addons/physicspack/colliders/PlaneCollider";
import {     CylinderCollider as addonsphysicspackcollidersCylinderCollider_CylinderColliderjs, } from "../../../addons/physicspack/colliders/CylinderCollider";
import { PhysicsMaterial as addonsphysicspackPhysicsMaterial_PhysicsMaterialjs } from "../../../addons/physicspack/PhysicsMaterial";
function ColliderComponentHandler() {
	loadershandlersComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'ColliderComponent';
}

ColliderComponentHandler.prototype = Object.create(loadershandlersComponentHandler_ComponentHandlerjs.prototype);
ColliderComponentHandler.prototype.constructor = ColliderComponentHandler;
ComponentHandlerjs__registerClass('collider', ColliderComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
ColliderComponentHandler.prototype._prepare = function (config) {
	return utilObjectUtils_ObjectUtilsjs.defaults(config, {
		shape: 'Box',
		shapeOptions: {
			halfExtents: [1, 1, 1],
			radius: 0.5,
			height: 1
		},
		isTrigger: false,
		friction: 0.3,
		restitution: 0.0
	});
};

/**
 * Create collider component.
 * @returns {ColliderComponent} the created component object
 * @private
 */
ColliderComponentHandler.prototype._create = function () {
	return new addonsphysicspackcomponentsColliderComponent_ColliderComponentjs({ material: new addonsphysicspackPhysicsMaterial_PhysicsMaterialjs() });
};

/**
 * Removes the collider component
 * @param {string} ref
 */
ColliderComponentHandler.prototype._remove = function (entity) {
	entity.clearComponent('ColliderComponent');
};

/**
 * Update engine collider component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
ColliderComponentHandler.prototype.update = function (entity, config, options) {
	return loadershandlersComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		switch (config.shape) {
		default:
		case 'Box':
			component.collider = new addonsphysicspackcollidersBoxCollider_BoxColliderjs(config.shapeOptions);
			component.worldCollider = new addonsphysicspackcollidersBoxCollider_BoxColliderjs();
			break;
		case 'Sphere':
			component.collider = new addonsphysicspackcollidersSphereCollider_SphereColliderjs(config.shapeOptions);
			component.worldCollider = new addonsphysicspackcollidersSphereCollider_SphereColliderjs();
			break;
		case 'Plane':
			component.collider = new addonsphysicspackcollidersPlaneCollider_PlaneColliderjs();
			component.worldCollider = new addonsphysicspackcollidersPlaneCollider_PlaneColliderjs();
			break;
		case 'Cylinder':
			component.collider = new addonsphysicspackcollidersCylinderCollider_CylinderColliderjs(config.shapeOptions);
			component.worldCollider = new addonsphysicspackcollidersCylinderCollider_CylinderColliderjs();
			break;
		}

		component.material.friction = config.friction;
		component.material.restitution = config.restitution;
		component.isTrigger = config.isTrigger;

		return component;
	});
};

/**
 * For handling loading of collider components
 * @extends ComponentHandler
 * @hidden
 */
export { ColliderComponentHandler_ColliderComponentHandler as ColliderComponentHandler };
