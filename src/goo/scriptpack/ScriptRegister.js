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
	OrbitCamControlScript: _OrbitCamControlScript.scripts,
	OrbitNPanControlScript: _OrbitNPanControlScript.scripts,
	FlyControlScript: _FlyControlScript.scripts,
	AxisAlignedCamControlScript: _AxisAlignedCamControlScript.scripts,
	PanCamScript: _PanCamScript.scripts,
	MouseLookControlScript: _MouseLookControlScript.scripts,
	WasdControlScript: _WasdControlScript.scripts,
	ButtonScript: _ButtonScript.scripts,
	PickAndRotateScript: _PickAndRotateScript.scripts,
	LensFlareScript: _LensFlareScript.scripts
};

for (var key in _OrbitCamControlScript.scripts) {
	_Scripts.Scripts.register(_OrbitCamControlScript.scripts[key]);
}
