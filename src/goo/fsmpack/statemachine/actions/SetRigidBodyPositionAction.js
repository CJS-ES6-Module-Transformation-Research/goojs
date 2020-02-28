Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetRigidBodyPositionAction = undefined;

var _Action = require("./Action");

var _Vector = require("./../../../math/Vector3");

function SetRigidBodyPositionAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}
SetRigidBodyPositionAction.prototype = Object.create(_Action.Action.prototype);
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

var tmpVector = new _Vector.Vector3();
SetRigidBodyPositionAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) {
		return;
	}
	tmpVector.setArray(this.position);
	entity.rigidBodyComponent.setPosition(tmpVector);
};

var exported_SetRigidBodyPositionAction = SetRigidBodyPositionAction;
exports.SetRigidBodyPositionAction = exported_SetRigidBodyPositionAction;
