import { Box2DComponentjs as componentsBox2DComponent_Box2DComponentjs } from "./components/Box2DComponent";
import { Box2DSystemjs as systemsBox2DSystem_Box2DSystemjs } from "./systems/Box2DSystem";
var indexjs;
indexjs = {
	Box2DComponent: componentsBox2DComponent_Box2DComponentjs,
	Box2DSystem: systemsBox2DSystem_Box2DSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}