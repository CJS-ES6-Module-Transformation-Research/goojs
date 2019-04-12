Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = GamepadComponent;

var _Component = require("../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @extends Component
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Gamepad/Gamepad-example.html Working example
 * @param gamepadIndex
 */
function GamepadComponent(gamepadIndex) {
	_Component2.default.apply(this, arguments);

	this.type = 'GamepadComponent';

	this.buttonDownFunctions = {};

	this.buttonUpFunctions = {};

	this.buttonPressedFunctions = {};

	this.leftStickFunction = null;
	this.rightStickFunction = null;

	this.gamepadIndex = gamepadIndex || 0;
}

GamepadComponent.prototype = Object.create(_Component2.default.prototype);
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
module.exports = exports.default;
