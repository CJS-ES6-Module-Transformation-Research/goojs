'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetAnimationOffsetAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var mod_SetAnimationOffsetAction = SetAnimationOffsetAction;

function SetAnimationOffsetAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);
}

SetAnimationOffsetAction.prototype = Object.create(_Action.Action.prototype);
SetAnimationOffsetAction.prototype.constructor = SetAnimationOffsetAction;

SetAnimationOffsetAction.external = {
	key: 'Set Animation Offset',
	name: 'Set Animation Offset',
	type: 'animation',
	description: 'Sets animation clip offset.',
	parameters: [{
		name: 'Offset (sec)',
		key: 'offset',
		type: 'float',
		description: 'Animation offset',
		'default': 0
	}],
	transitions: []
};

SetAnimationOffsetAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.animationComponent) {
		entity.animationComponent.shiftClipTime(this.offset);
	}
};

exports.SetAnimationOffsetAction = mod_SetAnimationOffsetAction;