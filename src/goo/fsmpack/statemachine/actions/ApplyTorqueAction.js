"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ApplyTorqueAction = undefined;

var _Action = require("./Action");

var _Vector = require("../../../math/Vector3");

var _SystemBus = require("../../../entities/SystemBus");

var ApplyTorqueAction_ApplyTorqueAction = ApplyTorqueAction;

function ApplyTorqueAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

ApplyTorqueAction.prototype = Object.create(_Action.Action.prototype);
ApplyTorqueAction.prototype.constructor = ApplyTorqueAction;

ApplyTorqueAction.external = {
	key: 'ApplyTorque',
	name: 'Apply torque on rigid body',
	type: 'physics',
	description: 'Apply a torque to the attached rigid body.',
	canTransition: false,
	parameters: [{
		name: 'Torque',
		key: 'torque',
		type: 'position',
		description: 'Torque to apply to the body.',
		'default': [0, 0, 0]
	}, {
		name: 'Space',
		key: 'space',
		type: 'string',
		control: 'dropdown',
		description: 'Whether to apply the torque in local or world space.',
		'default': 'World',
		options: ['World', 'Local']
	}],
	transitions: []
};

var torqueVector = new _Vector.Vector3();
ApplyTorqueAction.prototype.enter = function (fsm) {
	_SystemBus.SystemBusjs.addListener('goo.physics.substep', this.substepListener = function () {
		var entity = fsm.getOwnerEntity();
		if (!entity || !entity.rigidBodyComponent) {
			return;
		}

		torqueVector.setArray(this.torque);
		if (this.space === 'World') {
			entity.rigidBodyComponent.applyTorque(torqueVector);
		} else {
			entity.rigidBodyComponent.applyTorqueLocal(torqueVector);
		}
	}.bind(this));
};

ApplyTorqueAction.prototype.exit = function () {
	_SystemBus.SystemBusjs.removeListener('goo.physics.substep', this.substepListener);
};

exports.ApplyTorqueAction = ApplyTorqueAction_ApplyTorqueAction;