var GamepadComponent_GamepadComponent = GamepadComponent;
import { Component as entitiescomponentsComponent_Componentjs } from "../../entities/components/Component";
function GamepadComponent(gamepadIndex) {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	this.type = 'GamepadComponent';

	this.buttonDownFunctions = {};

	this.buttonUpFunctions = {};

	this.buttonPressedFunctions = {};

	this.leftStickFunction = null;
	this.rightStickFunction = null;

	this.gamepadIndex = gamepadIndex || 0;
}

GamepadComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);
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
export { GamepadComponent_GamepadComponent as GamepadComponent };