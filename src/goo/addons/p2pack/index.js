import { P2Component } from "./P2Component";
import { P2System } from "./P2System";
module.exports = {
	P2Component: P2Component,
	P2System: P2System
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}