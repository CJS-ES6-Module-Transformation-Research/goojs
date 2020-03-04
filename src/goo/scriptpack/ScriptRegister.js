import { register as Scriptsjs_register } from "../scripts/Scripts";
import { OrbitCamControlScript as OrbitCamControlScriptjs } from "../scripts/OrbitCamControlScript";
import { PanCamScript as PanCamScriptjs } from "./PanCamScript";
import { MouseLookControlScript as MouseLookControlScriptjs } from "./MouseLookControlScript";
import { WasdControlScript as WasdControlScriptjs } from "./WasdControlScript";

var scripts = {
	OrbitCamControlScript: OrbitCamControlScript_OrbitCamControlScriptjs,
	OrbitNPanControlScript: OrbitNPanControlScript_OrbitNPanjs,
	FlyControlScript: FlyControlScript_FlyControlScriptjs,
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_AxisAlignedCamControlScriptjs,
	PanCamScript: PanCamScript_PanCamScriptjs,
	MouseLookControlScript: MouseLookControlScript_MouseLookControlScriptjs,
	WasdControlScript: WasdControlScript_WasdControlScriptjs,
	ButtonScript: ButtonScript_ButtonScriptjs,
	PickAndRotateScript: PickAndRotateScript_PickAndRotateScriptjs,
	LensFlareScript: LensFlareScript_LensFlareScriptjs
};

for (var key in scripts) {
	Scriptsjs_register(scripts[key]);
}
