import { Forrest } from "./Forrest";
import { Terrain } from "./Terrain";
import { TerrainHandler } from "./TerrainHandler";
import { TerrainSurface } from "./TerrainSurface";
import { Vegetation } from "./Vegetation";
module.exports = {
	Forrest: Forrest,
	Terrain: Terrain,
	TerrainHandler: TerrainHandler,
	TerrainSurface: TerrainSurface,
	Vegetation: Vegetation
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}