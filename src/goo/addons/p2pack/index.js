import P2Component_moduleDefault from "./P2Component";
import P2System_moduleDefault from "./P2System";
export default {
	P2Component: P2Component_moduleDefault,
	P2System: P2System_moduleDefault
};;

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}