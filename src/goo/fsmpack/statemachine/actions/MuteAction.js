import { Action as Actionjs } from "./Action";

function MuteAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}
MuteAction.prototype = Object.create(Actionjs.prototype);
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

var exported_MuteAction = MuteAction;
export { exported_MuteAction as MuteAction };