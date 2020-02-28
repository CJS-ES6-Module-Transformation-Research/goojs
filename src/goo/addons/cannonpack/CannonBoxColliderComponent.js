import { Component as Component_Componentjs } from "../../entities/components/Component";
import { Vector3 as Vector3js } from "../../math/Vector3";
function CannonBoxColliderComponent(settings) {
	Component_Componentjs.apply(this, arguments);

	this.type = 'CannonBoxColliderComponent';

	settings = settings || {};
	var e = this.halfExtents = settings.halfExtents || new Vector3js(0.5, 0.5, 0.5);

	// Create shape
	this.cannonShape = new CANNON.Box(new CANNON.Vec3(e.x, e.y, e.z));

	this.isTrigger = typeof settings.isTrigger !== 'undefined' ? settings.isTrigger : false;
}

CannonBoxColliderComponent.prototype = Object.create(Component_Componentjs.prototype);
CannonBoxColliderComponent.constructor = CannonBoxColliderComponent;

var exported_CannonBoxColliderComponent = CannonBoxColliderComponent;

/* global CANNON */

/**
 * Physics box collider for Cannon.js. To be attached to an entity with a {@link CannonRigidbodyComponent}. Also see the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {Vector3} [settings.halfExtents] The half-extents of the box collider.
 * @extends Component
 */
export { exported_CannonBoxColliderComponent as CannonBoxColliderComponent };
