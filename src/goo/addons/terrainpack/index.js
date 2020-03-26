"use strict";

var _Forrest = require("./Forrest");

var _Terrain = require("./Terrain");

var _TerrainHandler = require("./TerrainHandler");

var _TerrainSurface = require("./TerrainSurface");

var _Vegetation = require("./Vegetation");

var indexjs;
indexjs = {
	Forrest: _Forrest.Forrestjs,
	Terrain: _Terrain.Terrainjs,
	TerrainHandler: _TerrainHandler.TerrainHandlerjs,
	TerrainSurface: _TerrainSurface.TerrainSurfacejs,
	Vegetation: _Vegetation.Vegetationjs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
