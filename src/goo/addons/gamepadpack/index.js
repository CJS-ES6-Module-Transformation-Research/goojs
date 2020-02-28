import { GamepadComponent as GamepadComponentjs } from "./GamepadComponent";
import { GamepadData as GamepadData_GamepadDatajs } from "./GamepadData";
import { GamepadSystem as GamepadSystemjs } from "./GamepadSystem";
module.exports = {
	GamepadComponent: GamepadComponentjs,
	GamepadData: GamepadData_GamepadDatajs,
	GamepadSystem: GamepadSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}