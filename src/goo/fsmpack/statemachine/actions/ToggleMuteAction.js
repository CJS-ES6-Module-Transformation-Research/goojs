'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ToggleMuteAction = undefined;

var _Action = require('./Action');

var mod_ToggleMuteAction = ToggleMuteAction;

function ToggleMuteAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);
}
ToggleMuteAction.prototype = Object.create(_Action.Action.prototype);
ToggleMuteAction.prototype.constructor = ToggleMuteAction;

ToggleMuteAction.external = {
	key: 'Toggle mute sounds',
	name: 'Toggle mute sounds',
	type: 'sound',
	description: 'Toggles mute of all sounds globally.',
	canTransition: false,
	parameters: [],
	transitions: []
};

ToggleMuteAction.prototype.enter = function (fsm) {
	var world = fsm.getWorld();
	if (!world) {
		return;
	}

	var soundSystem = world.getSystem('SoundSystem');
	if (soundSystem) {
		if (soundSystem.muted) {
			soundSystem.unmute();
		} else {
			soundSystem.mute();
		}
	}
};

exports.ToggleMuteAction = mod_ToggleMuteAction;