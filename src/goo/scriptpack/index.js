Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AxisAlignedCamControlScript = require("./AxisAlignedCamControlScript");

var _AxisAlignedCamControlScript2 = _interopRequireDefault(_AxisAlignedCamControlScript);

var _BasicControlScript = require("./BasicControlScript");

var _BasicControlScript2 = _interopRequireDefault(_BasicControlScript);

var _ButtonScript = require("./ButtonScript");

var _ButtonScript2 = _interopRequireDefault(_ButtonScript);

var _CannonPickScript = require("./CannonPickScript");

var _CannonPickScript2 = _interopRequireDefault(_CannonPickScript);

var _FlyControlScript = require("./FlyControlScript");

var _FlyControlScript2 = _interopRequireDefault(_FlyControlScript);

var _GroundBoundMovementScript = require("./GroundBoundMovementScript");

var _GroundBoundMovementScript2 = _interopRequireDefault(_GroundBoundMovementScript);

var _HeightMapBoundingScript = require("./HeightMapBoundingScript");

var _HeightMapBoundingScript2 = _interopRequireDefault(_HeightMapBoundingScript);

var _LensFlareScript = require("./LensFlareScript");

var _LensFlareScript2 = _interopRequireDefault(_LensFlareScript);

var _MouseLookControlScript = require("./MouseLookControlScript");

var _MouseLookControlScript2 = _interopRequireDefault(_MouseLookControlScript);

var _OrbitNPanControlScript = require("./OrbitNPanControlScript");

var _OrbitNPanControlScript2 = _interopRequireDefault(_OrbitNPanControlScript);

var _PanCamScript = require("./PanCamScript");

var _PanCamScript2 = _interopRequireDefault(_PanCamScript);

var _PickAndRotateScript = require("./PickAndRotateScript");

var _PickAndRotateScript2 = _interopRequireDefault(_PickAndRotateScript);

var _PolyBoundingScript = require("./PolyBoundingScript");

var _PolyBoundingScript2 = _interopRequireDefault(_PolyBoundingScript);

var _RotationScript = require("./RotationScript");

var _RotationScript2 = _interopRequireDefault(_RotationScript);

var _ScriptComponentHandler = require("./ScriptComponentHandler");

var _ScriptComponentHandler2 = _interopRequireDefault(_ScriptComponentHandler);

var _ScriptHandler = require("./ScriptHandler");

var _ScriptHandler2 = _interopRequireDefault(_ScriptHandler);

var _ScriptHandlers = require("./ScriptHandlers");

var ScriptHandlers_moduleDefault = _interopRequireWildcard(_ScriptHandlers);

var _ScriptRegister = require("./ScriptRegister");

var ScriptRegister_moduleDefault = _interopRequireWildcard(_ScriptRegister);

var _SparseHeightMapBoundingScript = require("./SparseHeightMapBoundingScript");

var _SparseHeightMapBoundingScript2 = _interopRequireDefault(_SparseHeightMapBoundingScript);

var _WasdControlScript = require("./WasdControlScript");

var _WasdControlScript2 = _interopRequireDefault(_WasdControlScript);

var _WorldFittedTerrainScript = require("./WorldFittedTerrainScript");

var _WorldFittedTerrainScript2 = _interopRequireDefault(_WorldFittedTerrainScript);

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

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	AxisAlignedCamControlScript: _AxisAlignedCamControlScript2.default,
	BasicControlScript: _BasicControlScript2.default,
	ButtonScript: _ButtonScript2.default,
	CannonPickScript: _CannonPickScript2.default,
	FlyControlScript: _FlyControlScript2.default,
	GroundBoundMovementScript: _GroundBoundMovementScript2.default,
	HeightMapBoundingScript: _HeightMapBoundingScript2.default,
	LensFlareScript: _LensFlareScript2.default,
	MouseLookControlScript: _MouseLookControlScript2.default,
	OrbitNPanControlScript: _OrbitNPanControlScript2.default,
	PanCamScript: _PanCamScript2.default,
	PickAndRotateScript: _PickAndRotateScript2.default,
	PolyBoundingScript: _PolyBoundingScript2.default,
	RotationScript: _RotationScript2.default,
	ScriptComponentHandler: _ScriptComponentHandler2.default,
	ScriptHandler: _ScriptHandler2.default,
	ScriptHandlers: ScriptHandlers_moduleDefault,
	ScriptRegister: ScriptRegister_moduleDefault,
	SparseHeightMapBoundingScript: _SparseHeightMapBoundingScript2.default,
	WasdControlScript: _WasdControlScript2.default,
	WorldFittedTerrainScript: _WorldFittedTerrainScript2.default
};
;

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
