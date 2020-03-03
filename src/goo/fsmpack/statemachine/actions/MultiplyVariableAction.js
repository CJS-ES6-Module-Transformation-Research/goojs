Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MultiplyVariableAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

function MultiplyVariableAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

MultiplyVariableAction.prototype = Object.create(_Action.Action.prototype);
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
		return v * (0, _FsmUtils.getValue)(this.amount, fsm);
	}.bind(this));
};

var exported_MultiplyVariableAction = MultiplyVariableAction;
exports.MultiplyVariableAction = exported_MultiplyVariableAction;
