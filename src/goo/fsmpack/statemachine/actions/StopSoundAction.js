'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StopSoundAction = undefined;

var _Action = require('./Action');

var StopSoundAction_StopSoundAction = StopSoundAction;

function StopSoundAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

StopSoundAction.prototype = Object.create(_Action.Action.prototype);
StopSoundAction.prototype.constructor = StopSoundAction;

StopSoundAction.external = {
	key: 'Stop Sound',
	name: 'Stop Sound',
	type: 'sound',
	description: 'Stops a sound.',
	canTransition: false,
	parameters: [{
		name: 'Sound',
		key: 'sound',
		type: 'sound',
		description: 'Sound to stop.'
	}],
	transitions: []
};

StopSoundAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.hasComponent('SoundComponent')) {
		var sound = entity.soundComponent.getSoundById(this.sound);
		if (sound) {
			sound.stop();
		}
	}
};

exports.StopSoundAction = StopSoundAction_StopSoundAction;