"use strict";

var _Box2DComponent = require("./components/Box2DComponent");

var _Box2DSystem = require("./systems/Box2DSystem");

var indexjs;
indexjs = {
	Box2DComponent: _Box2DComponent.Box2DComponentjs,
	Box2DSystem: _Box2DSystem.Box2DSystemjs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
