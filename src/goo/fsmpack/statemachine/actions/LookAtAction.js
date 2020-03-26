import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Vector3 as mathVector3_Vector3js } from "../../../math/Vector3";

function LookAtAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

LookAtAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
LookAtAction.prototype.constructor = LookAtAction;

LookAtAction.external = {
	key: 'Look At',
	name: 'Look At',
	type: 'animation',
	description: 'Reorients an entity so that it\'s facing a specific point.',
	parameters: [{
		name: 'Look at',
		key: 'lookAt',
		type: 'position',
		description: 'Position to look at.',
		'default': [0, 0, 0]
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

LookAtAction.prototype.doLookAt = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transformComponent = entity.transformComponent;

	transformComponent.transform.lookAt(new mathVector3_Vector3js(this.lookAt), mathVector3_Vector3js.UNIT_Y);
	transformComponent.setUpdated();
};

LookAtAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.doLookAt(fsm);
	}
};

LookAtAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.doLookAt(fsm);
	}
};

var exported_LookAtAction = LookAtAction;
export { exported_LookAtAction as LookAtAction };