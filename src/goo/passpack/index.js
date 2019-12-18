var _BloomPass = require("./BloomPass");

var _BlurPass = require("./BlurPass");

var _DepthPass = require("./DepthPass");

var _DofPass = require("./DofPass");

var _DogPass = require("./DogPass");

var _MotionBlurPass = require("./MotionBlurPass");

var _PassLib = require("./PassLib");

var _PosteffectsHandler = require("./PosteffectsHandler");

var _ShaderLibExtra = require("./ShaderLibExtra");

var ShaderLibExtra = _interopRequireWildcard(_ShaderLibExtra);

var _SsaoPass = require("./SsaoPass");

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
	BloomPass: _BloomPass.BloomPass,
	BlurPass: _BlurPass.BlurPass,
	DepthPass: _DepthPass.DepthPass,
	DofPass: _DofPass.DofPass,
	DogPass: _DogPass.DogPass,
	MotionBlurPass: _MotionBlurPass.MotionBlurPass,
	PassLib: _PassLib.anonymus,
	PosteffectsHandler: _PosteffectsHandler.PosteffectsHandler,
	ShaderLibExtra: ShaderLibExtra,
	SsaoPass: _SsaoPass.SsaoPass
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
