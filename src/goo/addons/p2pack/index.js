import { P2Componentjs as P2Component_P2Componentjs } from "./P2Component";
import { P2Systemjs as P2System_P2Systemjs } from "./P2System";
var indexjs;
indexjs = {
	P2Component: P2Component_P2Componentjs,
	P2System: P2System_P2Systemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}