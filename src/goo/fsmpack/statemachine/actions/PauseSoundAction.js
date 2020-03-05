import { Action as Actionjs } from "./Action";

function PauseSoundAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

PauseSoundAction.prototype = Object.create(Actionjs.prototype);
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

var exported_PauseSoundAction = PauseSoundAction;
export { exported_PauseSoundAction as PauseSoundAction };