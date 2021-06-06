import { Forrest as Forrest_Forrest } from "./Forrest";
import { Terrain as Terrain_Terrain } from "./Terrain";
import { TerrainHandler as TerrainHandler_TerrainHandler } from "./TerrainHandler";
import { TerrainSurface as TerrainSurface_TerrainSurface } from "./TerrainSurface";
import { Vegetation as Vegetation_Vegetation } from "./Vegetation";
mod_indexjs = {
	Forrest: Forrest_Forrest,
	Terrain: Terrain_Terrain,
	TerrainHandler: TerrainHandler_TerrainHandler,
	TerrainSurface: TerrainSurface_TerrainSurface,
	Vegetation: Vegetation_Vegetation
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };