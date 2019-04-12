import DoubleQuad_moduleDefault from "./DoubleQuad";
import QuadComponent_moduleDefault from "./QuadComponent";
import QuadComponentHandler_moduleDefault from "./QuadComponentHandler";
export default {
	DoubleQuad: DoubleQuad_moduleDefault,
	QuadComponent: QuadComponent_moduleDefault,
	QuadComponentHandler: QuadComponentHandler_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}