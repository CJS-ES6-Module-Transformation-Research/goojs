"use strict";

var _SoundManager2Component = require("./components/SoundManager2Component");

var _SoundManager2System = require("./systems/SoundManager2System");

var indexjs;
indexjs = {
	SoundManager2Component: _SoundManager2Component.SoundManager2Componentjs,
	SoundManager2System: _SoundManager2System.SoundManager2Systemjs
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
