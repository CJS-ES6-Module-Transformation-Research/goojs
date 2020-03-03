import { Forrest } from "./Forrest";
import { Terrain } from "./Terrain";
import { TerrainHandler } from "./TerrainHandler";
import { TerrainSurface } from "./TerrainSurface";
import { Vegetation } from "./Vegetation";
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