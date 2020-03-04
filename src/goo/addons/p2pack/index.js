import { P2Component as P2Componentjs } from "./P2Component";
import { P2System as P2Systemjs } from "./P2System";
module.exports = {
	P2Component: P2Componentjs,
	P2System: P2Systemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}