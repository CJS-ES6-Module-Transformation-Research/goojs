"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TweenRotationAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Quaternion = require("../../../math/Quaternion");

var _Matrix = require("../../../math/Matrix3");

var _MathUtils = require("../../../math/MathUtils");

var _Easing = require("../../../util/Easing");

function TweenRotationAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);

	this.quatFrom = new _Quaternion.Quaternion();
	this.quatTo = new _Quaternion.Quaternion();
	this.quatFinal = new _Quaternion.Quaternion();
	this.completed = false;
}

TweenRotationAction.prototype = Object.create(_Action.Action.prototype);
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

TweenRotationAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return transitionKey === 'complete' ? 'On Tween Rotation Complete' : undefined;
};

TweenRotationAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transformComponent = entity.transformComponent.sync();

	this.startTime = fsm.getTime();

	this.quatFrom.fromRotationMatrix(transformComponent.transform.rotation);
	this.quatTo.fromRotationMatrix(new _Matrix.Matrix3().fromAngles(this.to[0] * _MathUtils.MathUtils.DEG_TO_RAD, this.to[1] * _MathUtils.MathUtils.DEG_TO_RAD, this.to[2] * _MathUtils.MathUtils.DEG_TO_RAD));
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
	var fT = _Easing.Easing[this.easing1][this.easing2](t);
	_Quaternion.Quaternion.slerp(this.quatFrom, this.quatTo, fT, this.quatFinal);

	this.quatFinal.toRotationMatrix(transform.rotation);
	entity.transformComponent.setUpdated();

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};

var exported_TweenRotationAction = TweenRotationAction;
exports.TweenRotationAction = exported_TweenRotationAction;
