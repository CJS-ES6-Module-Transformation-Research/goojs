import {     SoundManager2Componentjs as componentsSoundManager2Component_SoundManager2Componentjs, } from "./components/SoundManager2Component";
import { SoundManager2Systemjs as systemsSoundManager2System_SoundManager2Systemjs } from "./systems/SoundManager2System";
var indexjs;
indexjs = {
	SoundManager2Component: componentsSoundManager2Component_SoundManager2Componentjs,
	SoundManager2System: systemsSoundManager2System_SoundManager2Systemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}