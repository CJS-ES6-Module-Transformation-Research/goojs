import { AmmoComponentjs as AmmoComponent_AmmoComponentjs } from "./AmmoComponent";
import { AmmoSystemjs as AmmoSystem_AmmoSystemjs } from "./AmmoSystem";
import {     calculateTriangleMeshShapejs as calculateTriangleMeshShape_calculateTriangleMeshShapejs, } from "./calculateTriangleMeshShape";
var indexjs;
indexjs = {
	AmmoComponent: AmmoComponent_AmmoComponentjs,
	AmmoSystem: AmmoSystem_AmmoSystemjs,
	calculateTriangleMeshShape: calculateTriangleMeshShape_calculateTriangleMeshShapejs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}