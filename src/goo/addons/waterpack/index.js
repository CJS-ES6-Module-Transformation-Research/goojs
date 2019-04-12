import FlatWaterRenderer_moduleDefault from "./FlatWaterRenderer";
import ProjectedGrid_moduleDefault from "./ProjectedGrid";
import ProjectedGridWaterRenderer_moduleDefault from "./ProjectedGridWaterRenderer";
export default {
	FlatWaterRenderer: FlatWaterRenderer_moduleDefault,
	ProjectedGrid: ProjectedGrid_moduleDefault,
	ProjectedGridWaterRenderer: ProjectedGridWaterRenderer_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}