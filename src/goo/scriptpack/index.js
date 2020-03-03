import { AxisAlignedCamControlScript } from "./AxisAlignedCamControlScript";
import { BasicControlScript } from "./BasicControlScript";
import { ButtonScript } from "./ButtonScript";
import { CannonPickScript } from "./CannonPickScript";
import { FlyControlScript } from "./FlyControlScript";
import { GroundBoundMovementScript } from "./GroundBoundMovementScript";
import { HeightMapBoundingScript } from "./HeightMapBoundingScript";
import { LensFlareScript } from "./LensFlareScript";
import { MouseLookControlScript } from "./MouseLookControlScript";
import { OrbitNPan } from "./OrbitNPanControlScript";
import { PanCamScript } from "./PanCamScript";
import { PickAndRotateScript } from "./PickAndRotateScript";
import { PolyBoundingScript } from "./PolyBoundingScript";
import { RotationScript } from "./RotationScript";
import { ScriptComponentHandler as ScriptComponentHandlerjs } from "./ScriptComponentHandler";
import { ScriptHandler as ScriptHandlerjs } from "./ScriptHandler";
import { SparseHeightMapBoundingScript } from "./SparseHeightMapBoundingScript";
import { WasdControlScript } from "./WasdControlScript";
import { WorldFittedTerrainScript } from "./WorldFittedTerrainScript";
module.exports = {
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_AxisAlignedCamControlScriptjs,
	BasicControlScript: BasicControlScript_BasicControlScriptjs,
	ButtonScript: ButtonScript_ButtonScriptjs,
	CannonPickScript: CannonPickScript_CannonPickScriptjs,
	FlyControlScript: FlyControlScript_FlyControlScriptjs,
	GroundBoundMovementScript: GroundBoundMovementScript_GroundBoundMovementScriptjs,
	HeightMapBoundingScript: HeightMapBoundingScript_HeightMapBoundingScriptjs,
	LensFlareScript: LensFlareScript_LensFlareScriptjs,
	MouseLookControlScript: MouseLookControlScript_MouseLookControlScriptjs,
	OrbitNPanControlScript: OrbitNPanControlScript_OrbitNPanjs,
	PanCamScript: PanCamScript_PanCamScriptjs,
	PickAndRotateScript: PickAndRotateScript_PickAndRotateScriptjs,
	PolyBoundingScript: PolyBoundingScript_PolyBoundingScriptjs,
	RotationScript: RotationScript_RotationScriptjs,
	ScriptComponentHandler: ScriptComponentHandlerjs,
	ScriptHandler: ScriptHandlerjs,
	ScriptHandlers: {},
	ScriptRegister: {},
	SparseHeightMapBoundingScript: SparseHeightMapBoundingScript_SparseHeightMapBoundingScriptjs,
	WasdControlScript: WasdControlScript_WasdControlScriptjs,
	WorldFittedTerrainScript: WorldFittedTerrainScript_WorldFittedTerrainScriptjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}