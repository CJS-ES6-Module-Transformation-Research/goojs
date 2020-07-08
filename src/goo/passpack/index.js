import { BloomPass as BloomPass_BloomPass } from "./BloomPass";
import { BlurPass as BlurPass_BlurPass } from "./BlurPass";
import { DepthPass as DepthPass_DepthPass } from "./DepthPass";
import { DofPass as DofPass_DofPass } from "./DofPass";
import { DogPass as DogPass_DogPass } from "./DogPass";
import { MotionBlurPass as MotionBlurPass_MotionBlurPass } from "./MotionBlurPass";
import * as PassLib_PassLibjs from "./PassLib";
import { PosteffectsHandler as PosteffectsHandler_PosteffectsHandler } from "./PosteffectsHandler";
import * as ShaderLibExtra_ShaderLibExtra from "./ShaderLibExtra";
import { SsaoPass as SsaoPass_SsaoPass } from "./SsaoPass";
var indexjs;
indexjs = {
	BloomPass: BloomPass_BloomPass,
	BlurPass: BlurPass_BlurPass,
	DepthPass: DepthPass_DepthPass,
	DofPass: DofPass_DofPass,
	DogPass: DogPass_DogPass,
	MotionBlurPass: MotionBlurPass_MotionBlurPass,
	PassLib: PassLib_PassLibjs,
	PosteffectsHandler: PosteffectsHandler_PosteffectsHandler,
	ShaderLibExtra: ShaderLibExtra_ShaderLibExtra,
	SsaoPass: SsaoPass_SsaoPass
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}