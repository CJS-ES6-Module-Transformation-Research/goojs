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

module.exports = {
	AxisAlignedCamControlScript: _AxisAlignedCamControlScript.AxisAlignedCamControlScript,
	BasicControlScript: _BasicControlScript.BasicControlScript,
	ButtonScript: _ButtonScript.ButtonScript,
	CannonPickScript: _CannonPickScript.CannonPickScript,
	FlyControlScript: _FlyControlScript.FlyControlScript,
	GroundBoundMovementScript: _GroundBoundMovementScript.GroundBoundMovementScript,
	HeightMapBoundingScript: _HeightMapBoundingScript.HeightMapBoundingScript,
	LensFlareScript: _LensFlareScript.LensFlareScript,
	MouseLookControlScript: _MouseLookControlScript.MouseLookControlScript,
	OrbitNPanControlScript: _OrbitNPanControlScript.OrbitNPan,
	PanCamScript: _PanCamScript.PanCamScript,
	PickAndRotateScript: _PickAndRotateScript.PickAndRotateScript,
	PolyBoundingScript: _PolyBoundingScript.PolyBoundingScript,
	RotationScript: _RotationScript.RotationScript,
	ScriptComponentHandler: _ScriptComponentHandler.ScriptComponentHandler,
	ScriptHandler: _ScriptHandler.ScriptHandler,
	ScriptHandlers: {},
	ScriptRegister: {},
	SparseHeightMapBoundingScript: _SparseHeightMapBoundingScript.SparseHeightMapBoundingScript,
	WasdControlScript: _WasdControlScript.WasdControlScript,
	WorldFittedTerrainScript: _WorldFittedTerrainScript.WorldFittedTerrainScript
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
