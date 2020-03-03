import { AmmoComponent as AmmoComponentjs } from "./AmmoComponent";
import { AmmoSystem } from "./AmmoSystem";
import { calculateTriangleMeshShapejs } from "./calculateTriangleMeshShape";
module.exports = {
	AmmoComponent: AmmoComponentjs,
	AmmoSystem: AmmoSystem_AmmoSystemjs,
	calculateTriangleMeshShape: calculateTriangleMeshShape_calculateTriangleMeshShapejsjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}