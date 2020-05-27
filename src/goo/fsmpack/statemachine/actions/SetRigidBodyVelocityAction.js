var SetRigidBodyVelocityAction_SetRigidBodyVelocityAction = SetRigidBodyVelocityAction;
import { Action as Action_Actionjs } from "./Action";
import { Vector3 as mathVector3_Vector3js } from "./../../../math/Vector3";

function SetRigidBodyVelocityAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}
SetRigidBodyVelocityAction.prototype = Object.create(Action_Actionjs.prototype);
SetRigidBodyVelocityAction.prototype.constructor = SetRigidBodyVelocityAction;

SetRigidBodyVelocityAction.external = {
	key: 'Set Rigid Body Velocity',
	name: 'Set Rigid Body Velocity',
	type: 'physics',
	description: 'Set the linear velocity of the rigid body component.',
	canTransition: false,
	parameters: [{
		name: 'Velocity',
		key: 'velocity',
		type: 'position',
		description: 'Velocity to set.',
		'default': [0, 0, 0]
	}],
	transitions: []
};

var tmpVector = new mathVector3_Vector3js();
SetRigidBodyVelocityAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) { return; }
	tmpVector.setArray(this.velocity);
	entity.rigidBodyComponent.setVelocity(tmpVector);
};

export { SetRigidBodyVelocityAction_SetRigidBodyVelocityAction as SetRigidBodyVelocityAction };