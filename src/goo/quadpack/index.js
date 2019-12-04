import { DoubleQuad } from "./DoubleQuad";
import { QuadComponent } from "./QuadComponent";
import { QuadComponentHandler } from "./QuadComponentHandler";
module.exports = {
	DoubleQuad: DoubleQuad,
	QuadComponent: QuadComponent,
	QuadComponentHandler: QuadComponentHandler
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}