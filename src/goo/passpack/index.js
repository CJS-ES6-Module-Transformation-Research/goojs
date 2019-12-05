import { BloomPass } from "./BloomPass";
import { BlurPass } from "./BlurPass";
import { DepthPass } from "./DepthPass";
import { DofPass } from "./DofPass";
import { DogPass } from "./DogPass";
import { MotionBlurPass } from "./MotionBlurPass";
import * as PassLib from "./PassLib";
import { PosteffectsHandler } from "./PosteffectsHandler";
import * as ShaderLibExtra from "./ShaderLibExtra";
import { SsaoPass } from "./SsaoPass";
module.exports = {
	BloomPass: BloomPass,
	BlurPass: BlurPass,
	DepthPass: DepthPass,
	DofPass: DofPass,
	DogPass: DogPass,
	MotionBlurPass: MotionBlurPass,
	PassLib: PassLib,
	PosteffectsHandler: PosteffectsHandler,
	ShaderLibExtra: ShaderLibExtra,
	SsaoPass: SsaoPass
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}