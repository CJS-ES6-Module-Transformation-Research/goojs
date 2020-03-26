import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Vector3 as mathVector3_Vector3js } from "../../../math/Vector3";
import { MathUtils as mathMathUtils_MathUtilsjs } from "../../../math/MathUtils";
import { Easing as utilEasing_Easingjs } from "../../../util/Easing";

function ShakeAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);

	this.oldVal = new mathVector3_Vector3js();
	this.target = new mathVector3_Vector3js();
	this.vel = new mathVector3_Vector3js();
	this.completed = false;
}

ShakeAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
ShakeAction.prototype.constructor = ShakeAction;

ShakeAction.external = {
	key: 'Shake',
	name: 'Shake',
	type: 'animation',
	description: 'Shakes the entity. Optionally performs a transition.',
	canTransition: true,
	parameters: [{
		name: 'Start level',
		key: 'startLevel',
		type: 'float',
		description: 'Shake amount at start.',
		'default': 0
	}, {
		name: 'End level',
		key: 'endLevel',
		type: 'float',
		description: 'Shake amount at the end.',
		'default': 10
	}, {
		name: 'Time (ms)',
		key: 'time',
		type: 'float',
		description: 'Shake time amount.',
		'default': 1000
	}, {
		name: 'Speed',
		key: 'speed',
		type: 'string',
		control: 'dropdown',
		description: 'Speed of shaking.',
		'default': 'Fast',
		options: ['Fast', 'Medium', 'Slow']
	}],
	transitions: [{
		key: 'complete',
		description: 'State to transition to when the shake completes.'
	}]
};

var labels = {
	complete: 'On Shake Complete'
};

ShakeAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return labels[transitionKey];
};

ShakeAction.prototype.configure = function (settings) {
	this.startLevel = settings.startLevel;
	this.endLevel = settings.endLevel;
	this.time = settings.time;
	this.speed = { Fast: 1, Medium: 2, Slow: 4 }[settings.speed];
	this.easing = utilEasing_Easingjs.Quadratic.InOut;
	this.eventToEmit = settings.transitions.complete;
};

ShakeAction.prototype.enter = function (fsm) {
	this.oldVal.set(mathVector3_Vector3js.ZERO);
	this.target.set(mathVector3_Vector3js.ZERO);
	this.vel.set(mathVector3_Vector3js.ZERO);
	this.iter = 0;
	this.startTime = fsm.getTime();
	this.completed = false;
};

ShakeAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}
	var entity = fsm.getOwnerEntity();
	var transformComponent = entity.transformComponent;
	var translation = transformComponent.transform.translation;

	var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
	var fT = this.easing(t);

	var level = mathMathUtils_MathUtilsjs.lerp(fT, this.startLevel, this.endLevel);

	this.iter++;
	if (this.iter > this.speed) {
		this.iter = 0;

		this.target.setDirect(
			-this.oldVal.x + (Math.random() - 0.5) * level * 2,
			-this.oldVal.y + (Math.random() - 0.5) * level * 2,
			-this.oldVal.z + (Math.random() - 0.5) * level * 2
		);
	}

	this.vel.setDirect(
		this.vel.x * 0.98 + (this.target.x) * 0.1,
		this.vel.y * 0.98 + (this.target.y) * 0.1,
		this.vel.z * 0.98 + (this.target.z) * 0.1
	);

	translation.add(this.vel).sub(this.oldVal);
	this.oldVal.copy(this.vel);
	transformComponent.setUpdated();

	if (t >= 1) {
		translation.sub(this.oldVal);
		transformComponent.setUpdated();
		this.completed = true;
		fsm.send(this.eventToEmit);
	}
};

var exported_ShakeAction = ShakeAction;
export { exported_ShakeAction as ShakeAction };