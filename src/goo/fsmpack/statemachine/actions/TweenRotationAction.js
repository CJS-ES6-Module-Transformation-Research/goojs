import { Action as Action_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Quaternion as Quaternionjs } from "../../../math/Quaternion";
import { Matrix3 as Matrix3js } from "../../../math/Matrix3";
import { DEG_TO_RAD as MathUtilsjs_DEG_TO_RAD } from "../../../math/MathUtils";

function TweenRotationAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);

	this.quatFrom = new Quaternionjs();
	this.quatTo = new Quaternionjs();
	this.quatFinal = new Quaternionjs();
	this.completed = false;
}

TweenRotationAction.prototype = Object.create(Action_Actionjs.prototype);
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
	this.quatTo.fromRotationMatrix(new Matrix3js().fromAngles(this.to[0] * MathUtilsjs_DEG_TO_RAD, this.to[1] * MathUtilsjs_DEG_TO_RAD, this.to[2] * MathUtilsjs_DEG_TO_RAD));
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
	var fT = Easing[this.easing1][this.easing2](t);
	Quaternionjs_slerp(this.quatFrom, this.quatTo, fT, this.quatFinal);

	this.quatFinal.toRotationMatrix(transform.rotation);
	entity.transformComponent.setUpdated();

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};

var exported_TweenRotationAction = TweenRotationAction;
export { exported_TweenRotationAction as TweenRotationAction };