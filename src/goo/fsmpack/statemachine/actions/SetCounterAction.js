Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetCounterAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetCounterAction() {
	_Action2.default.apply(this, arguments);
}

SetCounterAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
