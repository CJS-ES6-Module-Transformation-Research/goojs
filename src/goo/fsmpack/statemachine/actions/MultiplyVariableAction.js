Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MultiplyVariableAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

var _FsmUtils2 = _interopRequireDefault(_FsmUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function MultiplyVariableAction() {
	_Action2.default.apply(this, arguments);
}

MultiplyVariableAction.prototype = Object.create(_Action2.default.prototype);
MultiplyVariableAction.prototype.constructor = MultiplyVariableAction;

MultiplyVariableAction.external = {
	key: 'Multiply Variable',
	name: 'Multiply Variable',
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
		description: 'Repeat this action every frame',
		'default': false
	}],
	transitions: []
};

MultiplyVariableAction.prototype.update = function (fsm) {
	fsm.applyOnVariable(this.variable, function (v) {
		return v * _FsmUtils2.default.getValue(this.amount, fsm);
	}.bind(this));
};
module.exports = exports.default;
