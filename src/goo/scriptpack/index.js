import * as AxisAlignedCamControlScript from "./AxisAlignedCamControlScript";
import { BasicControlScript } from "./BasicControlScript";
import * as ButtonScript from "./ButtonScript";
import * as CannonPickScript from "./CannonPickScript";
import * as FlyControlScript from "./FlyControlScript";
import { GroundBoundMovementScript } from "./GroundBoundMovementScript";
import { HeightMapBoundingScript } from "./HeightMapBoundingScript";
import * as LensFlareScript from "./LensFlareScript";
import * as MouseLookControlScript from "./MouseLookControlScript";
import * as OrbitNPanControlScript from "./OrbitNPanControlScript";
import * as PanCamScript from "./PanCamScript";
import * as PickAndRotateScript from "./PickAndRotateScript";
import { PolyBoundingScript } from "./PolyBoundingScript";
import * as RotationScript from "./RotationScript";
import { ScriptComponentHandler } from "./ScriptComponentHandler";
import { ScriptHandler } from "./ScriptHandler";
import { SparseHeightMapBoundingScript } from "./SparseHeightMapBoundingScript";
import * as WasdControlScript from "./WasdControlScript";
import { WorldFittedTerrainScript } from "./WorldFittedTerrainScript";
module.exports = {
	AxisAlignedCamControlScript: AxisAlignedCamControlScript,
	BasicControlScript: BasicControlScript,
	ButtonScript: ButtonScript,
	CannonPickScript: CannonPickScript,
	FlyControlScript: FlyControlScript,
	GroundBoundMovementScript: GroundBoundMovementScript,
	HeightMapBoundingScript: HeightMapBoundingScript,
	LensFlareScript: LensFlareScript,
	MouseLookControlScript: MouseLookControlScript,
	OrbitNPanControlScript: OrbitNPanControlScript,
	PanCamScript: PanCamScript,
	PickAndRotateScript: PickAndRotateScript,
	PolyBoundingScript: PolyBoundingScript,
	RotationScript: RotationScript,
	ScriptComponentHandler: ScriptComponentHandler,
	ScriptHandler: ScriptHandler,
	ScriptHandlers: require('./ScriptHandlers'),
	ScriptRegister: require('./ScriptRegister'),
	SparseHeightMapBoundingScript: SparseHeightMapBoundingScript,
	WasdControlScript: WasdControlScript,
	WorldFittedTerrainScript: WorldFittedTerrainScript
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}