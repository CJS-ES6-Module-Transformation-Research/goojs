var mod_LogMessageAction = LogMessageAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";

function LogMessageAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

LogMessageAction.prototype = Object.create(Action_Action.prototype);
LogMessageAction.prototype.constructor = LogMessageAction;

LogMessageAction.external = {
	key: 'Log Message',
	name: 'Log Message',
	description: 'Prints a message in the debug console of your browser.',
	parameters: [{
		name: 'Message',
		key: 'message',
		type: 'string',
		description: 'Message to print.',
		'default': 'hello'
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': false
	}],
	transitions: []
};

LogMessageAction.prototype.enter = function (/*fsm*/) {
	if (!this.everyFrame) {
		console.log(this.message);
	}
};

LogMessageAction.prototype.update = function (/*fsm*/) {
	if (this.everyFrame) {
		console.log(this.message);
	}
};

export { mod_LogMessageAction as LogMessageAction };