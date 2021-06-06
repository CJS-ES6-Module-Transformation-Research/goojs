var mod_ToggleFullscreenAction = ToggleFullscreenAction;
import { Action as Action_Action } from "./Action";
import { GameUtils as GameUtils_GameUtils } from "./../../../util/GameUtils";

function ToggleFullscreenAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

ToggleFullscreenAction.prototype = Object.create(Action_Action.prototype);
ToggleFullscreenAction.prototype.constructor = ToggleFullscreenAction;

ToggleFullscreenAction.external = {
	key: 'Toggle Fullscreen',
	name: 'Toggle Fullscreen',
	type: 'display',
	description: 'Toggles fullscreen on/off. Note that in most browsers this must be initiated by a user gesture. For example, click or touch.',
	parameters: [],
	transitions: []
};

ToggleFullscreenAction.prototype.enter = function (/*fsm*/) {
	GameUtils_GameUtils.toggleFullScreen();
};

export { mod_ToggleFullscreenAction as ToggleFullscreenAction };