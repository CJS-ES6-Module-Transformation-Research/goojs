import { DoubleQuad as DoubleQuad_DoubleQuad } from "./DoubleQuad";
import { QuadComponent as QuadComponent_QuadComponent } from "./QuadComponent";
import { QuadComponentHandler as QuadComponentHandler_QuadComponentHandler } from "./QuadComponentHandler";
mod_indexjs = {
	DoubleQuad: DoubleQuad_DoubleQuad,
	QuadComponent: QuadComponent_QuadComponent,
	QuadComponentHandler: QuadComponentHandler_QuadComponentHandler
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };