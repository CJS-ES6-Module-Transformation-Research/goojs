var _Box2DComponent = require("./components/Box2DComponent");

var _Box2DSystem = require("./systems/Box2DSystem");

module.exports = {
	Box2DComponent: _Box2DComponent.Box2DComponent,
	Box2DSystem: _Box2DSystem.Box2DSystem
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
