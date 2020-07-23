var DollyZoomAction_DollyZoomAction = DollyZoomAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Vector3 as mathVector3_Vector3js } from "../../../math/Vector3";
import { MathUtils as mathMathUtils_MathUtilsjs } from "../../../math/MathUtils";
import { Easing as utilEasing_Easingjs } from "../../../util/Easing";

function DollyZoomAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);

	this.from = new mathVector3_Vector3js();
	this.to = new mathVector3_Vector3js();
	this.completed = false;
}

DollyZoomAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
DollyZoomAction.prototype.constructor = DollyZoomAction;

DollyZoomAction.external = {
	key: 'Dolly Zoom',
	name: 'Dolly Zoom',
	type: 'camera',
	description: 'Performs dolly zoom.',
	parameters: [{
		name: 'Forward',
		key: 'forward',
		type: 'float',
		description: 'Number of units to move towards the focus point. Enter negative values to move away.',
		'default': 100
	}, {
		name: 'Focus point',
		key: 'lookAt',
		type: 'position',
		description: 'Point to focus on while transitioning.',
		'default': [0, 0, 0]
	}, {
		name: 'Time (ms)',
		key: 'time',
		type: 'float',
		description: 'Time.',
		'default': 10000
	}, {
		name: 'Easing type',
		key: 'easing1',
		type: 'string',
		control: 'dropdown',
		description: 'Easing.',
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
		description: 'State to transition to when the transition completes.'
	}]
};

DollyZoomAction.getTransitionLabel = function (/*transitionKey, actionConfig*/){
	return 'On Dolly Zoom Complete';
};

DollyZoomAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	this.completed = false;

	if (entity.cameraComponent && entity.cameraComponent.camera) {
		var transformComponent = entity.transformComponent;
		var translation = transformComponent.transform.translation;
		var camera = entity.cameraComponent.camera;

		this.fromDistance = new mathVector3_Vector3js(this.lookAt).distance(camera.translation);
		this.toDistance = this.fromDistance - this.forward;

		this.eyeTargetScale = Math.tan(camera.fov * (Math.PI / 180) / 2) * this.fromDistance;

		var initialTranslation = new mathVector3_Vector3js().copy(translation);
		var toVec = mathVector3_Vector3js.fromArray(this.lookAt)
			.sub(initialTranslation)
			.normalize()
			.scale(this.forward)
			.add(initialTranslation);

		this.from.set(initialTranslation.x, initialTranslation.y, initialTranslation.z);
		this.to.setDirect(toVec.x, toVec.y, toVec.z);

		this.startTime = fsm.getTime();
	} else {
		this.eyeTargetScale = null;
	}
};

DollyZoomAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}

	if (this.eyeTargetScale) {
		var entity = fsm.getOwnerEntity();
		var transformComponent = entity.transformComponent;
		var camera = entity.cameraComponent.camera;

		var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
		var fT = utilEasing_Easingjs[this.easing1][this.easing2](t);

		transformComponent.transform.translation.set(this.from).lerp(this.to, fT);
		transformComponent.setUpdated();

		var d = mathMathUtils_MathUtilsjs.lerp(fT, this.fromDistance, this.toDistance);
		var fov = (180 / Math.PI) * 2 * Math.atan(this.eyeTargetScale / d);
		camera.setFrustumPerspective(fov);

		if (t >= 1) {
			fsm.send(this.transitions.complete);
			this.completed = true;
		}
	}
};

export { DollyZoomAction_DollyZoomAction as DollyZoomAction };