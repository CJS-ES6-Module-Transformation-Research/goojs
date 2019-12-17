import { Component } from "../../entities/components/Component";
var exported_CannonPlaneColliderComponent = CannonPlaneColliderComponent;
function CannonPlaneColliderComponent(settings) {
	Component.apply(this, arguments);

	this.type = 'CannonPlaneColliderComponent';

	settings = settings || {};

	// Create shape
	this.cannonShape = new CANNON.Plane();
}

CannonPlaneColliderComponent.prototype = Object.create(Component.prototype);
CannonPlaneColliderComponent.constructor = CannonPlaneColliderComponent;

/* global CANNON */

/**
 * Plane collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 */
export { exported_CannonPlaneColliderComponent as CannonPlaneColliderComponent };
