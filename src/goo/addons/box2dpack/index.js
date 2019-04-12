import componentsBox2DComponent_moduleDefault from "./components/Box2DComponent";
import systemsBox2DSystem_moduleDefault from "./systems/Box2DSystem";
export default {
	Box2DComponent: componentsBox2DComponent_moduleDefault,
	Box2DSystem: systemsBox2DSystem_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}