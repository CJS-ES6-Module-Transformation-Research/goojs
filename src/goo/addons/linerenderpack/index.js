import LineRenderer_moduleDefault from "./LineRenderer";
import LineRenderSystem_moduleDefault from "./LineRenderSystem";
export default {
	LineRenderer: LineRenderer_moduleDefault,
	LineRenderSystem: LineRenderSystem_moduleDefault
};;

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}