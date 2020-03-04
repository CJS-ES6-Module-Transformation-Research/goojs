import { FlatWaterRenderer as FlatWaterRenderer_FlatWaterRendererjs } from "./FlatWaterRenderer";
import { ProjectedGrid as ProjectedGridjs } from "./ProjectedGrid";
import {     ProjectedGridWaterRenderer as ProjectedGridWaterRenderer_ProjectedGridWaterRendererjs, } from "./ProjectedGridWaterRenderer";
module.exports = {
	FlatWaterRenderer: FlatWaterRenderer_FlatWaterRendererjs,
	ProjectedGrid: ProjectedGridjs,
	ProjectedGridWaterRenderer: ProjectedGridWaterRenderer_ProjectedGridWaterRendererjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}