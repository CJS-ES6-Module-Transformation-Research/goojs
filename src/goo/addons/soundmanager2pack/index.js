import { SoundManager2Component } from "./components/SoundManager2Component";
import { SoundManager2System } from "./systems/SoundManager2System";
module.exports = {
	SoundManager2Component: SoundManager2Component_SoundManager2Componentjs,
	SoundManager2System: SoundManager2System_SoundManager2Systemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}