import { Action as Action_Actionjs } from "./Action";

function UnmuteAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}
UnmuteAction.prototype = Object.create(Action_Actionjs.prototype);
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
	if (!world) { return; }

	var soundSystem = world.getSystem('SoundSystem');
	if (soundSystem) {
		soundSystem.unmute();
	}
};

var exported_UnmuteAction = UnmuteAction;
export { exported_UnmuteAction as UnmuteAction };