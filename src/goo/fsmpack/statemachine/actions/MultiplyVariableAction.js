import { Action as Action_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { FsmUtils as FsmUtils_FsmUtilsjs } from "../../../fsmpack/statemachine/FsmUtils";

function MultiplyVariableAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

MultiplyVariableAction.prototype = Object.create(Action_Actionjs.prototype);
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
		return v * FsmUtils_FsmUtilsjs.getValue(this.amount, fsm);
	}.bind(this));
};

var exported_MultiplyVariableAction = MultiplyVariableAction;
export { exported_MultiplyVariableAction as MultiplyVariableAction };