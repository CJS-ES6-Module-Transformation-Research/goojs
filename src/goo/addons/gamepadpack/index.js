import GamepadComponent_moduleDefault from "./GamepadComponent";
import GamepadData_moduleDefault from "./GamepadData";
import GamepadSystem_moduleDefault from "./GamepadSystem";
export default {
	GamepadComponent: GamepadComponent_moduleDefault,
	GamepadData: GamepadData_moduleDefault,
	GamepadSystem: GamepadSystem_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}