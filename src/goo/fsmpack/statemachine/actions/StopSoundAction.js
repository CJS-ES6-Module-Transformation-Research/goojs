var StopSoundAction_StopSoundAction = StopSoundAction;
import { Action as Action_Actionjs } from "./Action";

function StopSoundAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

StopSoundAction.prototype = Object.create(Action_Actionjs.prototype);
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

export { StopSoundAction_StopSoundAction as StopSoundAction };