var mod_ColliderComponentHandler = ColliderComponentHandler;
import { ComponentHandler as ComponentHandler_ComponentHandler } from "../../../loaders/handlers/ComponentHandler";
import { ColliderComponent as ColliderComponent_ColliderComponent } from "../../../addons/physicspack/components/ColliderComponent";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../../util/ObjectUtils";
import { SphereCollider as SphereCollider_SphereCollider } from "../../../addons/physicspack/colliders/SphereCollider";
import { BoxCollider as BoxCollider_BoxCollider } from "../../../addons/physicspack/colliders/BoxCollider";
import { PlaneCollider as PlaneCollider_PlaneCollider } from "../../../addons/physicspack/colliders/PlaneCollider";
import { CylinderCollider as CylinderCollider_CylinderCollider } from "../../../addons/physicspack/colliders/CylinderCollider";
import { PhysicsMaterial as PhysicsMaterial_PhysicsMaterial } from "../../../addons/physicspack/PhysicsMaterial";

/**
 * For handling loading of collider components
 * @extends ComponentHandler
 * @hidden
 */
function ColliderComponentHandler() {
	ComponentHandler_ComponentHandler.apply(this, arguments);
	this._type = 'ColliderComponent';
}

ColliderComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandler.prototype);
ColliderComponentHandler.prototype.constructor = ColliderComponentHandler;
ComponentHandler_ComponentHandler._registerClass('collider', ColliderComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
ColliderComponentHandler.prototype._prepare = function (config) {
	return ObjectUtils_ObjectUtils.defaults(config, {
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
	return new ColliderComponent_ColliderComponent({ material: new PhysicsMaterial_PhysicsMaterial() });
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
	return ComponentHandler_ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		switch (config.shape) {
		default:
		case 'Box':
			component.collider = new BoxCollider_BoxCollider(config.shapeOptions);
			component.worldCollider = new BoxCollider_BoxCollider();
			break;
		case 'Sphere':
			component.collider = new SphereCollider_SphereCollider(config.shapeOptions);
			component.worldCollider = new SphereCollider_SphereCollider();
			break;
		case 'Plane':
			component.collider = new PlaneCollider_PlaneCollider();
			component.worldCollider = new PlaneCollider_PlaneCollider();
			break;
		case 'Cylinder':
			component.collider = new CylinderCollider_CylinderCollider(config.shapeOptions);
			component.worldCollider = new CylinderCollider_CylinderCollider();
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
export { mod_ColliderComponentHandler as ColliderComponentHandler };
