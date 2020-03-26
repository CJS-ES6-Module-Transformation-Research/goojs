"use strict";

var _AxisAlignedCamControlScript = require("./AxisAlignedCamControlScript");

var _BasicControlScript = require("./BasicControlScript");

var _ButtonScript = require("./ButtonScript");

var _CannonPickScript = require("./CannonPickScript");

var _FlyControlScript = require("./FlyControlScript");

var _GroundBoundMovementScript = require("./GroundBoundMovementScript");

var _HeightMapBoundingScript = require("./HeightMapBoundingScript");

var _LensFlareScript = require("./LensFlareScript");

var _MouseLookControlScript = require("./MouseLookControlScript");

var _OrbitNPanControlScript = require("./OrbitNPanControlScript");

var _PanCamScript = require("./PanCamScript");

var _PickAndRotateScript = require("./PickAndRotateScript");

var _PolyBoundingScript = require("./PolyBoundingScript");

var _RotationScript = require("./RotationScript");

var _ScriptComponentHandler = require("./ScriptComponentHandler");

var _ScriptHandler = require("./ScriptHandler");

var _SparseHeightMapBoundingScript = require("./SparseHeightMapBoundingScript");

var _WasdControlScript = require("./WasdControlScript");

var _WorldFittedTerrainScript = require("./WorldFittedTerrainScript");

var indexjs;
indexjs = {
	AxisAlignedCamControlScript: _AxisAlignedCamControlScript.AxisAlignedCamControlScriptjs,
	BasicControlScript: _BasicControlScript.BasicControlScriptjs,
	ButtonScript: _ButtonScript.ButtonScriptjs,
	CannonPickScript: _CannonPickScript.CannonPickScriptjs,
	FlyControlScript: _FlyControlScript.FlyControlScriptjs,
	GroundBoundMovementScript: _GroundBoundMovementScript.GroundBoundMovementScriptjs,
	HeightMapBoundingScript: _HeightMapBoundingScript.HeightMapBoundingScriptjs,
	LensFlareScript: _LensFlareScript.LensFlareScriptjs,
	MouseLookControlScript: _MouseLookControlScript.MouseLookControlScriptjs,
	OrbitNPanControlScript: _OrbitNPanControlScript.OrbitNPanControlScriptjs,
	PanCamScript: _PanCamScript.PanCamScriptjs,
	PickAndRotateScript: _PickAndRotateScript.PickAndRotateScriptjs,
	PolyBoundingScript: _PolyBoundingScript.PolyBoundingScriptjs,
	RotationScript: _RotationScript.RotationScriptjs,
	ScriptComponentHandler: _ScriptComponentHandler.ScriptComponentHandlerjs,
	ScriptHandler: _ScriptHandler.ScriptHandlerjs,
	ScriptHandlers: {},
	ScriptRegister: {},
	SparseHeightMapBoundingScript: _SparseHeightMapBoundingScript.SparseHeightMapBoundingScriptjs,
	WasdControlScript: _WasdControlScript.WasdControlScriptjs,
	WorldFittedTerrainScript: _WorldFittedTerrainScript.WorldFittedTerrainScriptjs
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
