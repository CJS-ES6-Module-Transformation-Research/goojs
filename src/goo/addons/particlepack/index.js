Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ParticleSystemComponent = require("./components/ParticleSystemComponent");

var _ParticleSystemComponent2 = _interopRequireDefault(_ParticleSystemComponent);

var _ConstantCurve = require("./curves/ConstantCurve");

var _ConstantCurve2 = _interopRequireDefault(_ConstantCurve);

var _Curve = require("./curves/Curve");

var _Curve2 = _interopRequireDefault(_Curve);

var _LerpCurve = require("./curves/LerpCurve");

var _LerpCurve2 = _interopRequireDefault(_LerpCurve);

var _LinearCurve = require("./curves/LinearCurve");

var _LinearCurve2 = _interopRequireDefault(_LinearCurve);

var _PolyCurve = require("./curves/PolyCurve");

var _PolyCurve2 = _interopRequireDefault(_PolyCurve);

var _Vector3Curve = require("./curves/Vector3Curve");

var _Vector3Curve2 = _interopRequireDefault(_Vector3Curve);

var _Vector4Curve = require("./curves/Vector4Curve");

var _Vector4Curve2 = _interopRequireDefault(_Vector4Curve);

var _ParticleSystemComponentHandler = require("./handlers/ParticleSystemComponentHandler");

var _ParticleSystemComponentHandler2 = _interopRequireDefault(_ParticleSystemComponentHandler);

var _ParticleData = require("./ParticleData");

var _ParticleData2 = _interopRequireDefault(_ParticleData);

var _ParticleDebugRenderSystem = require("./systems/ParticleDebugRenderSystem");

var _ParticleDebugRenderSystem2 = _interopRequireDefault(_ParticleDebugRenderSystem);

var _ParticleSystemSystem = require("./systems/ParticleSystemSystem");

var _ParticleSystemSystem2 = _interopRequireDefault(_ParticleSystemSystem);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	ParticleSystemComponent: _ParticleSystemComponent2.default,
	ConstantCurve: _ConstantCurve2.default,
	Curve: _Curve2.default,
	LerpCurve: _LerpCurve2.default,
	LinearCurve: _LinearCurve2.default,
	PolyCurve: _PolyCurve2.default,
	Vector3Curve: _Vector3Curve2.default,
	Vector4Curve: _Vector4Curve2.default,
	ParticleSystemComponentHandler: _ParticleSystemComponentHandler2.default,
	ParticleData: _ParticleData2.default,
	ParticleDebugRenderSystem: _ParticleDebugRenderSystem2.default,
	ParticleSystemSystem: _ParticleSystemSystem2.default
};
;

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
