import { DoubleQuad as DoubleQuadjs } from "./DoubleQuad";
import { QuadComponent as QuadComponentjs } from "./QuadComponent";
import { QuadComponentHandler as QuadComponentHandlerjs } from "./QuadComponentHandler";
module.exports = {
	DoubleQuad: DoubleQuadjs,
	QuadComponent: QuadComponentjs,
	QuadComponentHandler: QuadComponentHandlerjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}