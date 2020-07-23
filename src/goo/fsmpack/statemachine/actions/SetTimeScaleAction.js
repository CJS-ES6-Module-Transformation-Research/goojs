'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetTimeScaleAction = undefined;

var _Action = require('./Action');

var SetTimeScaleAction_SetTimeScaleAction = SetTimeScaleAction;

function SetTimeScaleAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
	this.everyFrame = false;
}

SetTimeScaleAction.prototype = Object.create(_Action.Action.prototype);
SetTimeScaleAction.prototype.constructor = SetTimeScaleAction;

SetTimeScaleAction.external = {
	key: 'Set Animation Time Scale',
	name: 'Set Animation Time Scale',
	type: 'animation',
	description: 'Sets the time scale for the current animation.',
	parameters: [{
		name: 'Scale',
		key: 'scale',
		type: 'float',
		description: 'Scale factor for the animation timer.',
		'default': 1
	}],
	transitions: []
};

SetTimeScaleAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.animationComponent) {
		entity.animationComponent.setTimeScale(this.scale);
	}
};

exports.SetTimeScaleAction = SetTimeScaleAction_SetTimeScaleAction;