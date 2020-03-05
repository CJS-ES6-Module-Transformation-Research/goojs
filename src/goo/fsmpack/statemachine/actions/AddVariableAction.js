"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddVariableAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

function AddVariableAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

AddVariableAction.prototype = Object.create(_Action.Action.prototype);
AddVariableAction.prototype.constructor = AddVariableAction;

AddVariableAction.external = {
	key: 'Add Variable',
	name: 'Add Variable',
	type: 'variables',
	description: '',
	parameters: [{
		name: 'Variable',
		key: 'variable',
		type: 'identifier'
	}, {
		name: 'Amount',
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

AddVariableAction.prototype.add = function (fsm) {
	fsm.applyOnVariable(this.variable, function (v) {
		return v + _FsmUtils.FsmUtils.getValue(this.amount, fsm);
	}.bind(this));
};

AddVariableAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.add(fsm);
	}
};

AddVariableAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.add(fsm);
	}
};

var exported_AddVariableAction = AddVariableAction;
exports.AddVariableAction = exported_AddVariableAction;
