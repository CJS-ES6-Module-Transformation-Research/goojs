import { Action as Action_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Vector3 as Vector3_Vector3js } from "../../../math/Vector3";

function TweenScaleAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);

	this.fromScale = new Vector3_Vector3js();
	this.toScale = new Vector3_Vector3js();
	this.completed = false;
}

TweenScaleAction.prototype = Object.create(Action_Actionjs.prototype);
TweenScaleAction.prototype.constructor = TweenScaleAction;

TweenScaleAction.external = {
	key: 'Tween Scale',
	name: 'Tween Scale',
	type: 'animation',
	description: 'Transition to the set scale.',
	canTransition: true,
	parameters: [{
		name: 'Scale',
		key: 'to',
		type: 'position',
		description: 'Scale.',
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
		description: 'State to transition to when the scaling completes.'
	}]
};

TweenScaleAction.getTransitionLabel = function (transitionKey/*, actionConfig*/){
	return transitionKey === 'complete' ? 'On Tween Scale Complete' : undefined;
};

TweenScaleAction.prototype.enter = function (fsm) {
	var transformComponent = fsm.getOwnerEntity().transformComponent;

	this.fromScale.set(transformComponent.transform.scale);
	this.toScale.setDirect(this.to[0], this.to[1], this.to[2]);
	if (this.relative) {
		this.toScale.add(this.fromScale);
	}

	this.startTime = fsm.getTime();
	this.completed = false;
};

TweenScaleAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}
	var transformComponent = fsm.getOwnerEntity().transformComponent;

	var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
	var fT = Easing[this.easing1][this.easing2](t);

	transformComponent.transform.scale.set(this.fromScale).lerp(this.toScale, fT);
	transformComponent.setUpdated();

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};

var exported_TweenScaleAction = TweenScaleAction;
export { exported_TweenScaleAction as TweenScaleAction };