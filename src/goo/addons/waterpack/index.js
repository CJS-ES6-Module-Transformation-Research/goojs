import { FlatWaterRenderer } from "./FlatWaterRenderer";
import { ProjectedGrid } from "./ProjectedGrid";
import { ProjectedGridWaterRenderer } from "./ProjectedGridWaterRenderer";
module.exports = {
	FlatWaterRenderer: FlatWaterRenderer,
	ProjectedGrid: ProjectedGrid,
	ProjectedGridWaterRenderer: ProjectedGridWaterRenderer
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}