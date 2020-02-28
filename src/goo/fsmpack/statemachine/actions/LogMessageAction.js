Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogMessageAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

function LogMessageAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

LogMessageAction.prototype = Object.create(_Action.Action.prototype);
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

LogMessageAction.prototype.enter = function () /*fsm*/{
	if (!this.everyFrame) {
		console.log(this.message);
	}
};

LogMessageAction.prototype.update = function () /*fsm*/{
	if (this.everyFrame) {
		console.log(this.message);
	}
};

var exported_LogMessageAction = LogMessageAction;
exports.LogMessageAction = exported_LogMessageAction;
