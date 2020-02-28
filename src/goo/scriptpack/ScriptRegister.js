var _Scripts = require("../scripts/Scripts");

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
	(0, _Scripts.register)(scripts[key]);
}
