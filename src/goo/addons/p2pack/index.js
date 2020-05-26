import { P2Component as P2Component_P2Component } from "./P2Component";
import { P2System as P2System_P2System } from "./P2System";
var indexjs;
indexjs = {
	P2Component: P2Component_P2Component,
	P2System: P2System_P2System
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}