import { LineRenderer as LineRenderer_LineRenderer } from "./LineRenderer";
import { LineRenderSystem as LineRenderSystem_LineRenderSystem } from "./LineRenderSystem";
var indexjs;
indexjs = {
	LineRenderer: LineRenderer_LineRenderer,
	LineRenderSystem: LineRenderSystem_LineRenderSystem
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}