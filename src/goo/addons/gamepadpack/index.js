import { GamepadComponent } from "./GamepadComponent";
import { GamepadData } from "./GamepadData";
import { GamepadSystem } from "./GamepadSystem";
module.exports = {
	GamepadComponent: GamepadComponent,
	GamepadData: GamepadData,
	GamepadSystem: GamepadSystem
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}