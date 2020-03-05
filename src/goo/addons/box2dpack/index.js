import { Box2DComponent as Box2DComponent_Box2DComponentjs } from "./components/Box2DComponent";
import { Box2DSystem as Box2DSystem_Box2DSystemjs } from "./systems/Box2DSystem";
module.exports = {
	Box2DComponent: Box2DComponent_Box2DComponentjs,
	Box2DSystem: Box2DSystem_Box2DSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}