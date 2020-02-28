import { Component as Component_Componentjs } from "../../entities/components/Component";
import { defaults as ObjectUtilsjs_defaults } from "../../util/ObjectUtils";
function CannonDistanceJointComponent(settings) {
	Component_Componentjs.apply(this, arguments);

	settings = settings || {};
	this.type = 'CannonDistanceJointComponent';

	ObjectUtilsjs_defaults(settings, {
		distance: 1,
		connectedBody: null
	});

	this.distance = settings.distance;
	this.connectedBody = settings.connectedBody;

	this.cannonConstraint = null;
}
CannonDistanceJointComponent.prototype = Object.create(Component_Componentjs.prototype);
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
export { exported_CannonDistanceJointComponent as CannonDistanceJointComponent };
