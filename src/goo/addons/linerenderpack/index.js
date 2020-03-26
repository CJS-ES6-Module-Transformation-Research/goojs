"use strict";

var _LineRenderer = require("./LineRenderer");

var _LineRenderSystem = require("./LineRenderSystem");

var indexjs;
indexjs = {
	LineRenderer: _LineRenderer.LineRendererjs,
	LineRenderSystem: _LineRenderSystem.LineRenderSystemjs
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
