var CannonBoxColliderComponent_CannonBoxColliderComponent = CannonBoxColliderComponent;
import { Component as entitiescomponentsComponent_Componentjs } from "../../entities/components/Component";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
function CannonBoxColliderComponent(settings) {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	this.type = 'CannonBoxColliderComponent';

	settings = settings || {};
	var e = this.halfExtents = settings.halfExtents || new mathVector3_Vector3js(0.5, 0.5, 0.5);

	// Create shape
	this.cannonShape = new CANNON.Box(new CANNON.Vec3(e.x, e.y, e.z));

	this.isTrigger = typeof settings.isTrigger !== 'undefined' ? settings.isTrigger : false;
}

CannonBoxColliderComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);
CannonBoxColliderComponent.constructor = CannonBoxColliderComponent;

/* global CANNON */

/**
 * Physics box collider for Cannon.js. To be attached to an entity with a {@link CannonRigidbodyComponent}. Also see the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {Vector3} [settings.halfExtents] The half-extents of the box collider.
 * @extends Component
 */
export { CannonBoxColliderComponent_CannonBoxColliderComponent as CannonBoxColliderComponent };
