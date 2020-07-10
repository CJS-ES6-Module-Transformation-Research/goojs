"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetRigidBodyVelocityAction = undefined;

var _Action = require("./Action");

var _Vector = require("./../../../math/Vector3");

var SetRigidBodyVelocityAction_SetRigidBodyVelocityAction = SetRigidBodyVelocityAction;

function SetRigidBodyVelocityAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}
SetRigidBodyVelocityAction.prototype = Object.create(_Action.Action.prototype);
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

var tmpVector = new _Vector.Vector3();
SetRigidBodyVelocityAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) {
		return;
	}
	tmpVector.setArray(this.velocity);
	entity.rigidBodyComponent.setVelocity(tmpVector);
};

exports.SetRigidBodyVelocityAction = SetRigidBodyVelocityAction_SetRigidBodyVelocityAction;