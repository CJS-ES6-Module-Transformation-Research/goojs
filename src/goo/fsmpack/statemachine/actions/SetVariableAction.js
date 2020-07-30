"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetVariableAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

var SetVariableAction_SetVariableAction = SetVariableAction;

function SetVariableAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

SetVariableAction.prototype = Object.create(_Action.Action.prototype);
SetVariableAction.prototype.constructor = SetVariableAction;

SetVariableAction.external = {
	key: 'Set Variable',
	name: 'Set Variable',
	type: 'variables',
	description: '',
	parameters: [{
		name: 'Variable name',
		key: 'variable',
		type: 'identifier'
	}, {
		name: 'Value',
		key: 'amount',
		type: 'float'
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': false
	}],
	transitions: []
};

SetVariableAction.prototype.enter = function (fsm) {
	if (this.variable) {
		fsm.applyOnVariable(this.variable, function () {
			return _FsmUtils.FsmUtils.getValue(this.amount, fsm);
		}.bind(this));
	}
};

exports.SetVariableAction = SetVariableAction_SetVariableAction;