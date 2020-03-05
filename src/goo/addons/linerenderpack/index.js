import { LineRenderer as LineRenderer_LineRendererjs } from "./LineRenderer";
import { LineRenderSystem as LineRenderSystem_LineRenderSystemjs } from "./LineRenderSystem";
module.exports = {
	LineRenderer: LineRenderer_LineRendererjs,
	LineRenderSystem: LineRenderSystem_LineRenderSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}