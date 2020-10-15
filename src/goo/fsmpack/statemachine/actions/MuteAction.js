'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MuteAction = undefined;

var _Action = require('./Action');

var MuteAction_MuteAction = MuteAction;

function MuteAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}
MuteAction.prototype = Object.create(_Action.Action.prototype);
MuteAction.prototype.constructor = MuteAction;

MuteAction.external = {
	key: 'Mute sounds',
	name: 'Mute sounds',
	type: 'sound',
	description: 'Mute all sounds globally.',
	canTransition: false,
	parameters: [],
	transitions: []
};

MuteAction.prototype.enter = function (fsm) {
	var world = fsm.getWorld();
	if (!world) {
		return;
	}

	var soundSystem = world.getSystem('SoundSystem');
	if (soundSystem) {
		soundSystem.mute();
	}
};

exports.MuteAction = MuteAction_MuteAction;