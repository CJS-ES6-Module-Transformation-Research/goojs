import {     SoundManager2Component as componentsSoundManager2Component_SoundManager2Component, } from "./components/SoundManager2Component";
import { SoundManager2System as systemsSoundManager2System_SoundManager2System } from "./systems/SoundManager2System";
mod_indexjs = {
	SoundManager2Component: componentsSoundManager2Component_SoundManager2Component,
	SoundManager2System: systemsSoundManager2System_SoundManager2System
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };