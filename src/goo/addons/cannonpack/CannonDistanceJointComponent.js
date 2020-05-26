var CannonDistanceJointComponent_CannonDistanceJointComponent = CannonDistanceJointComponent;
import { Component as entitiescomponentsComponent_Componentjs } from "../../entities/components/Component";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
function CannonDistanceJointComponent(settings) {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	settings = settings || {};
	this.type = 'CannonDistanceJointComponent';

	utilObjectUtils_ObjectUtilsjs.defaults(settings, {
		distance: 1,
		connectedBody: null
	});

	this.distance = settings.distance;
	this.connectedBody = settings.connectedBody;

	this.cannonConstraint = null;
}
CannonDistanceJointComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);
CannonDistanceJointComponent.constructor = CannonDistanceJointComponent;

CannonDistanceJointComponent.prototype.createConstraint = function (entity) {
	var bodyA = entity.cannonRigidbodyComponent.body;
	var bodyB = this.connectedBody.body;
	this.cannonConstraint = new CANNON.DistanceConstraint(bodyA, bodyB, this.distance);
	return this.cannonConstraint;
};

/* global CANNON */

/**
 * Distance joint. Add to an entity with a {@link CannonRigidbodyComponent} and physically link it to another entity!<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @extends Component
 * @param {Object} [settings]
 * @param {number} [settings.distance=1]
 * @param {CannonRigidbodyComponent} settings.connectedBody
 */
export { CannonDistanceJointComponent_CannonDistanceJointComponent as CannonDistanceJointComponent };
