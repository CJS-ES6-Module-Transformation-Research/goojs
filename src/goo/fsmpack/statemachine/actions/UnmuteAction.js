var mod_UnmuteAction = UnmuteAction;
import { Action as Action_Action } from "./Action";

function UnmuteAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}
UnmuteAction.prototype = Object.create(Action_Action.prototype);
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

export { mod_UnmuteAction as UnmuteAction };