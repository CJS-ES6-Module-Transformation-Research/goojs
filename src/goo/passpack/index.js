import { BloomPassjs as BloomPass_BloomPassjs } from "./BloomPass";
import { BlurPassjs as BlurPass_BlurPassjs } from "./BlurPass";
import { DepthPassjs as DepthPass_DepthPassjs } from "./DepthPass";
import { DofPassjs as DofPass_DofPassjs } from "./DofPass";
import { DogPassjs as DogPass_DogPassjs } from "./DogPass";
import { MotionBlurPassjs as MotionBlurPass_MotionBlurPassjs } from "./MotionBlurPass";
import { PassLib_obj } from "./PassLib";
import { PosteffectsHandlerjs as PosteffectsHandler_PosteffectsHandlerjs } from "./PosteffectsHandler";
import { ShaderLibExtrajs as ShaderLibExtra_ShaderLibExtrajs } from "./ShaderLibExtra";
import { SsaoPassjs as SsaoPass_SsaoPassjs } from "./SsaoPass";
var indexjs;
indexjs = {
	BloomPass: BloomPass_BloomPassjs,
	BlurPass: BlurPass_BlurPassjs,
	DepthPass: DepthPass_DepthPassjs,
	DofPass: DofPass_DofPassjs,
	DogPass: DogPass_DogPassjs,
	MotionBlurPass: MotionBlurPass_MotionBlurPassjs,
	PassLib: PassLib_obj,
	PosteffectsHandler: PosteffectsHandler_PosteffectsHandlerjs,
	ShaderLibExtra: ShaderLibExtra_ShaderLibExtrajs,
	SsaoPass: SsaoPass_SsaoPassjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}