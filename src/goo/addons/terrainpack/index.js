import { Forrest as Forrest_Forrestjs } from "./Forrest";
import { Terrain as Terrain_Terrainjs } from "./Terrain";
import { TerrainHandler as TerrainHandler_TerrainHandlerjs } from "./TerrainHandler";
import { TerrainSurface as TerrainSurface_TerrainSurfacejs } from "./TerrainSurface";
import { Vegetation as Vegetation_Vegetationjs } from "./Vegetation";
module.exports = {
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