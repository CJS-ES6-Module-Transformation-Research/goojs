import AxisAlignedCamControlScript_moduleDefault from "./AxisAlignedCamControlScript";
import BasicControlScript_moduleDefault from "./BasicControlScript";
import ButtonScript_moduleDefault from "./ButtonScript";
import CannonPickScript_moduleDefault from "./CannonPickScript";
import FlyControlScript_moduleDefault from "./FlyControlScript";
import GroundBoundMovementScript_moduleDefault from "./GroundBoundMovementScript";
import HeightMapBoundingScript_moduleDefault from "./HeightMapBoundingScript";
import LensFlareScript_moduleDefault from "./LensFlareScript";
import MouseLookControlScript_moduleDefault from "./MouseLookControlScript";
import OrbitNPanControlScript_moduleDefault from "./OrbitNPanControlScript";
import PanCamScript_moduleDefault from "./PanCamScript";
import PickAndRotateScript_moduleDefault from "./PickAndRotateScript";
import PolyBoundingScript_moduleDefault from "./PolyBoundingScript";
import RotationScript_moduleDefault from "./RotationScript";
import ScriptComponentHandler_moduleDefault from "./ScriptComponentHandler";
import ScriptHandler_moduleDefault from "./ScriptHandler";
import * as ScriptHandlers_moduleDefault from "./ScriptHandlers";
import * as ScriptRegister_moduleDefault from "./ScriptRegister";
import SparseHeightMapBoundingScript_moduleDefault from "./SparseHeightMapBoundingScript";
import WasdControlScript_moduleDefault from "./WasdControlScript";
import WorldFittedTerrainScript_moduleDefault from "./WorldFittedTerrainScript";
export default {
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_moduleDefault,
	BasicControlScript: BasicControlScript_moduleDefault,
	ButtonScript: ButtonScript_moduleDefault,
	CannonPickScript: CannonPickScript_moduleDefault,
	FlyControlScript: FlyControlScript_moduleDefault,
	GroundBoundMovementScript: GroundBoundMovementScript_moduleDefault,
	HeightMapBoundingScript: HeightMapBoundingScript_moduleDefault,
	LensFlareScript: LensFlareScript_moduleDefault,
	MouseLookControlScript: MouseLookControlScript_moduleDefault,
	OrbitNPanControlScript: OrbitNPanControlScript_moduleDefault,
	PanCamScript: PanCamScript_moduleDefault,
	PickAndRotateScript: PickAndRotateScript_moduleDefault,
	PolyBoundingScript: PolyBoundingScript_moduleDefault,
	RotationScript: RotationScript_moduleDefault,
	ScriptComponentHandler: ScriptComponentHandler_moduleDefault,
	ScriptHandler: ScriptHandler_moduleDefault,
	ScriptHandlers: ScriptHandlers_moduleDefault,
	ScriptRegister: ScriptRegister_moduleDefault,
	SparseHeightMapBoundingScript: SparseHeightMapBoundingScript_moduleDefault,
	WasdControlScript: WasdControlScript_moduleDefault,
	WorldFittedTerrainScript: WorldFittedTerrainScript_moduleDefault
};;

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}