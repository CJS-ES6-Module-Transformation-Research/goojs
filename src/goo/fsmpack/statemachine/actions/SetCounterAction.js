Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetCounterAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

function SetCounterAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

SetCounterAction.prototype = Object.create(_Action.Action.prototype);
SetCounterAction.prototype.constructor = SetCounterAction;

SetCounterAction.external = {
	key: 'Set Counter',
	name: 'Set Counter',
	type: 'transitions',
	description: 'Sets a counter to a value.',
	parameters: [{
		name: 'Name',
		key: 'name',
		type: 'string',
		description: 'Counter name.'
	}, {
		name: 'Value',
		key: 'value',
		type: 'float',
		description: 'Value to set the counter to.',
		'default': 0
	}],
	transitions: []
};

SetCounterAction.prototype.enter = function (fsm) {
	fsm.getFsm().defineVariable(this.name, +this.value);
};

SetCounterAction.prototype.cleanup = function (fsm) {
	fsm.getFsm().removeVariable(this.name);
};

var exported_SetCounterAction = SetCounterAction;
exports.SetCounterAction = exported_SetCounterAction;
