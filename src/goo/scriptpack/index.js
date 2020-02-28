import {     AxisAlignedCamControlScript as AxisAlignedCamControlScript_AxisAlignedCamControlScriptjs, } from "./AxisAlignedCamControlScript";
import { BasicControlScript as BasicControlScript_BasicControlScriptjs } from "./BasicControlScript";
import { ButtonScript as ButtonScript_ButtonScriptjs } from "./ButtonScript";
import { CannonPickScript as CannonPickScript_CannonPickScriptjs } from "./CannonPickScript";
import { FlyControlScript as FlyControlScript_FlyControlScriptjs } from "./FlyControlScript";
import {     GroundBoundMovementScript as GroundBoundMovementScript_GroundBoundMovementScriptjs, } from "./GroundBoundMovementScript";
import {     HeightMapBoundingScript as HeightMapBoundingScript_HeightMapBoundingScriptjs, } from "./HeightMapBoundingScript";
import { LensFlareScript as LensFlareScript_LensFlareScriptjs } from "./LensFlareScript";
import { MouseLookControlScript as MouseLookControlScript_MouseLookControlScriptjs } from "./MouseLookControlScript";
import { OrbitNPan as OrbitNPanControlScript_OrbitNPanjs } from "./OrbitNPanControlScript";
import { PanCamScript as PanCamScript_PanCamScriptjs } from "./PanCamScript";
import { PickAndRotateScript as PickAndRotateScript_PickAndRotateScriptjs } from "./PickAndRotateScript";
import { PolyBoundingScript as PolyBoundingScript_PolyBoundingScriptjs } from "./PolyBoundingScript";
import { RotationScript as RotationScript_RotationScriptjs } from "./RotationScript";
import { ScriptComponentHandler as ScriptComponentHandlerjs } from "./ScriptComponentHandler";
import { ScriptHandler as ScriptHandlerjs } from "./ScriptHandler";
import {     SparseHeightMapBoundingScript as SparseHeightMapBoundingScript_SparseHeightMapBoundingScriptjs, } from "./SparseHeightMapBoundingScript";
import { WasdControlScript as WasdControlScript_WasdControlScriptjs } from "./WasdControlScript";
import {     WorldFittedTerrainScript as WorldFittedTerrainScript_WorldFittedTerrainScriptjs, } from "./WorldFittedTerrainScript";
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