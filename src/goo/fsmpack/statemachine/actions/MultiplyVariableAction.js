var mod_MultiplyVariableAction = MultiplyVariableAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { FsmUtils as FsmUtils_FsmUtils } from "../../../fsmpack/statemachine/FsmUtils";

function MultiplyVariableAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

MultiplyVariableAction.prototype = Object.create(Action_Action.prototype);
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
		return v * FsmUtils_FsmUtils.getValue(this.amount, fsm);
	}.bind(this));
};

export { mod_MultiplyVariableAction as MultiplyVariableAction };