"use strict";

var _Forrest = require("./Forrest");

var _Terrain = require("./Terrain");

var _TerrainHandler = require("./TerrainHandler");

var _TerrainSurface = require("./TerrainSurface");

var _Vegetation = require("./Vegetation");

var indexjs;
indexjs = {
	Forrest: _Forrest.Forrest,
	Terrain: _Terrain.Terrain,
	TerrainHandler: _TerrainHandler.TerrainHandler,
	TerrainSurface: _TerrainSurface.TerrainSurface,
	Vegetation: _Vegetation.Vegetation
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}