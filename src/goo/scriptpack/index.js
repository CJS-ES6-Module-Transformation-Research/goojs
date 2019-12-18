var _AxisAlignedCamControlScript = require("./AxisAlignedCamControlScript");

var AxisAlignedCamControlScript = _interopRequireWildcard(_AxisAlignedCamControlScript);

var _BasicControlScript = require("./BasicControlScript");

var _ButtonScript = require("./ButtonScript");

var ButtonScript = _interopRequireWildcard(_ButtonScript);

var _CannonPickScript = require("./CannonPickScript");

var CannonPickScript = _interopRequireWildcard(_CannonPickScript);

var _FlyControlScript = require("./FlyControlScript");

var FlyControlScript = _interopRequireWildcard(_FlyControlScript);

var _GroundBoundMovementScript = require("./GroundBoundMovementScript");

var _HeightMapBoundingScript = require("./HeightMapBoundingScript");

var _LensFlareScript = require("./LensFlareScript");

var LensFlareScript = _interopRequireWildcard(_LensFlareScript);

var _MouseLookControlScript = require("./MouseLookControlScript");

var MouseLookControlScript = _interopRequireWildcard(_MouseLookControlScript);

var _OrbitNPanControlScript = require("./OrbitNPanControlScript");

var OrbitNPanControlScript = _interopRequireWildcard(_OrbitNPanControlScript);

var _PanCamScript = require("./PanCamScript");

var PanCamScript = _interopRequireWildcard(_PanCamScript);

var _PickAndRotateScript = require("./PickAndRotateScript");

var PickAndRotateScript = _interopRequireWildcard(_PickAndRotateScript);

var _PolyBoundingScript = require("./PolyBoundingScript");

var _RotationScript = require("./RotationScript");

var RotationScript = _interopRequireWildcard(_RotationScript);

var _ScriptComponentHandler = require("./ScriptComponentHandler");

var _ScriptHandler = require("./ScriptHandler");

var _ScriptHandlers = require("./ScriptHandlers");

var ScriptHandlers = _interopRequireWildcard(_ScriptHandlers);

var _ScriptRegister = require("./ScriptRegister");

var ScriptRegister = _interopRequireWildcard(_ScriptRegister);

var _SparseHeightMapBoundingScript = require("./SparseHeightMapBoundingScript");

var _WasdControlScript = require("./WasdControlScript");

var WasdControlScript = _interopRequireWildcard(_WasdControlScript);

var _WorldFittedTerrainScript = require("./WorldFittedTerrainScript");

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

module.exports = {
	AxisAlignedCamControlScript: AxisAlignedCamControlScript,
	BasicControlScript: _BasicControlScript.BasicControlScript,
	ButtonScript: ButtonScript,
	CannonPickScript: CannonPickScript,
	FlyControlScript: FlyControlScript,
	GroundBoundMovementScript: _GroundBoundMovementScript.GroundBoundMovementScript,
	HeightMapBoundingScript: _HeightMapBoundingScript.HeightMapBoundingScript,
	LensFlareScript: LensFlareScript,
	MouseLookControlScript: MouseLookControlScript,
	OrbitNPanControlScript: OrbitNPanControlScript,
	PanCamScript: PanCamScript,
	PickAndRotateScript: PickAndRotateScript,
	PolyBoundingScript: _PolyBoundingScript.PolyBoundingScript,
	RotationScript: RotationScript,
	ScriptComponentHandler: _ScriptComponentHandler.ScriptComponentHandler,
	ScriptHandler: _ScriptHandler.ScriptHandler,
	ScriptHandlers: ScriptHandlers,
	ScriptRegister: ScriptRegister,
	SparseHeightMapBoundingScript: _SparseHeightMapBoundingScript.SparseHeightMapBoundingScript,
	WasdControlScript: WasdControlScript,
	WorldFittedTerrainScript: _WorldFittedTerrainScript.WorldFittedTerrainScript
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
