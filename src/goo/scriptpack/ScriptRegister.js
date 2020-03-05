"use strict";

var _Scripts = require("../scripts/Scripts");

var _OrbitCamControlScript = require("../scripts/OrbitCamControlScript");

var _PanCamScript = require("./PanCamScript");

var _MouseLookControlScript = require("./MouseLookControlScript");

var _WasdControlScript = require("./WasdControlScript");

var scripts = {
	OrbitCamControlScript: _OrbitCamControlScript.OrbitCamControlScript,
	OrbitNPanControlScript: OrbitNPanControlScript_OrbitNPanjs,
	FlyControlScript: FlyControlScript_FlyControlScriptjs,
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_AxisAlignedCamControlScriptjs,
	PanCamScript: _PanCamScript.PanCamScript,
	MouseLookControlScript: _MouseLookControlScript.MouseLookControlScript,
	WasdControlScript: _WasdControlScript.WasdControlScript,
	ButtonScript: ButtonScript_ButtonScriptjs,
	PickAndRotateScript: PickAndRotateScript_PickAndRotateScriptjs,
	LensFlareScript: LensFlareScript_LensFlareScriptjs
};

for (var key in scripts) {
	(0, _Scripts.register)(scripts[key]);
}
