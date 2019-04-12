Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.scripts = exports.Scripts = undefined;

var _Scripts = require("../scripts/Scripts");

var _Scripts2 = _interopRequireDefault(_Scripts);

var _OrbitCamControlScript = require("../scripts/OrbitCamControlScript");

var _OrbitCamControlScript2 = _interopRequireDefault(_OrbitCamControlScript);

var _OrbitNPanControlScript = require("./OrbitNPanControlScript");

var _OrbitNPanControlScript2 = _interopRequireDefault(_OrbitNPanControlScript);

var _FlyControlScript = require("./FlyControlScript");

var _FlyControlScript2 = _interopRequireDefault(_FlyControlScript);

var _AxisAlignedCamControlScript = require("./AxisAlignedCamControlScript");

var _AxisAlignedCamControlScript2 = _interopRequireDefault(_AxisAlignedCamControlScript);

var _PanCamScript = require("./PanCamScript");

var _PanCamScript2 = _interopRequireDefault(_PanCamScript);

var _MouseLookControlScript = require("./MouseLookControlScript");

var _MouseLookControlScript2 = _interopRequireDefault(_MouseLookControlScript);

var _WasdControlScript = require("./WasdControlScript");

var _WasdControlScript2 = _interopRequireDefault(_WasdControlScript);

var _ButtonScript = require("./ButtonScript");

var _ButtonScript2 = _interopRequireDefault(_ButtonScript);

var _PickAndRotateScript = require("./PickAndRotateScript");

var _PickAndRotateScript2 = _interopRequireDefault(_PickAndRotateScript);

var _LensFlareScript = require("./LensFlareScript");

var _LensFlareScript2 = _interopRequireDefault(_LensFlareScript);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.Scripts = _Scripts2.default;
var scripts = exports.scripts = {
	OrbitCamControlScript: _OrbitCamControlScript2.default,
	OrbitNPanControlScript: _OrbitNPanControlScript2.default,
	FlyControlScript: _FlyControlScript2.default,
	AxisAlignedCamControlScript: _AxisAlignedCamControlScript2.default,
	PanCamScript: _PanCamScript2.default,
	MouseLookControlScript: _MouseLookControlScript2.default,
	WasdControlScript: _WasdControlScript2.default,
	ButtonScript: _ButtonScript2.default,
	PickAndRotateScript: _PickAndRotateScript2.default,
	LensFlareScript: _LensFlareScript2.default
};

for (var key in scripts) {
	_Scripts2.default.register(scripts[key]);
}
