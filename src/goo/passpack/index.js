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
	BloomPass: _BloomPass.BloomPassjs,
	BlurPass: _BlurPass.BlurPassjs,
	DepthPass: _DepthPass.DepthPassjs,
	DofPass: _DofPass.DofPassjs,
	DogPass: _DogPass.DogPassjs,
	MotionBlurPass: _MotionBlurPass.MotionBlurPassjs,
	PassLib: _PassLib.PassLib_obj,
	PosteffectsHandler: _PosteffectsHandler.PosteffectsHandlerjs,
	ShaderLibExtra: _ShaderLibExtra.ShaderLibExtrajs,
	SsaoPass: _SsaoPass.SsaoPassjs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
