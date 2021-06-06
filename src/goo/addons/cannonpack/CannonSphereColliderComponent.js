var mod_CannonSphereColliderComponent = CannonSphereColliderComponent;
import { Component as Component_Component } from "../../entities/components/Component";

/* global CANNON */

/**
 * Sphere collider for the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {number} [settings.radius=0.5]
 */
function CannonSphereColliderComponent(settings) {
	Component_Component.apply(this, arguments);

	settings = settings || {};
	this.type = 'CannonSphereColliderComponent';
	this.radius = settings.radius || 0.5;
	this.cannonShape = new CANNON.Sphere(this.radius);
}
CannonSphereColliderComponent.prototype = Object.create(Component_Component.prototype);
CannonSphereColliderComponent.constructor = CannonSphereColliderComponent;

/* global CANNON */

/**
 * Sphere collider for the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {number} [settings.radius=0.5]
 */
export { mod_CannonSphereColliderComponent as CannonSphereColliderComponent };
