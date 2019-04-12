Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogMessageAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function LogMessageAction() {
	_Action2.default.apply(this, arguments);
}

LogMessageAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
