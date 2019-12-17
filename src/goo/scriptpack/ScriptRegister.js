var _Scripts = require("../scripts/Scripts");

var Scripts = _interopRequireWildcard(_Scripts);

var _OrbitCamControlScript = require("../scripts/OrbitCamControlScript");

var _OrbitNPanControlScript = require("./OrbitNPanControlScript");

var OrbitNPanControlScript = _interopRequireWildcard(_OrbitNPanControlScript);

var _FlyControlScript = require("./FlyControlScript");

var FlyControlScript = _interopRequireWildcard(_FlyControlScript);

var _AxisAlignedCamControlScript = require("./AxisAlignedCamControlScript");

var AxisAlignedCamControlScript = _interopRequireWildcard(_AxisAlignedCamControlScript);

var _PanCamScript = require("./PanCamScript");

var PanCamScript = _interopRequireWildcard(_PanCamScript);

var _MouseLookControlScript = require("./MouseLookControlScript");

var MouseLookControlScript = _interopRequireWildcard(_MouseLookControlScript);

var _WasdControlScript = require("./WasdControlScript");

var WasdControlScript = _interopRequireWildcard(_WasdControlScript);

var _ButtonScript = require("./ButtonScript");

var ButtonScript = _interopRequireWildcard(_ButtonScript);

var _PickAndRotateScript = require("./PickAndRotateScript");

var PickAndRotateScript = _interopRequireWildcard(_PickAndRotateScript);

var _LensFlareScript = require("./LensFlareScript");

var LensFlareScript = _interopRequireWildcard(_LensFlareScript);

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

var scripts = {
	OrbitCamControlScript: _OrbitCamControlScript.OrbitCamControlScript,
	OrbitNPanControlScript: OrbitNPanControlScript,
	FlyControlScript: FlyControlScript,
	AxisAlignedCamControlScript: AxisAlignedCamControlScript,
	PanCamScript: PanCamScript,
	MouseLookControlScript: MouseLookControlScript,
	WasdControlScript: WasdControlScript,
	ButtonScript: ButtonScript,
	PickAndRotateScript: PickAndRotateScript,
	LensFlareScript: LensFlareScript
};

for (var key in scripts) {
	Scripts.register(scripts[key]);
}
