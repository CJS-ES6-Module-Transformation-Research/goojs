import {     AxisAlignedCamControlScript as AxisAlignedCamControlScript_AxisAlignedCamControlScript, } from "./AxisAlignedCamControlScript";
import { BasicControlScript as BasicControlScript_BasicControlScript } from "./BasicControlScript";
import { ButtonScript as ButtonScript_ButtonScript } from "./ButtonScript";
import * as CannonPickScript_CannonPickScript from "./CannonPickScript";
import { FlyControlScript as FlyControlScript_FlyControlScript } from "./FlyControlScript";
import {     GroundBoundMovementScript as GroundBoundMovementScript_GroundBoundMovementScript, } from "./GroundBoundMovementScript";
import { HeightMapBoundingScript as HeightMapBoundingScript_HeightMapBoundingScript } from "./HeightMapBoundingScript";
import { LensFlareScript as LensFlareScript_LensFlareScript } from "./LensFlareScript";
import { MouseLookControlScript as MouseLookControlScript_MouseLookControlScript } from "./MouseLookControlScript";
import { OrbitNPan as OrbitNPanControlScript_OrbitNPan } from "./OrbitNPanControlScript";
import { PanCamScript as PanCamScript_PanCamScript } from "./PanCamScript";
import { PickAndRotateScript as PickAndRotateScript_PickAndRotateScript } from "./PickAndRotateScript";
import { PolyBoundingScript as PolyBoundingScript_PolyBoundingScript } from "./PolyBoundingScript";
import * as RotationScript_RotationScript from "./RotationScript";
import { ScriptComponentHandler as ScriptComponentHandler_ScriptComponentHandler } from "./ScriptComponentHandler";
import { ScriptHandler as ScriptHandler_ScriptHandler } from "./ScriptHandler";
import {     SparseHeightMapBoundingScript as SparseHeightMapBoundingScript_SparseHeightMapBoundingScript, } from "./SparseHeightMapBoundingScript";
import { WasdControlScript as WasdControlScript_WasdControlScript } from "./WasdControlScript";
import {     WorldFittedTerrainScript as WorldFittedTerrainScript_WorldFittedTerrainScript, } from "./WorldFittedTerrainScript";
var indexjs;
indexjs = {
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_AxisAlignedCamControlScript,
	BasicControlScript: BasicControlScript_BasicControlScript,
	ButtonScript: ButtonScript_ButtonScript,
	CannonPickScript: CannonPickScript_CannonPickScript,
	FlyControlScript: FlyControlScript_FlyControlScript,
	GroundBoundMovementScript: GroundBoundMovementScript_GroundBoundMovementScript,
	HeightMapBoundingScript: HeightMapBoundingScript_HeightMapBoundingScript,
	LensFlareScript: LensFlareScript_LensFlareScript,
	MouseLookControlScript: MouseLookControlScript_MouseLookControlScript,
	OrbitNPanControlScript: OrbitNPanControlScript_OrbitNPan,
	PanCamScript: PanCamScript_PanCamScript,
	PickAndRotateScript: PickAndRotateScript_PickAndRotateScript,
	PolyBoundingScript: PolyBoundingScript_PolyBoundingScript,
	RotationScript: RotationScript_RotationScript,
	ScriptComponentHandler: ScriptComponentHandler_ScriptComponentHandler,
	ScriptHandler: ScriptHandler_ScriptHandler,
	ScriptHandlers: {},
	ScriptRegister: {},
	SparseHeightMapBoundingScript: SparseHeightMapBoundingScript_SparseHeightMapBoundingScript,
	WasdControlScript: WasdControlScript_WasdControlScript,
	WorldFittedTerrainScript: WorldFittedTerrainScript_WorldFittedTerrainScript
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}