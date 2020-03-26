import { FlatWaterRendererjs as FlatWaterRenderer_FlatWaterRendererjs } from "./FlatWaterRenderer";
import { ProjectedGridjs as ProjectedGrid_ProjectedGridjs } from "./ProjectedGrid";
import {     ProjectedGridWaterRendererjs as ProjectedGridWaterRenderer_ProjectedGridWaterRendererjs, } from "./ProjectedGridWaterRenderer";
var indexjs;
indexjs = {
	FlatWaterRenderer: FlatWaterRenderer_FlatWaterRendererjs,
	ProjectedGrid: ProjectedGrid_ProjectedGridjs,
	ProjectedGridWaterRenderer: ProjectedGridWaterRenderer_ProjectedGridWaterRendererjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}