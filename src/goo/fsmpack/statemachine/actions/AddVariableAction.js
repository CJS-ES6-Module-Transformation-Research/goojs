import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { FsmUtils as fsmpackstatemachineFsmUtils_FsmUtilsjs } from "../../../fsmpack/statemachine/FsmUtils";

function AddVariableAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

AddVariableAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
AddVariableAction.prototype.constructor = AddVariableAction;

AddVariableAction.external = {
	key: 'Add Variable',
	name: 'Add Variable',
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
		description: 'Repeat this action every frame.',
		'default': false
	}],
	transitions: []
};

AddVariableAction.prototype.add = function (fsm) {
	fsm.applyOnVariable(this.variable, function (v) {
		return v + fsmpackstatemachineFsmUtils_FsmUtilsjs.getValue(this.amount, fsm);
	}.bind(this));
};

AddVariableAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.add(fsm);
	}
};

AddVariableAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.add(fsm);
	}
};

var exported_AddVariableAction = AddVariableAction;
export { exported_AddVariableAction as AddVariableAction };
