import { BloomPass as BloomPassjs } from "./BloomPass";
import { BlurPass as BlurPassjs } from "./BlurPass";
import { DepthPass as DepthPassjs } from "./DepthPass";
import { DofPass as DofPassjs } from "./DofPass";
import { DogPass as DogPassjs } from "./DogPass";
import { MotionBlurPass as MotionBlurPassjs } from "./MotionBlurPass";
import { PassLibjs as PassLib_PassLibjsjs } from "./PassLib";
import { PosteffectsHandler as PosteffectsHandlerjs } from "./PosteffectsHandler";
import { ShaderLibExtra as ShaderLibExtrajs } from "./ShaderLibExtra";
import { SsaoPass as SsaoPassjs } from "./SsaoPass";
module.exports = {
	BloomPass: BloomPassjs,
	BlurPass: BlurPassjs,
	DepthPass: DepthPassjs,
	DofPass: DofPassjs,
	DogPass: DogPassjs,
	MotionBlurPass: MotionBlurPassjs,
	PassLib: PassLib_PassLibjsjs,
	PosteffectsHandler: PosteffectsHandlerjs,
	ShaderLibExtra: ShaderLibExtra_ShaderLibExtrajs,
	SsaoPass: SsaoPassjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}