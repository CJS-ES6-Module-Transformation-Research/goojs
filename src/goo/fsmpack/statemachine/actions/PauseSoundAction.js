Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PauseSoundAction = undefined;

var _Action = require('./Action');

var exported_PauseSoundAction = PauseSoundAction;

function PauseSoundAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

PauseSoundAction.prototype = Object.create(_Action.Action.prototype);
PauseSoundAction.prototype.constructor = PauseSoundAction;

PauseSoundAction.external = {
	key: 'Pause Sound',
	name: 'Pause Sound',
	type: 'sound',
	description: 'Pauses a sound.',
	canTransition: false,
	parameters: [{
		name: 'Sound',
		key: 'sound',
		type: 'sound',
		description: 'Sound to pause.'
	}],
	transitions: []
};

PauseSoundAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.hasComponent('SoundComponent')) {
		var sound = entity.soundComponent.getSoundById(this.sound);
		if (sound) {
			sound.pause();
		}
	}
};

exports.PauseSoundAction = exported_PauseSoundAction;
