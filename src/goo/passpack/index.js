import BloomPass_moduleDefault from "./BloomPass";
import BlurPass_moduleDefault from "./BlurPass";
import DepthPass_moduleDefault from "./DepthPass";
import DofPass_moduleDefault from "./DofPass";
import DogPass_moduleDefault from "./DogPass";
import MotionBlurPass_moduleDefault from "./MotionBlurPass";
import PassLib_moduleDefault from "./PassLib";
import PosteffectsHandler_moduleDefault from "./PosteffectsHandler";
import ShaderLibExtra_moduleDefault from "./ShaderLibExtra";
import SsaoPass_moduleDefault from "./SsaoPass";
export default {
	BloomPass: BloomPass_moduleDefault,
	BlurPass: BlurPass_moduleDefault,
	DepthPass: DepthPass_moduleDefault,
	DofPass: DofPass_moduleDefault,
	DogPass: DogPass_moduleDefault,
	MotionBlurPass: MotionBlurPass_moduleDefault,
	PassLib: PassLib_moduleDefault,
	PosteffectsHandler: PosteffectsHandler_moduleDefault,
	ShaderLibExtra: ShaderLibExtra_moduleDefault,
	SsaoPass: SsaoPass_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}