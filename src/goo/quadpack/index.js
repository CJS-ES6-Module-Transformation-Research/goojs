"use strict";

var _DoubleQuad = require("./DoubleQuad");

var _QuadComponent = require("./QuadComponent");

var _QuadComponentHandler = require("./QuadComponentHandler");

module.exports = {
	DoubleQuad: _DoubleQuad.DoubleQuad,
	QuadComponent: _QuadComponent.QuadComponent,
	QuadComponentHandler: _QuadComponentHandler.QuadComponentHandler
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
