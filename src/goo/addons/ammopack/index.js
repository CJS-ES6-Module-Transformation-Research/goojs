"use strict";

var _AmmoComponent = require("./AmmoComponent");

var _AmmoSystem = require("./AmmoSystem");

var _calculateTriangleMeshShape = require("./calculateTriangleMeshShape");

var indexjs;
indexjs = {
	AmmoComponent: _AmmoComponent.AmmoComponentjs,
	AmmoSystem: _AmmoSystem.AmmoSystemjs,
	calculateTriangleMeshShape: _calculateTriangleMeshShape.calculateTriangleMeshShapejs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
