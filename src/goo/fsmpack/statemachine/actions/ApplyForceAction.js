var ApplyForceAction_ApplyForceAction = ApplyForceAction;
import { Action as Action_Actionjs } from "./Action";
import { Vector3 as mathVector3_Vector3js } from "../../../math/Vector3";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../../entities/SystemBus";

function ApplyForceAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

ApplyForceAction.prototype = Object.create(Action_Actionjs.prototype);
ApplyForceAction.prototype.constructor = ApplyForceAction;

ApplyForceAction.external = {
	key: 'ApplyForce',
	name: 'Apply force on rigid body',
	type: 'physics',
	description: 'Apply a force to the attached rigid body.',
	canTransition: false,
	parameters: [{
		name: 'Force',
		key: 'force',
		type: 'position',
		description: 'Force to apply to the body.',
		'default': [0, 0, 0]
	}, {
		name: 'Apply point',
		key: 'point',
		type: 'position',
		description: 'Where on the body to apply the force, relative to the center of mass.',
		'default': [0, 0, 0]
	}, {
		name: 'Space',
		key: 'space',
		type: 'string',
		control: 'dropdown',
		description: 'The space where the force and apply point are defined.',
		'default': 'World',
		options: ['World', 'Local']
	}],
	transitions: []
};

var forceVector = new mathVector3_Vector3js();
var applyPoint = new mathVector3_Vector3js();
ApplyForceAction.prototype.enter = function (fsm) {
	entitiesSystemBus_SystemBusjsjs.addListener('goo.physics.substep', this.substepListener = function () {
		var entity = fsm.getOwnerEntity();
		if (!entity || !entity.rigidBodyComponent) { return; }

		forceVector.setArray(this.force);
		applyPoint.setArray(this.point);
		if (this.space === 'World') {
			entity.rigidBodyComponent.applyForce(forceVector, applyPoint);
		} else {
			entity.rigidBodyComponent.applyForceLocal(forceVector, applyPoint);
		}
	}.bind(this));
};

ApplyForceAction.prototype.exit = function () {
	entitiesSystemBus_SystemBusjsjs.removeListener('goo.physics.substep', this.substepListener);
};

export { ApplyForceAction_ApplyForceAction as ApplyForceAction };