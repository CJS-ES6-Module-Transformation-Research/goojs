Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BloomPass = require("./BloomPass");

var _BloomPass2 = _interopRequireDefault(_BloomPass);

var _BlurPass = require("./BlurPass");

var _BlurPass2 = _interopRequireDefault(_BlurPass);

var _DepthPass = require("./DepthPass");

var _DepthPass2 = _interopRequireDefault(_DepthPass);

var _DofPass = require("./DofPass");

var _DofPass2 = _interopRequireDefault(_DofPass);

var _DogPass = require("./DogPass");

var _DogPass2 = _interopRequireDefault(_DogPass);

var _MotionBlurPass = require("./MotionBlurPass");

var _MotionBlurPass2 = _interopRequireDefault(_MotionBlurPass);

var _PassLib = require("./PassLib");

var _PassLib2 = _interopRequireDefault(_PassLib);

var _PosteffectsHandler = require("./PosteffectsHandler");

var _PosteffectsHandler2 = _interopRequireDefault(_PosteffectsHandler);

var _ShaderLibExtra = require("./ShaderLibExtra");

var _ShaderLibExtra2 = _interopRequireDefault(_ShaderLibExtra);

var _SsaoPass = require("./SsaoPass");

var _SsaoPass2 = _interopRequireDefault(_SsaoPass);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	BloomPass: _BloomPass2.default,
	BlurPass: _BlurPass2.default,
	DepthPass: _DepthPass2.default,
	DofPass: _DofPass2.default,
	DogPass: _DogPass2.default,
	MotionBlurPass: _MotionBlurPass2.default,
	PassLib: _PassLib2.default,
	PosteffectsHandler: _PosteffectsHandler2.default,
	ShaderLibExtra: _ShaderLibExtra2.default,
	SsaoPass: _SsaoPass2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
