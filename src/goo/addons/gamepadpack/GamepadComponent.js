var mod_GamepadComponent = GamepadComponent;
import { Component as Component_Component } from "../../entities/components/Component";

/**
 * @extends Component
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Gamepad/Gamepad-example.html Working example
 * @param gamepadIndex
 */
function GamepadComponent(gamepadIndex) {
	Component_Component.apply(this, arguments);

	this.type = 'GamepadComponent';

	this.buttonDownFunctions = {};

	this.buttonUpFunctions = {};

	this.buttonPressedFunctions = {};

	this.leftStickFunction = null;
	this.rightStickFunction = null;

	this.gamepadIndex = gamepadIndex || 0;
}

GamepadComponent.prototype = Object.create(Component_Component.prototype);
GamepadComponent.prototype.constructor = GamepadComponent;

GamepadComponent.prototype.setButtonDownFunction = function (buttonIndex, buttonFunction) {
	this.buttonDownFunctions[buttonIndex] = buttonFunction;
};

GamepadComponent.prototype.setButtonUpFunction = function (buttonIndex, buttonFunction) {
	this.buttonUpFunctions[buttonIndex] = buttonFunction;
};

GamepadComponent.prototype.setButtonPressedFunction = function (buttonIndex, buttonFunction) {
	this.buttonPressedFunctions[buttonIndex] = buttonFunction;
};

GamepadComponent.prototype.setLeftStickFunction = function (stickFunction) {
	this.leftStickFunction = stickFunction;
};

GamepadComponent.prototype.setRightStickFunction = function (stickFunction) {
	this.rightStickFunction = stickFunction;
};

/**
 * @extends Component
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Gamepad/Gamepad-example.html Working example
 * @param gamepadIndex
 */
export { mod_GamepadComponent as GamepadComponent };