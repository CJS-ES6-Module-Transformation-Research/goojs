var CannonCylinderColliderComponent_CannonCylinderColliderComponent = CannonCylinderColliderComponent;
import { Component as entitiescomponentsComponent_Componentjs } from "../../entities/components/Component";
function CannonCylinderColliderComponent(settings) {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	settings = settings || {};
	this.type = 'CannonCylinderColliderComponent';

	var radiusTop = typeof settings.radiusTop === 'number' ? settings.radiusTop : 0.5;
	var radiusBottom = typeof settings.radiusBottom === 'number' ? settings.radiusBottom : 0.5;
	var height = typeof settings.height === 'number' ? settings.height : 1;
	var numSegments = typeof settings.numSegments === 'number' ? settings.numSegments : 10;

	this.cannonShape = new CANNON.Cylinder(
		radiusTop,
		radiusBottom,
		height,
		numSegments
	);
}
CannonCylinderColliderComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);
CannonCylinderColliderComponent.constructor = CannonCylinderColliderComponent;

/* global CANNON */

/**
 * Sphere collider for the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {number} [settings.radiusTop=0.5]
 * @param {number} [settings.radiusBottom=0.5]
 * @param {number} [settings.height=0.5]
 * @param {number} [settings.numSegments=10]
 */
export { CannonCylinderColliderComponent_CannonCylinderColliderComponent as CannonCylinderColliderComponent };
