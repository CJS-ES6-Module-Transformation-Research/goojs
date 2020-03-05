import { Action as Action_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { FsmUtils as FsmUtils_FsmUtilsjs } from "../../../fsmpack/statemachine/FsmUtils";

function SetVariableAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

SetVariableAction.prototype = Object.create(Action_Actionjs.prototype);
SetVariableAction.prototype.constructor = SetVariableAction;

SetVariableAction.external = {
	key: 'Set Variable',
	name: 'Set Variable',
	type: 'variables',
	description: '',
	parameters: [{
		name: 'Variable name',
		key: 'variable',
		type: 'identifier'
	}, {
		name: 'Value',
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

SetVariableAction.prototype.enter = function (fsm) {
	if (this.variable) {
		fsm.applyOnVariable(this.variable, function () {
			return FsmUtils_FsmUtilsjs.getValue(this.amount, fsm);
		}.bind(this));
	}
};

var exported_SetVariableAction = SetVariableAction;
export { exported_SetVariableAction as SetVariableAction };