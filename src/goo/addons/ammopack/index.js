import AmmoComponent_moduleDefault from "./AmmoComponent";
import AmmoSystem_moduleDefault from "./AmmoSystem";
import calculateTriangleMeshShape_moduleDefault from "./calculateTriangleMeshShape";
export default {
	AmmoComponent: AmmoComponent_moduleDefault,
	AmmoSystem: AmmoSystem_moduleDefault,
	calculateTriangleMeshShape: calculateTriangleMeshShape_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}