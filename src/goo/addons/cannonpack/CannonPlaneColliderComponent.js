import { Component as Componentjs } from "../../entities/components/Component";
function CannonPlaneColliderComponent(settings) {
	Componentjs.apply(this, arguments);

	this.type = 'CannonPlaneColliderComponent';

	settings = settings || {};

	// Create shape
	this.cannonShape = new CANNON.Plane();
}

CannonPlaneColliderComponent.prototype = Object.create(Componentjs.prototype);
CannonPlaneColliderComponent.constructor = CannonPlaneColliderComponent;

var exported_CannonPlaneColliderComponent = CannonPlaneColliderComponent;

/* global CANNON */

/**
 * Plane collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 */
export { exported_CannonPlaneColliderComponent as CannonPlaneColliderComponent };
