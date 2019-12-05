import { Action } from "../../../fsmpack/statemachine/actions/Action";
var exported_SetCounterAction = SetCounterAction;

function SetCounterAction/*id, settings*/() {
	Action.apply(this, arguments);
}

SetCounterAction.prototype = Object.create(Action.prototype);
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

export { exported_SetCounterAction as SetCounterAction };