import { AmmoComponent as AmmoComponent_AmmoComponent } from "./AmmoComponent";
import { AmmoSystem as AmmoSystem_AmmoSystem } from "./AmmoSystem";
import {     calculateTriangleMeshShape as calculateTriangleMeshShape_calculateTriangleMeshShape, } from "./calculateTriangleMeshShape";
var indexjs;
indexjs = {
	AmmoComponent: AmmoComponent_AmmoComponent,
	AmmoSystem: AmmoSystem_AmmoSystem,
	calculateTriangleMeshShape: calculateTriangleMeshShape_calculateTriangleMeshShape
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}