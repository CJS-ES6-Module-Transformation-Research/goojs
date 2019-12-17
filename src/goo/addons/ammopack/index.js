import { AmmoComponent } from "./AmmoComponent";
import { AmmoSystem } from "./AmmoSystem";
import { calculateTriangleMeshShapejs as calculateTriangleMeshShape } from "./calculateTriangleMeshShape";
module.exports = {
	AmmoComponent: AmmoComponent,
	AmmoSystem: AmmoSystem,
	calculateTriangleMeshShape: calculateTriangleMeshShape
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}