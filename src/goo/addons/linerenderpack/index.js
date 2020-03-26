import { LineRendererjs as LineRenderer_LineRendererjs } from "./LineRenderer";
import { LineRenderSystemjs as LineRenderSystem_LineRenderSystemjs } from "./LineRenderSystem";
var indexjs;
indexjs = {
	LineRenderer: LineRenderer_LineRendererjs,
	LineRenderSystem: LineRenderSystem_LineRenderSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}