import { Box2DComponent as componentsBox2DComponent_Box2DComponent } from "./components/Box2DComponent";
import { Box2DSystem as systemsBox2DSystem_Box2DSystem } from "./systems/Box2DSystem";
mod_indexjs = {
	Box2DComponent: componentsBox2DComponent_Box2DComponent,
	Box2DSystem: systemsBox2DSystem_Box2DSystem
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };