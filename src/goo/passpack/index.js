"use strict";

var _BloomPass = require("./BloomPass");

var _BlurPass = require("./BlurPass");

var _DepthPass = require("./DepthPass");

var _DofPass = require("./DofPass");

var _DogPass = require("./DogPass");

var _MotionBlurPass = require("./MotionBlurPass");

var _PassLib = require("./PassLib");

var _PosteffectsHandler = require("./PosteffectsHandler");

var _ShaderLibExtra = require("./ShaderLibExtra");

var _SsaoPass = require("./SsaoPass");

var indexjs;
indexjs = {
	BloomPass: _BloomPass.BloomPass,
	BlurPass: _BlurPass.BlurPass,
	DepthPass: _DepthPass.DepthPass,
	DofPass: _DofPass.DofPass,
	DogPass: _DogPass.DogPass,
	MotionBlurPass: _MotionBlurPass.MotionBlurPass,
	PassLib: _PassLib.PassLibjs,
	PosteffectsHandler: _PosteffectsHandler.PosteffectsHandler,
	ShaderLibExtra: _ShaderLibExtra.ShaderLibExtra,
	SsaoPass: _SsaoPass.SsaoPass
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}