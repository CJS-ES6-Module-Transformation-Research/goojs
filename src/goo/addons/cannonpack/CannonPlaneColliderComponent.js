import Component from "../../entities/components/Component";

/* global CANNON */

/**
 * Plane collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 */
export default function CannonPlaneColliderComponent(settings) {
	Component.apply(this, arguments);

	this.type = 'CannonPlaneColliderComponent';

	settings = settings || {};

	// Create shape
	this.cannonShape = new CANNON.Plane();
}

CannonPlaneColliderComponent.prototype = Object.create(Component.prototype);
CannonPlaneColliderComponent.constructor = CannonPlaneColliderComponent;
