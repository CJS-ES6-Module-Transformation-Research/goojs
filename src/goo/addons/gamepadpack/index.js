import { GamepadComponent as GamepadComponent_GamepadComponent } from "./GamepadComponent";
import { GamepadData as GamepadData_GamepadData } from "./GamepadData";
import { GamepadSystem as GamepadSystem_GamepadSystem } from "./GamepadSystem";
var indexjs;
indexjs = {
	GamepadComponent: GamepadComponent_GamepadComponent,
	GamepadData: GamepadData_GamepadData,
	GamepadSystem: GamepadSystem_GamepadSystem
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}