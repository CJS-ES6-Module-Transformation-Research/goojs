var ToggleMuteAction_ToggleMuteAction = ToggleMuteAction;
import { Action as Action_Actionjs } from "./Action";

function ToggleMuteAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}
ToggleMuteAction.prototype = Object.create(Action_Actionjs.prototype);
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
	if (!world) { return; }

	var soundSystem = world.getSystem('SoundSystem');
	if (soundSystem) {
		if (soundSystem.muted) {
			soundSystem.unmute();
		} else {
			soundSystem.mute();
		}
	}
};

export { ToggleMuteAction_ToggleMuteAction as ToggleMuteAction };