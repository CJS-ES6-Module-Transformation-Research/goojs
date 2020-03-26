import { GamepadComponentjs as GamepadComponent_GamepadComponentjs } from "./GamepadComponent";
import { GamepadDatajs as GamepadData_GamepadDatajs } from "./GamepadData";
import { GamepadSystemjs as GamepadSystem_GamepadSystemjs } from "./GamepadSystem";
var indexjs;
indexjs = {
	GamepadComponent: GamepadComponent_GamepadComponentjs,
	GamepadData: GamepadData_GamepadDatajs,
	GamepadSystem: GamepadSystem_GamepadSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}