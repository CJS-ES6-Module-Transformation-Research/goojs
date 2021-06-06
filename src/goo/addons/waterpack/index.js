import { FlatWaterRenderer as FlatWaterRenderer_FlatWaterRenderer } from "./FlatWaterRenderer";
import { ProjectedGrid as ProjectedGrid_ProjectedGrid } from "./ProjectedGrid";
import {     ProjectedGridWaterRenderer as ProjectedGridWaterRenderer_ProjectedGridWaterRenderer, } from "./ProjectedGridWaterRenderer";
mod_indexjs = {
	FlatWaterRenderer: FlatWaterRenderer_FlatWaterRenderer,
	ProjectedGrid: ProjectedGrid_ProjectedGrid,
	ProjectedGridWaterRenderer: ProjectedGridWaterRenderer_ProjectedGridWaterRenderer
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };