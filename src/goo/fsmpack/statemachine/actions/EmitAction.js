"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EmitAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _SystemBus = require("../../../entities/SystemBus");

var EmitAction_EmitAction = EmitAction;

function EmitAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

EmitAction.prototype = Object.create(_Action.Action.prototype);
EmitAction.prototype.constructor = EmitAction;

EmitAction.external = {
	key: 'Emit message',
	name: 'Emit Message',
	type: 'transitions',
	description: 'Emits a message (event) to a channel on the bus. Messages can be listened to by the Listen action, or by scripts using the SystemBus.addListener(channel, callback) function.',
	parameters: [{
		name: 'Channel',
		key: 'channel',
		type: 'string',
		description: 'Channel to transmit a message (event) on.',
		'default': ''
	}],
	transitions: []
};

EmitAction.prototype.enter = function () /*fsm*/{
	_SystemBus.SystemBusjs.emit(this.channel, this.data); // data is unused?
};

exports.EmitAction = EmitAction_EmitAction;