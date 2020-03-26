import { Scripts as scriptsScripts_Scriptsjs } from "../scripts/Scripts";
import { scripts as scriptsOrbitCamControlScript_scripts } from "../scripts/OrbitCamControlScript";
import { scripts as OrbitNPanControlScript_scripts } from "./OrbitNPanControlScript";
import { scripts as FlyControlScript_scripts } from "./FlyControlScript";
import { scripts as AxisAlignedCamControlScript_scripts } from "./AxisAlignedCamControlScript";
import { scripts as PanCamScript_scripts } from "./PanCamScript";
import { scripts as MouseLookControlScript_scripts } from "./MouseLookControlScript";
import { scripts as WasdControlScript_scripts } from "./WasdControlScript";
import { scripts as ButtonScript_scripts } from "./ButtonScript";
import { scripts as PickAndRotateScript_scripts } from "./PickAndRotateScript";
import { scripts as LensFlareScript_scripts } from "./LensFlareScript";

var scripts = {
	OrbitCamControlScript: scriptsOrbitCamControlScript_scripts,
	OrbitNPanControlScript: OrbitNPanControlScript_scripts,
	FlyControlScript: FlyControlScript_scripts,
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_scripts,
	PanCamScript: PanCamScript_scripts,
	MouseLookControlScript: MouseLookControlScript_scripts,
	WasdControlScript: WasdControlScript_scripts,
	ButtonScript: ButtonScript_scripts,
	PickAndRotateScript: PickAndRotateScript_scripts,
	LensFlareScript: LensFlareScript_scripts
};

for (var key in scriptsOrbitCamControlScript_scripts) {
	scriptsScripts_Scriptsjs.register(scriptsOrbitCamControlScript_scripts[key]);
}
