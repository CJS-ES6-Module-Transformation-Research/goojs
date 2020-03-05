import { GamepadComponent as GamepadComponent_GamepadComponentjs } from "./GamepadComponent";
import { GamepadData as GamepadData_GamepadDatajs } from "./GamepadData";
import { GamepadSystem as GamepadSystem_GamepadSystemjs } from "./GamepadSystem";
module.exports = {
	GamepadComponent: GamepadComponent_GamepadComponentjs,
	GamepadData: GamepadData_GamepadDatajs,
	GamepadSystem: GamepadSystem_GamepadSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}