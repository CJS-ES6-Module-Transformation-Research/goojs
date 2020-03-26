"use strict";

var _P2Component = require("./P2Component");

var _P2System = require("./P2System");

var indexjs;
indexjs = {
	P2Component: _P2Component.P2Componentjs,
	P2System: _P2System.P2Systemjs
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
