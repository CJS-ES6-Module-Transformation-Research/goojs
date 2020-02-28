import { Action as Action_Actionjs } from "./Action";
import { getValue as FsmUtilsjs_getValue } from "../FsmUtils";

function CopyVariableAction(/*id, settings*/) {
	Action_Actionjs.apply(this, arguments);
}

CopyVariableAction.prototype = Object.create(Action_Actionjs.prototype);
CopyVariableAction.prototype.constructor = CopyVariableAction;

CopyVariableAction.external = {
	key: 'Copy Variable',
	name: 'Copy Variable',
	type: 'variables',
	description: '',
	parameters: [{
		name: 'Variable Target',
		key: 'variableTarget',
		type: 'identifier'
	}, {
		name: 'Variable Source',
		key: 'variableSource',
		type: 'identifier'
	}, {
		name: 'Value',
		key: 'value',
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

CopyVariableAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.copy(fsm);
	}
};

CopyVariableAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.copy(fsm);
	}
};

CopyVariableAction.prototype.copy = function (fsm) {
	var ownerEntity = fsm.getOwnerEntity();
	if (this.variableTarget && ownerEntity) {
		try {
			var val;
			if (this.variableSource) {
				val = FsmUtilsjs_getValue(this.variableSource, fsm);
			} else {
				val = FsmUtilsjs_getValue(this.value, fsm);
			}
			ownerEntity[this.variableTarget] = val;
		} catch (err) {
			console.warn(err);
		}
	}
};

module.exports = CopyVariableAction;