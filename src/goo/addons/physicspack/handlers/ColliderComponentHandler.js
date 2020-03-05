import { ComponentHandler as ComponentHandler_ComponentHandlerjs } from "../../../loaders/handlers/ComponentHandler";
import { ColliderComponent as ColliderComponent_ColliderComponentjs } from "../../../addons/physicspack/components/ColliderComponent";
import { ObjectUtils as ObjectUtils_ObjectUtilsjs } from "../../../util/ObjectUtils";
import { SphereCollider as SphereCollider_SphereColliderjs } from "../../../addons/physicspack/colliders/SphereCollider";
import { BoxCollider as BoxCollider_BoxColliderjs } from "../../../addons/physicspack/colliders/BoxCollider";
import { PlaneCollider as PlaneCollider_PlaneColliderjs } from "../../../addons/physicspack/colliders/PlaneCollider";
import { CylinderCollider as CylinderCollider_CylinderColliderjs } from "../../../addons/physicspack/colliders/CylinderCollider";
import { PhysicsMaterial as PhysicsMaterial_PhysicsMaterialjs } from "../../../addons/physicspack/PhysicsMaterial";
function ColliderComponentHandler() {
	ComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'ColliderComponent';
}

ColliderComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandlerjs.prototype);
ColliderComponentHandler.prototype.constructor = ColliderComponentHandler;
ComponentHandler_ComponentHandlerjs._registerClass('collider', ColliderComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
ColliderComponentHandler.prototype._prepare = function (config) {
	return ObjectUtils_ObjectUtilsjs.defaults(config, {
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
	return new ColliderComponent_ColliderComponentjs({ material: new PhysicsMaterial_PhysicsMaterialjs() });
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
	return ComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		switch (config.shape) {
		default:
		case 'Box':
			component.collider = new BoxCollider_BoxColliderjs(config.shapeOptions);
			component.worldCollider = new BoxCollider_BoxColliderjs();
			break;
		case 'Sphere':
			component.collider = new SphereCollider_SphereColliderjs(config.shapeOptions);
			component.worldCollider = new SphereCollider_SphereColliderjs();
			break;
		case 'Plane':
			component.collider = new PlaneCollider_PlaneColliderjs();
			component.worldCollider = new PlaneCollider_PlaneColliderjs();
			break;
		case 'Cylinder':
			component.collider = new CylinderCollider_CylinderColliderjs(config.shapeOptions);
			component.worldCollider = new CylinderCollider_CylinderColliderjs();
			break;
		}

		component.material.friction = config.friction;
		component.material.restitution = config.restitution;
		component.isTrigger = config.isTrigger;

		return component;
	});
};

var exported_ColliderComponentHandler = ColliderComponentHandler;

/**
 * For handling loading of collider components
 * @extends ComponentHandler
 * @hidden
 */
export { exported_ColliderComponentHandler as ColliderComponentHandler };
