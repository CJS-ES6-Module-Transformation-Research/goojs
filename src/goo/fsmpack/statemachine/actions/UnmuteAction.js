'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UnmuteAction = undefined;

var _Action = require('./Action');

var mod_UnmuteAction = UnmuteAction;

function UnmuteAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);
}
UnmuteAction.prototype = Object.create(_Action.Action.prototype);
UnmuteAction.prototype.constructor = UnmuteAction;

UnmuteAction.external = {
	key: 'Unmute sounds',
	name: 'Unmute sounds',
	type: 'sound',
	description: 'Unmute all sounds globally.',
	canTransition: false,
	parameters: [],
	transitions: []
};

UnmuteAction.prototype.enter = function (fsm) {
	var world = fsm.getWorld();
	if (!world) {
		return;
	}

	var soundSystem = world.getSystem('SoundSystem');
	if (soundSystem) {
		soundSystem.unmute();
	}
};

exports.UnmuteAction = mod_UnmuteAction;