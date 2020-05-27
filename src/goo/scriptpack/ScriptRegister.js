"use strict";

var _Scripts = require("../scripts/Scripts");

var _OrbitCamControlScript = require("../scripts/OrbitCamControlScript");

var _OrbitNPanControlScript = require("./OrbitNPanControlScript");

var _FlyControlScript = require("./FlyControlScript");

var _AxisAlignedCamControlScript = require("./AxisAlignedCamControlScript");

var _PanCamScript = require("./PanCamScript");

var _MouseLookControlScript = require("./MouseLookControlScript");

var _WasdControlScript = require("./WasdControlScript");

var _ButtonScript = require("./ButtonScript");

var _PickAndRotateScript = require("./PickAndRotateScript");

var _LensFlareScript = require("./LensFlareScript");

var scripts = {
	OrbitCamControlScript: _OrbitCamControlScript.OrbitCamControlScript,
	OrbitNPanControlScript: _OrbitNPanControlScript.OrbitNPan,
	FlyControlScript: _FlyControlScript.FlyControlScript,
	AxisAlignedCamControlScript: _AxisAlignedCamControlScript.AxisAlignedCamControlScript,
	PanCamScript: _PanCamScript.PanCamScript,
	MouseLookControlScript: _MouseLookControlScript.MouseLookControlScript,
	WasdControlScript: _WasdControlScript.WasdControlScript,
	ButtonScript: _ButtonScript.ButtonScript,
	PickAndRotateScript: _PickAndRotateScript.PickAndRotateScript,
	LensFlareScript: _LensFlareScript.LensFlareScript
};

for (var key in _OrbitCamControlScript.OrbitCamControlScript) {
	_Scripts.Scripts.register(_OrbitCamControlScript.OrbitCamControlScript[key]);
}