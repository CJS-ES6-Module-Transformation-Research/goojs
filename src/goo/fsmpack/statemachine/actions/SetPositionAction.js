import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { FsmUtils as fsmpackstatemachineFsmUtils_FsmUtilsjs } from "../../../fsmpack/statemachine/FsmUtils";

function SetPositionAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

SetPositionAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
SetPositionAction.prototype.constructor = SetPositionAction;

SetPositionAction.prototype.configure = function (settings) {
	this.everyFrame = !!settings.everyFrame;
	this.entity = settings.entity || null;
	this.amountX = settings.amountX || 0;
	this.amountY = settings.amountY || 0;
	this.amountZ = settings.amountZ || 0;
};

SetPositionAction.external = {
	key: 'Set Position',
	name: 'Set Position',
	parameters: [{
		name: 'Entity',
		key: 'entity',
		type: 'entity',
		description: 'Entity to move.'
	}, {
		name: 'Amount X',
		key: 'amountX',
		type: 'float',
		description: 'Position on the X axis.',
		'default': 0
	}, {
		name: 'Amount Y',
		key: 'amountY',
		type: 'float',
		description: 'Position on the Y axis.',
		'default': 0
	}, {
		name: 'Amount Z',
		key: 'amountZ',
		type: 'float',
		description: 'Position on the Z axis.',
		'default': 0
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

SetPositionAction.prototype.update = function (fsm) {
	if (this.entity !== null) {
		this.entity.transformComponent.transform.translation.setDirect(
			fsmpackstatemachineFsmUtils_FsmUtilsjs.getValue(this.amountX, fsm),
			fsmpackstatemachineFsmUtils_FsmUtilsjs.getValue(this.amountY, fsm),
			fsmpackstatemachineFsmUtils_FsmUtilsjs.getValue(this.amountZ, fsm)
		);
		this.entity.transformComponent.setUpdated();
	}
};

var exported_SetPositionAction = SetPositionAction;
export { exported_SetPositionAction as SetPositionAction };