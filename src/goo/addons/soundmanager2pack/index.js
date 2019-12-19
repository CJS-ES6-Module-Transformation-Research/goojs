var _SoundManager2Component = require("./components/SoundManager2Component");

var _SoundManager2System = require("./systems/SoundManager2System");

module.exports = {
	SoundManager2Component: _SoundManager2Component.SoundManager2Component,
	SoundManager2System: _SoundManager2System.SoundManager2System
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
