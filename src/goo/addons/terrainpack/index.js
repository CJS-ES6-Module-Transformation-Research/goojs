var _Forrest = require("./Forrest");

var _Terrain = require("./Terrain");

var _TerrainHandler = require("./TerrainHandler");

var _TerrainSurface = require("./TerrainSurface");

var _Vegetation = require("./Vegetation");

module.exports = {
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
