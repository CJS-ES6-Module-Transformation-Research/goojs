"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetRigidBodyAngularVelocityAction = undefined;

var _Action = require("./Action");

var _Vector = require("./../../../math/Vector3");

function SetRigidBodyAngularVelocityAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}
SetRigidBodyAngularVelocityAction.prototype = Object.create(_Action.Action.prototype);
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

var tmpVector = new _Vector.Vector3();
SetRigidBodyAngularVelocityAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) {
		return;
	}
	tmpVector.setArray(this.velocity);
	entity.rigidBodyComponent.setAngularVelocity(tmpVector);
};

var exported_SetRigidBodyAngularVelocityAction = SetRigidBodyAngularVelocityAction;
exports.SetRigidBodyAngularVelocityAction = exported_SetRigidBodyAngularVelocityAction;
