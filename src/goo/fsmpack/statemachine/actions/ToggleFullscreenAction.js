var ToggleFullscreenAction_ToggleFullscreenAction = ToggleFullscreenAction;
import { Action as Action_Actionjs } from "./Action";
import { toggleFullScreen as GameUtilsjs_toggleFullScreen } from "./../../../util/GameUtils";

function ToggleFullscreenAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

ToggleFullscreenAction.prototype = Object.create(Action_Actionjs.prototype);
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
	GameUtilsjs_toggleFullScreen();
};

export { ToggleFullscreenAction_ToggleFullscreenAction as ToggleFullscreenAction };