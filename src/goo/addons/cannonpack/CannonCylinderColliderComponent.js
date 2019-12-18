Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CannonCylinderColliderComponent = undefined;

var _Component = require('../../entities/components/Component');

function CannonCylinderColliderComponent(settings) {
	_Component.Component.apply(this, arguments);

	settings = settings || {};
	this.type = 'CannonCylinderColliderComponent';

	var radiusTop = typeof settings.radiusTop === 'number' ? settings.radiusTop : 0.5;
	var radiusBottom = typeof settings.radiusBottom === 'number' ? settings.radiusBottom : 0.5;
	var height = typeof settings.height === 'number' ? settings.height : 1;
	var numSegments = typeof settings.numSegments === 'number' ? settings.numSegments : 10;

	this.cannonShape = new CANNON.Cylinder(radiusTop, radiusBottom, height, numSegments);
}
CannonCylinderColliderComponent.prototype = Object.create(_Component.Component.prototype);
CannonCylinderColliderComponent.constructor = CannonCylinderColliderComponent;

var exported_CannonCylinderColliderComponent = CannonCylinderColliderComponent;

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
exports.CannonCylinderColliderComponent = exported_CannonCylinderColliderComponent;
