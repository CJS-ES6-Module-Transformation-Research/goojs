import { Box2DComponent } from "./components/Box2DComponent";
import { Box2DSystem } from "./systems/Box2DSystem";
module.exports = {
	Box2DComponent: Box2DComponent,
	Box2DSystem: Box2DSystem
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}