var mod_SetRigidBodyPositionAction = SetRigidBodyPositionAction;
import { Action as Action_Action } from "./Action";
import { Vector3 as Vector3_Vector3 } from "./../../../math/Vector3";

function SetRigidBodyPositionAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}
SetRigidBodyPositionAction.prototype = Object.create(Action_Action.prototype);
SetRigidBodyPositionAction.prototype.constructor = SetRigidBodyPositionAction;

SetRigidBodyPositionAction.external = {
	key: 'Set Rigid Body Position',
	name: 'Set Rigid Body Position',
	type: 'physics',
	description: 'Set the position of the rigid body.',
	canTransition: false,
	parameters: [{
		name: 'Position',
		key: 'position',
		type: 'position',
		description: 'Absolute world position to set.',
		'default': [0, 0, 0]
	}],
	transitions: []
};

var tmpVector = new Vector3_Vector3();
SetRigidBodyPositionAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) { return; }
	tmpVector.setArray(this.position);
	entity.rigidBodyComponent.setPosition(tmpVector);
};

export { mod_SetRigidBodyPositionAction as SetRigidBodyPositionAction };