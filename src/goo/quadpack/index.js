"use strict";

var _DoubleQuad = require("./DoubleQuad");

var _QuadComponent = require("./QuadComponent");

var _QuadComponentHandler = require("./QuadComponentHandler");

var indexjs;
indexjs = {
	DoubleQuad: _DoubleQuad.DoubleQuadjs,
	QuadComponent: _QuadComponent.QuadComponentjs,
	QuadComponentHandler: _QuadComponentHandler.QuadComponentHandlerjs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
