import { Action as Action_Actionjs } from "./Action";
import { Vector3 as Vector3js } from "./../../../math/Vector3";

function SetRigidBodyAngularVelocityAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}
SetRigidBodyAngularVelocityAction.prototype = Object.create(Action_Actionjs.prototype);
SetRigidBodyAngularVelocityAction.prototype.constructor = SetRigidBodyAngularVelocityAction;

SetRigidBodyAngularVelocityAction.external = {
	key: 'Set Rigid Body Angular Velocity',
	name: 'Set Rigid Body Angular Velocity',
	type: 'physics',
	description: 'Set the angular velocity of the rigid body component.',
	canTransition: false,
	parameters: [{
		name: 'Angular velocity',
		key: 'velocity',
		type: 'position',
		description: 'Angular velocity to set.',
		'default': [0, 0, 0]
	}],
	transitions: []
};

var tmpVector = new Vector3js();
SetRigidBodyAngularVelocityAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) { return; }
	tmpVector.setArray(this.velocity);
	entity.rigidBodyComponent.setAngularVelocity(tmpVector);
};

var exported_SetRigidBodyAngularVelocityAction = SetRigidBodyAngularVelocityAction;
export { exported_SetRigidBodyAngularVelocityAction as SetRigidBodyAngularVelocityAction };