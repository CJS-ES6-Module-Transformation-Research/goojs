var MultiplyVariableAction_MultiplyVariableAction = MultiplyVariableAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { FsmUtils as fsmpackstatemachineFsmUtils_FsmUtilsjs } from "../../../fsmpack/statemachine/FsmUtils";

function MultiplyVariableAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

MultiplyVariableAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
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
		return v * fsmpackstatemachineFsmUtils_FsmUtilsjs.getValue(this.amount, fsm);
	}.bind(this));
};

export { MultiplyVariableAction_MultiplyVariableAction as MultiplyVariableAction };