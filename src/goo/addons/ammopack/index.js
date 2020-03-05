import { AmmoComponent as AmmoComponent_AmmoComponentjs } from "./AmmoComponent";
import { AmmoSystem as AmmoSystem_AmmoSystemjs } from "./AmmoSystem";
import {     calculateTriangleMeshShapejs as calculateTriangleMeshShape_calculateTriangleMeshShapejsjs, } from "./calculateTriangleMeshShape";
module.exports = {
	AmmoComponent: AmmoComponent_AmmoComponentjs,
	AmmoSystem: AmmoSystem_AmmoSystemjs,
	calculateTriangleMeshShape: calculateTriangleMeshShape_calculateTriangleMeshShapejsjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}