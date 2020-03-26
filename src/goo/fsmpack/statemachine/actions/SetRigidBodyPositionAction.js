import { Action as Action_Actionjs } from "./Action";
import { Vector3 as mathVector3_Vector3js } from "./../../../math/Vector3";

function SetRigidBodyPositionAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}
SetRigidBodyPositionAction.prototype = Object.create(Action_Actionjs.prototype);
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

var tmpVector = new mathVector3_Vector3js();
SetRigidBodyPositionAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) { return; }
	tmpVector.setArray(this.position);
	entity.rigidBodyComponent.setPosition(tmpVector);
};

var exported_SetRigidBodyPositionAction = SetRigidBodyPositionAction;
export { exported_SetRigidBodyPositionAction as SetRigidBodyPositionAction };