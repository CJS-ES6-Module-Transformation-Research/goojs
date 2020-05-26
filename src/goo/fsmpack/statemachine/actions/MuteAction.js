var MuteAction_MuteAction = MuteAction;
import { Action as Action_Actionjs } from "./Action";

function MuteAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}
MuteAction.prototype = Object.create(Action_Actionjs.prototype);
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
	if (!world) { return; }

	var soundSystem = world.getSystem('SoundSystem');
	if (soundSystem) {
		soundSystem.mute();
	}
};

export { MuteAction_MuteAction as MuteAction };