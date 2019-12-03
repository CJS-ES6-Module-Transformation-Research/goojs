import { AnimationClipHandler } from "../../animationpack/handlers/AnimationClipHandler";
import { AnimationComponentHandler } from "../../animationpack/handlers/AnimationComponentHandler";
import { AnimationLayersHandler } from "../../animationpack/handlers/AnimationLayersHandler";
import { AnimationStateHandler } from "../../animationpack/handlers/AnimationStateHandler";
import { SkeletonHandler } from "../../animationpack/handlers/SkeletonHandler";

let anonymus = {
	AnimationClipHandler: AnimationClipHandler,
	AnimationComponentHandler: AnimationComponentHandler,
	AnimationLayersHandler: AnimationLayersHandler,
	AnimationStateHandler: AnimationStateHandler,
	SkeletonHandler: SkeletonHandler
};

var exported_AnimationClipHandler = AnimationClipHandler;
var exported_AnimationComponentHandler = AnimationComponentHandler;
var exported_AnimationLayersHandler = AnimationLayersHandler;
var exported_AnimationStateHandler = AnimationStateHandler;
var exported_SkeletonHandler = SkeletonHandler;
export { exported_AnimationClipHandler as AnimationClipHandler, exported_AnimationComponentHandler as AnimationComponentHandler, exported_AnimationLayersHandler as AnimationLayersHandler, exported_AnimationStateHandler as AnimationStateHandler, exported_SkeletonHandler as SkeletonHandler };