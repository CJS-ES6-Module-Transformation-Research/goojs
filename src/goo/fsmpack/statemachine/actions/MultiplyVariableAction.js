import Action from "../../../fsmpack/statemachine/actions/Action";
import FsmUtils from "../../../fsmpack/statemachine/FsmUtils";

export default function MultiplyVariableAction/*id, settings*/() {
	Action.apply(this, arguments);
}

MultiplyVariableAction.prototype = Object.create(Action.prototype);
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
		return v * FsmUtils.getValue(this.amount, fsm);
	}.bind(this));
};