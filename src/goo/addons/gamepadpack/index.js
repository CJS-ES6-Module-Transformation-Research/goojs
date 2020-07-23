"use strict";

var _GamepadComponent = require("./GamepadComponent");

var _GamepadData = require("./GamepadData");

var _GamepadSystem = require("./GamepadSystem");

var indexjs;
indexjs = {
	GamepadComponent: _GamepadComponent.GamepadComponent,
	GamepadData: _GamepadData.GamepadData,
	GamepadSystem: _GamepadSystem.GamepadSystem
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}