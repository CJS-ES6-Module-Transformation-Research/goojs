import { Action } from "./Action";
import * as GameUtils from "./../../../util/GameUtils";

function ToggleFullscreenAction/*id, settings*/() {
	Action.apply(this, arguments);
}

ToggleFullscreenAction.prototype = Object.create(Action.prototype);
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
	GameUtils.toggleFullScreen();
};

var exported_ToggleFullscreenAction = ToggleFullscreenAction;
export { exported_ToggleFullscreenAction as ToggleFullscreenAction };