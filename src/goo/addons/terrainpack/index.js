import Forrest_moduleDefault from "./Forrest";
import Terrain_moduleDefault from "./Terrain";
import TerrainHandler_moduleDefault from "./TerrainHandler";
import TerrainSurface_moduleDefault from "./TerrainSurface";
import Vegetation_moduleDefault from "./Vegetation";
export default {
	Forrest: Forrest_moduleDefault,
	Terrain: Terrain_moduleDefault,
	TerrainHandler: TerrainHandler_moduleDefault,
	TerrainSurface: TerrainSurface_moduleDefault,
	Vegetation: Vegetation_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}