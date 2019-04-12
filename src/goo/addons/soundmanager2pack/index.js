import componentsSoundManager2Component_moduleDefault from "./components/SoundManager2Component";
import systemsSoundManager2System_moduleDefault from "./systems/SoundManager2System";
export default {
	SoundManager2Component: componentsSoundManager2Component_moduleDefault,
	SoundManager2System: systemsSoundManager2System_moduleDefault
};;

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}