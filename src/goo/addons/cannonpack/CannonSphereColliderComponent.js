import { Component as Componentjs } from "../../entities/components/Component";
function CannonSphereColliderComponent(settings) {
	Componentjs.apply(this, arguments);

	settings = settings || {};
	this.type = 'CannonSphereColliderComponent';
	this.radius = settings.radius || 0.5;
	this.cannonShape = new CANNON.Sphere(this.radius);
}
CannonSphereColliderComponent.prototype = Object.create(Componentjs.prototype);
CannonSphereColliderComponent.constructor = CannonSphereColliderComponent;

var exported_CannonSphereColliderComponent = CannonSphereColliderComponent;

/* global CANNON */

/**
 * Sphere collider for the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {number} [settings.radius=0.5]
 */
export { exported_CannonSphereColliderComponent as CannonSphereColliderComponent };
