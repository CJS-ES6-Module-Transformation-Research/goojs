import { Forrestjs as Forrest_Forrestjs } from "./Forrest";
import { Terrainjs as Terrain_Terrainjs } from "./Terrain";
import { TerrainHandlerjs as TerrainHandler_TerrainHandlerjs } from "./TerrainHandler";
import { TerrainSurfacejs as TerrainSurface_TerrainSurfacejs } from "./TerrainSurface";
import { Vegetationjs as Vegetation_Vegetationjs } from "./Vegetation";
var indexjs;
indexjs = {
	Forrest: Forrest_Forrestjs,
	Terrain: Terrain_Terrainjs,
	TerrainHandler: TerrainHandler_TerrainHandlerjs,
	TerrainSurface: TerrainSurface_TerrainSurfacejs,
	Vegetation: Vegetation_Vegetationjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}