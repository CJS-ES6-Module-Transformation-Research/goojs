var AddPositionAction_AddPositionAction = AddPositionAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { getValue as FsmUtilsjs_getValue } from "../../../fsmpack/statemachine/FsmUtils";

function AddPositionAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

AddPositionAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
AddPositionAction.prototype.constructor = AddPositionAction;

AddPositionAction.external = {
	parameters: [{
		name: 'Entity',
		key: 'entity',
		type: 'entity',
		description: 'Entity to move.'
	}, {
		name: 'Amount X',
		key: 'amountX',
		type: 'float',
		description: 'Amount to move on the X axis.',
		'default': 0
	}, {
		name: 'Amount Y',
		key: 'amountY',
		type: 'float',
		description: 'Amount to move on the Y axis.',
		'default': 0
	}, {
		name: 'Amount Z',
		key: 'amountZ',
		type: 'float',
		description: 'Amount to move on the Z axis.',
		'default': 0
	}, {
		name: 'Speed',
		key: 'speed',
		type: 'float',
		description: 'Speed to multiply.',
		'default': 1
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

AddPositionAction.prototype.addPosition = function (fsm) {
	if (this.entity) {
		var tpf = fsm.getTpf();

		var dx = FsmUtilsjs_getValue(this.amountX, fsm);
		var dy = FsmUtilsjs_getValue(this.amountY, fsm);
		var dz = FsmUtilsjs_getValue(this.amountZ, fsm);

		this.entity.transformComponent.transform.translation.addDirect(
			dx * this.speed * tpf,
			dy * this.speed * tpf,
			dz * this.speed * tpf
		);

		this.entity.transformComponent.setUpdated();
	}
};

AddPositionAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.addPosition(fsm);
	}
};

AddPositionAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.addPosition(fsm);
	}
};

export { AddPositionAction_AddPositionAction as AddPositionAction };
