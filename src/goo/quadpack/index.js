import { DoubleQuadjs as DoubleQuad_DoubleQuadjs } from "./DoubleQuad";
import { QuadComponentjs as QuadComponent_QuadComponentjs } from "./QuadComponent";
import { QuadComponentHandlerjs as QuadComponentHandler_QuadComponentHandlerjs } from "./QuadComponentHandler";
var indexjs;
indexjs = {
	DoubleQuad: DoubleQuad_DoubleQuadjs,
	QuadComponent: QuadComponent_QuadComponentjs,
	QuadComponentHandler: QuadComponentHandler_QuadComponentHandlerjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}