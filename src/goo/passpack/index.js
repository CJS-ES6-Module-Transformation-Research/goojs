import { BloomPass as BloomPass_BloomPassjs } from "./BloomPass";
import { BlurPass as BlurPass_BlurPassjs } from "./BlurPass";
import { DepthPass as DepthPass_DepthPassjs } from "./DepthPass";
import { DofPass as DofPass_DofPassjs } from "./DofPass";
import { DogPass as DogPass_DogPassjs } from "./DogPass";
import { MotionBlurPass as MotionBlurPass_MotionBlurPassjs } from "./MotionBlurPass";
import { PassLibjs as PassLib_PassLibjsjs } from "./PassLib";
import { PosteffectsHandler as PosteffectsHandler_PosteffectsHandlerjs } from "./PosteffectsHandler";
import { ShaderLibExtra as ShaderLibExtra_ShaderLibExtrajs } from "./ShaderLibExtra";
import { SsaoPass as SsaoPass_SsaoPassjs } from "./SsaoPass";
module.exports = {
	BloomPass: BloomPass_BloomPassjs,
	BlurPass: BlurPass_BlurPassjs,
	DepthPass: DepthPass_DepthPassjs,
	DofPass: DofPass_DofPassjs,
	DogPass: DogPass_DogPassjs,
	MotionBlurPass: MotionBlurPass_MotionBlurPassjs,
	PassLib: PassLib_PassLibjsjs,
	PosteffectsHandler: PosteffectsHandler_PosteffectsHandlerjs,
	ShaderLibExtra: ShaderLibExtra_ShaderLibExtrajs,
	SsaoPass: SsaoPass_SsaoPassjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}