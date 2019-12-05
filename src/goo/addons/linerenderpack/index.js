import { LineRenderer } from "./LineRenderer";
import { LineRenderSystem } from "./LineRenderSystem";
module.exports = {
	LineRenderer: LineRenderer,
	LineRenderSystem: LineRenderSystem
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}