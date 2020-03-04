import { LineRenderer as LineRenderer_LineRendererjs } from "./LineRenderer";
import { LineRenderSystem as LineRenderSystemjs } from "./LineRenderSystem";
module.exports = {
	LineRenderer: LineRenderer_LineRendererjs,
	LineRenderSystem: LineRenderSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}