Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CannonDistanceJointComponent = undefined;

var _Component = require("../../entities/components/Component");

var _ObjectUtils = require("../../util/ObjectUtils");

function CannonDistanceJointComponent(settings) {
	_Component.Component.apply(this, arguments);

	settings = settings || {};
	this.type = 'CannonDistanceJointComponent';

	(0, _ObjectUtils.defaults)(settings, {
		distance: 1,
		connectedBody: null
	});

	this.distance = settings.distance;
	this.connectedBody = settings.connectedBody;

	this.cannonConstraint = null;
}
CannonDistanceJointComponent.prototype = Object.create(_Component.Component.prototype);
CannonDistanceJointComponent.constructor = CannonDistanceJointComponent;

CannonDistanceJointComponent.prototype.createConstraint = function (entity) {
	var bodyA = entity.cannonRigidbodyComponent.body;
	var bodyB = this.connectedBody.body;
	this.cannonConstraint = new CANNON.DistanceConstraint(bodyA, bodyB, this.distance);
	return this.cannonConstraint;
};

var exported_CannonDistanceJointComponent = CannonDistanceJointComponent;

/* global CANNON */

/**
 * Distance joint. Add to an entity with a {@link CannonRigidbodyComponent} and physically link it to another entity!<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @extends Component
 * @param {Object} [settings]
 * @param {number} [settings.distance=1]
 * @param {CannonRigidbodyComponent} settings.connectedBody
 */
exports.CannonDistanceJointComponent = exported_CannonDistanceJointComponent;
