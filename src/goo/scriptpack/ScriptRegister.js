import { Scripts as Scripts_Scripts } from "../scripts/Scripts";
import {     OrbitCamControlScript as scriptsOrbitCamControlScript_OrbitCamControlScript, } from "../scripts/OrbitCamControlScript";
import { OrbitNPan as OrbitNPanControlScript_OrbitNPan } from "./OrbitNPanControlScript";
import { FlyControlScript as FlyControlScript_FlyControlScript } from "./FlyControlScript";
import {     AxisAlignedCamControlScript as AxisAlignedCamControlScript_AxisAlignedCamControlScript, } from "./AxisAlignedCamControlScript";
import { PanCamScript as PanCamScript_PanCamScript } from "./PanCamScript";
import { MouseLookControlScript as MouseLookControlScript_MouseLookControlScript } from "./MouseLookControlScript";
import { WasdControlScript as WasdControlScript_WasdControlScript } from "./WasdControlScript";
import { ButtonScript as ButtonScript_ButtonScript } from "./ButtonScript";
import { PickAndRotateScript as PickAndRotateScript_PickAndRotateScript } from "./PickAndRotateScript";
import { LensFlareScript as LensFlareScript_LensFlareScript } from "./LensFlareScript";

var scripts = {
	OrbitCamControlScript: scriptsOrbitCamControlScript_OrbitCamControlScript,
	OrbitNPanControlScript: OrbitNPanControlScript_OrbitNPan,
	FlyControlScript: FlyControlScript_FlyControlScript,
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_AxisAlignedCamControlScript,
	PanCamScript: PanCamScript_PanCamScript,
	MouseLookControlScript: MouseLookControlScript_MouseLookControlScript,
	WasdControlScript: WasdControlScript_WasdControlScript,
	ButtonScript: ButtonScript_ButtonScript,
	PickAndRotateScript: PickAndRotateScript_PickAndRotateScript,
	LensFlareScript: LensFlareScript_LensFlareScript
};

for (var key in scripts) {
	Scripts_Scripts.register(scripts[key]);
}
