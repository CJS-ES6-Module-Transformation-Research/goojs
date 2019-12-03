import { Action } from "./Action";
import { Vector3 } from "./../../../math/Vector3";
var exported_SetRigidBodyPositionAction = SetRigidBodyPositionAction;

function SetRigidBodyPositionAction/*id, settings*/() {
	Action.apply(this, arguments);
}
SetRigidBodyPositionAction.prototype = Object.create(Action.prototype);
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

var tmpVector = new Vector3();
SetRigidBodyPositionAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) { return; }
	tmpVector.setArray(this.position);
	entity.rigidBodyComponent.setPosition(tmpVector);
};

export { exported_SetRigidBodyPositionAction as SetRigidBodyPositionAction };