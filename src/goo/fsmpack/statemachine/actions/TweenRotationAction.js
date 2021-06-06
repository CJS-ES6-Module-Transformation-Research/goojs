var mod_TweenRotationAction = TweenRotationAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { Quaternion as Quaternion_Quaternion } from "../../../math/Quaternion";
import { Matrix3 as Matrix3_Matrix3 } from "../../../math/Matrix3";
import { MathUtils as MathUtils_MathUtils } from "../../../math/MathUtils";
import { Easing as Easing_Easing } from "../../../util/Easing";

function TweenRotationAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);

	this.quatFrom = new Quaternion_Quaternion();
	this.quatTo = new Quaternion_Quaternion();
	this.quatFinal = new Quaternion_Quaternion();
	this.completed = false;
}

TweenRotationAction.prototype = Object.create(Action_Action.prototype);
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
	this.quatTo.fromRotationMatrix(new Matrix3_Matrix3().fromAngles(this.to[0] * MathUtils_MathUtils.DEG_TO_RAD, this.to[1] * MathUtils_MathUtils.DEG_TO_RAD, this.to[2] * MathUtils_MathUtils.DEG_TO_RAD));
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
	var fT = Easing_Easing[this.easing1][this.easing2](t);
	Quaternion_Quaternion.slerp(this.quatFrom, this.quatTo, fT, this.quatFinal);

	this.quatFinal.toRotationMatrix(transform.rotation);
	entity.transformComponent.setUpdated();

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};

export { mod_TweenRotationAction as TweenRotationAction };