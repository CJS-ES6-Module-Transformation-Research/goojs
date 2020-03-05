import { DoubleQuad as DoubleQuad_DoubleQuadjs } from "./DoubleQuad";
import { QuadComponent as QuadComponent_QuadComponentjs } from "./QuadComponent";
import { QuadComponentHandler as QuadComponentHandler_QuadComponentHandlerjs } from "./QuadComponentHandler";
module.exports = {
	DoubleQuad: DoubleQuad_DoubleQuadjs,
	QuadComponent: QuadComponent_QuadComponentjs,
	QuadComponentHandler: QuadComponentHandler_QuadComponentHandlerjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}