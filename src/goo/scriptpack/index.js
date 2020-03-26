import {     AxisAlignedCamControlScriptjs as AxisAlignedCamControlScript_AxisAlignedCamControlScriptjs, } from "./AxisAlignedCamControlScript";
import { BasicControlScriptjs as BasicControlScript_BasicControlScriptjs } from "./BasicControlScript";
import { ButtonScriptjs as ButtonScript_ButtonScriptjs } from "./ButtonScript";
import { CannonPickScriptjs as CannonPickScript_CannonPickScriptjs } from "./CannonPickScript";
import { FlyControlScriptjs as FlyControlScript_FlyControlScriptjs } from "./FlyControlScript";
import {     GroundBoundMovementScriptjs as GroundBoundMovementScript_GroundBoundMovementScriptjs, } from "./GroundBoundMovementScript";
import {     HeightMapBoundingScriptjs as HeightMapBoundingScript_HeightMapBoundingScriptjs, } from "./HeightMapBoundingScript";
import { LensFlareScriptjs as LensFlareScript_LensFlareScriptjs } from "./LensFlareScript";
import {     MouseLookControlScriptjs as MouseLookControlScript_MouseLookControlScriptjs, } from "./MouseLookControlScript";
import {     OrbitNPanControlScriptjs as OrbitNPanControlScript_OrbitNPanControlScriptjs, } from "./OrbitNPanControlScript";
import { PanCamScriptjs as PanCamScript_PanCamScriptjs } from "./PanCamScript";
import { PickAndRotateScriptjs as PickAndRotateScript_PickAndRotateScriptjs } from "./PickAndRotateScript";
import { PolyBoundingScriptjs as PolyBoundingScript_PolyBoundingScriptjs } from "./PolyBoundingScript";
import { RotationScriptjs as RotationScript_RotationScriptjs } from "./RotationScript";
import {     ScriptComponentHandlerjs as ScriptComponentHandler_ScriptComponentHandlerjs, } from "./ScriptComponentHandler";
import { ScriptHandlerjs as ScriptHandler_ScriptHandlerjs } from "./ScriptHandler";
import {     SparseHeightMapBoundingScriptjs as SparseHeightMapBoundingScript_SparseHeightMapBoundingScriptjs, } from "./SparseHeightMapBoundingScript";
import { WasdControlScriptjs as WasdControlScript_WasdControlScriptjs } from "./WasdControlScript";
import {     WorldFittedTerrainScriptjs as WorldFittedTerrainScript_WorldFittedTerrainScriptjs, } from "./WorldFittedTerrainScript";
var indexjs;
indexjs = {
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_AxisAlignedCamControlScriptjs,
	BasicControlScript: BasicControlScript_BasicControlScriptjs,
	ButtonScript: ButtonScript_ButtonScriptjs,
	CannonPickScript: CannonPickScript_CannonPickScriptjs,
	FlyControlScript: FlyControlScript_FlyControlScriptjs,
	GroundBoundMovementScript: GroundBoundMovementScript_GroundBoundMovementScriptjs,
	HeightMapBoundingScript: HeightMapBoundingScript_HeightMapBoundingScriptjs,
	LensFlareScript: LensFlareScript_LensFlareScriptjs,
	MouseLookControlScript: MouseLookControlScript_MouseLookControlScriptjs,
	OrbitNPanControlScript: OrbitNPanControlScript_OrbitNPanControlScriptjs,
	PanCamScript: PanCamScript_PanCamScriptjs,
	PickAndRotateScript: PickAndRotateScript_PickAndRotateScriptjs,
	PolyBoundingScript: PolyBoundingScript_PolyBoundingScriptjs,
	RotationScript: RotationScript_RotationScriptjs,
	ScriptComponentHandler: ScriptComponentHandler_ScriptComponentHandlerjs,
	ScriptHandler: ScriptHandler_ScriptHandlerjs,
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