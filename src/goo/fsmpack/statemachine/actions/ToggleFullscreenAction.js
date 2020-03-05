import { Action as Actionjs } from "./Action";
import { GameUtils as GameUtilsjs } from "./../../../util/GameUtils";

function ToggleFullscreenAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

ToggleFullscreenAction.prototype = Object.create(Actionjs.prototype);
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
	GameUtilsjs.toggleFullScreen();
};

var exported_ToggleFullscreenAction = ToggleFullscreenAction;
export { exported_ToggleFullscreenAction as ToggleFullscreenAction };