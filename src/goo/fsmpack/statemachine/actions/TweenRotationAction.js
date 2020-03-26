import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Quaternion as mathQuaternion_Quaternionjs } from "../../../math/Quaternion";
import { Matrix3 as mathMatrix3_Matrix3js } from "../../../math/Matrix3";
import { MathUtils as mathMathUtils_MathUtilsjs } from "../../../math/MathUtils";
import { Easing as utilEasing_Easingjs } from "../../../util/Easing";

function TweenRotationAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);

	this.quatFrom = new mathQuaternion_Quaternionjs();
	this.quatTo = new mathQuaternion_Quaternionjs();
	this.quatFinal = new mathQuaternion_Quaternionjs();
	this.completed = false;
}

TweenRotationAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
TweenRotationAction.prototype.constructor = TweenRotationAction;

TweenRotationAction.external = {
	key: 'Tween Rotation',
	name: 'Tween Rotate',
	type: 'animation',
	description: 'Transition to the set rotation, in angles.',
	canTransition: true,
	parameters: [{
		name: 'Rotation',
		key: 'to',
		type: 'rotation',
		description: 'Rotation.',
		'default': [0, 0, 0]
	}, {
		name: 'Relative',
		key: 'relative',
		type: 'boolean',
		description: 'If true add, otherwise set.',
		'default': true
	}, {
		name: 'Time (ms)',
		key: 'time',
		type: 'float',
		description: 'Time it takes for this movement to complete.',
		'default': 1000
	}, {
		name: 'Easing type',
		key: 'easing1',
		type: 'string',
		control: 'dropdown',
		description: 'Easing type.',
		'default': 'Linear',
		options: ['Linear', 'Quadratic', 'Exponential', 'Circular', 'Elastic', 'Back', 'Bounce']
	}, {
		name: 'Direction',
		key: 'easing2',
		type: 'string',
		control: 'dropdown',
		description: 'Easing direction.',
		'default': 'In',
		options: ['In', 'Out', 'InOut']
	}],
	transitions: [{
		key: 'complete',
		description: 'State to transition to when the rotation completes.'
	}]
};

TweenRotationAction.getTransitionLabel = function (transitionKey/*, actionConfig*/){
	return transitionKey === 'complete' ? 'On Tween Rotation Complete' : undefined;
};

TweenRotationAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transformComponent = entity.transformComponent.sync();

	this.startTime = fsm.getTime();

	this.quatFrom.fromRotationMatrix(transformComponent.transform.rotation);
	this.quatTo.fromRotationMatrix(new mathMatrix3_Matrix3js().fromAngles(this.to[0] * mathMathUtils_MathUtilsjs.DEG_TO_RAD, this.to[1] * mathMathUtils_MathUtilsjs.DEG_TO_RAD, this.to[2] * mathMathUtils_MathUtilsjs.DEG_TO_RAD));
	if (this.relative) {
		this.quatTo.mul(this.quatFrom);
	}
	this.completed = false;
};

TweenRotationAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}
	var entity = fsm.getOwnerEntity();
	var transform = entity.transformComponent.sync().transform;

	var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
	var fT = utilEasing_Easingjs[this.easing1][this.easing2](t);
	mathQuaternion_Quaternionjs.slerp(this.quatFrom, this.quatTo, fT, this.quatFinal);

	this.quatFinal.toRotationMatrix(transform.rotation);
	entity.transformComponent.setUpdated();

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};

var exported_TweenRotationAction = TweenRotationAction;
export { exported_TweenRotationAction as TweenRotationAction };