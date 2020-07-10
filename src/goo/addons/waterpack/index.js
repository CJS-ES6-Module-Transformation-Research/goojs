"use strict";

var _FlatWaterRenderer = require("./FlatWaterRenderer");

var _ProjectedGrid = require("./ProjectedGrid");

var _ProjectedGridWaterRenderer = require("./ProjectedGridWaterRenderer");

var indexjs;
indexjs = {
	FlatWaterRenderer: _FlatWaterRenderer.FlatWaterRenderer,
	ProjectedGrid: _ProjectedGrid.ProjectedGrid,
	ProjectedGridWaterRenderer: _ProjectedGridWaterRenderer.ProjectedGridWaterRenderer
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}