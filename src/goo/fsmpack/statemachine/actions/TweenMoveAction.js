"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TweenMoveAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Vector = require("../../../math/Vector3");

var TweenMoveAction_TweenMoveAction = TweenMoveAction;

function TweenMoveAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);

	this.fromPos = new _Vector.Vector3();
	this.toPos = new _Vector.Vector3();
	this.deltaPos = new _Vector.Vector3();
	this.oldPos = new _Vector.Vector3();
	this.completed = false;
}

TweenMoveAction.prototype = Object.create(_Action.Action.prototype);
TweenMoveAction.prototype.constructor = TweenMoveAction;

TweenMoveAction.external = {
	key: 'Tween Move',
	name: 'Tween Move',
	type: 'animation',
	description: 'Transition to the set location.',
	canTransition: true,
	parameters: [{
		name: 'Translation',
		key: 'to',
		type: 'position',
		description: 'Move.',
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
		description: 'State to transition to when the movement completes.'
	}]
};

TweenMoveAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return transitionKey === 'complete' ? 'On Tween Move Complete' : undefined;
};

TweenMoveAction.prototype.enter = function (fsm) {
	var transformComponent = fsm.getOwnerEntity().transformComponent.sync();

	this.fromPos.set(transformComponent.transform.translation);
	this.toPos.setDirect(this.to[0], this.to[1], this.to[2]);
	if (this.relative) {
		this.oldPos.set(this.fromPos);
		this.toPos.add(this.fromPos);
	}

	this.startTime = fsm.getTime();
	this.completed = false;
};

TweenMoveAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}
	var transformComponent = fsm.getOwnerEntity().transformComponent.sync();

	var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
	var fT = Easing[this.easing1][this.easing2](t);

	if (this.relative) {
		this.deltaPos.set(this.fromPos).lerp(this.toPos, fT).sub(this.oldPos);
		transformComponent.transform.translation.add(this.deltaPos);
		this.oldPos.add(this.deltaPos);
	} else {
		transformComponent.transform.translation.set(this.fromPos).lerp(this.toPos, fT);
	}

	transformComponent.setUpdated();

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};

exports.TweenMoveAction = TweenMoveAction_TweenMoveAction;