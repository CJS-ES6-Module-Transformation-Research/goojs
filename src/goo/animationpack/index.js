import { Source } from "./blendtree/Source";
import { BinaryLerpSource } from "./blendtree/BinaryLerpSource";
import { ClipSource } from "./blendtree/ClipSource";
import { FrozenClipSource } from "./blendtree/FrozenClipSource";
import { ManagedTransformSource } from "./blendtree/ManagedTransformSource";
import { AbstractAnimationChannel } from "./clip/AbstractAnimationChannel";
import { AnimationClip } from "./clip/AnimationClip";
import { AnimationClipInstance } from "./clip/AnimationClipInstance";
import { InterpolatedFloatChannel } from "./clip/InterpolatedFloatChannel";
import { JointChannel } from "./clip/JointChannel";
import { JointData } from "./clip/JointData";
import { TransformChannel } from "./clip/TransformChannel";
import { TransformData } from "./clip/TransformData";
import { TriggerChannel } from "./clip/TriggerChannel";
import { TriggerData } from "./clip/TriggerData";
import { AnimationComponent } from "./components/AnimationComponent";
import { AnimationClipHandler } from "./handlers/AnimationClipHandler";
import { AnimationComponentHandler } from "./handlers/AnimationComponentHandler";
import { anonymus as AnimationHandlers } from "./handlers/AnimationHandlers";
import { AnimationLayersHandler } from "./handlers/AnimationLayersHandler";
import { AnimationStateHandler } from "./handlers/AnimationStateHandler";
import { SkeletonHandler } from "./handlers/SkeletonHandler";
import { Joint } from "./Joint";
import { AnimationLayer } from "./layer/AnimationLayer";
import { LayerLerpBlender } from "./layer/LayerLerpBlender";
import { Skeleton } from "./Skeleton";
import { SkeletonPose } from "./SkeletonPose";
import { AbstractState } from "./state/AbstractState";
import { AbstractTransitionState } from "./state/AbstractTransitionState";
import { FadeTransitionState } from "./state/FadeTransitionState";
import { FrozenTransitionState } from "./state/FrozenTransitionState";
import { SteadyState } from "./state/SteadyState";
import { SyncFadeTransitionState } from "./state/SyncFadeTransitionState";
import { AnimationSystem } from "./systems/AnimationSystem";
module.exports = {
	Source: Source,
	BinaryLerpSource: BinaryLerpSource,
	ClipSource: ClipSource,
	FrozenClipSource: FrozenClipSource,
	ManagedTransformSource: ManagedTransformSource,
	AbstractAnimationChannel: AbstractAnimationChannel,
	AnimationClip: AnimationClip,
	AnimationClipInstance: AnimationClipInstance,
	InterpolatedFloatChannel: InterpolatedFloatChannel,
	JointChannel: JointChannel,
	JointData: JointData,
	TransformChannel: TransformChannel,
	TransformData: TransformData,
	TriggerChannel: TriggerChannel,
	TriggerData: TriggerData,
	AnimationComponent: AnimationComponent,
	AnimationClipHandler: AnimationClipHandler,
	AnimationComponentHandler: AnimationComponentHandler,
	AnimationHandlers: AnimationHandlers,
	AnimationLayersHandler: AnimationLayersHandler,
	AnimationStateHandler: AnimationStateHandler,
	SkeletonHandler: SkeletonHandler,
	Joint: Joint,
	AnimationLayer: AnimationLayer,
	LayerLerpBlender: LayerLerpBlender,
	Skeleton: Skeleton,
	SkeletonPose: SkeletonPose,
	AbstractState: AbstractState,
	AbstractTransitionState: AbstractTransitionState,
	FadeTransitionState: FadeTransitionState,
	FrozenTransitionState: FrozenTransitionState,
	SteadyState: SteadyState,
	SyncFadeTransitionState: SyncFadeTransitionState,
	AnimationSystem: AnimationSystem
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}