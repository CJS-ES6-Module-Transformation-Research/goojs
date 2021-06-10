var mod_SetRigidBodyAngularVelocityAction = SetRigidBodyAngularVelocityAction;
import { Action as Action_Action } from "./Action";
import { Vector3 as Vector3_Vector3 } from "./../../../math/Vector3";

function SetRigidBodyAngularVelocityAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}
SetRigidBodyAngularVelocityAction.prototype = Object.create(Action_Action.prototype);
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

var tmpVector = new Vector3_Vector3();
SetRigidBodyAngularVelocityAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) { return; }
	tmpVector.setArray(this.velocity);
	entity.rigidBodyComponent.setAngularVelocity(tmpVector);
};

export { mod_SetRigidBodyAngularVelocityAction as SetRigidBodyAngularVelocityAction };