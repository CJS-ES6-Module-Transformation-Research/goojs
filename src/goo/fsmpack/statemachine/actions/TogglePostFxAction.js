var TogglePostFxAction_TogglePostFxAction = TogglePostFxAction;
import { Action as Action_Actionjs } from "./Action";

function TogglePostFxAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

TogglePostFxAction.prototype = Object.create(Action_Actionjs.prototype);
TogglePostFxAction.prototype.constructor = TogglePostFxAction;

TogglePostFxAction.external = {
	key: 'Toggle Post FX',
	name: 'Toggle Post FX',
	type: 'fx',
	description: 'Enabled/disables post fx globally.',
	parameters: [{
		name: 'Set Post FX state',
		key: 'enabled',
		type: 'boolean',
		description: 'Set Post FX on/off.',
		'default': true
	}],
	transitions: []
};

TogglePostFxAction.prototype.enter = function (fsm) {
	var renderSystem = fsm.getWorld().gooRunner.renderSystem;
	if (renderSystem) {
		renderSystem.enableComposers(this.enabled);
	}
};

export { TogglePostFxAction_TogglePostFxAction as TogglePostFxAction };