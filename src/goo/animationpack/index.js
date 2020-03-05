import { Source as Sourcejs } from "./blendtree/Source";
import { BinaryLerpSource as BinaryLerpSourcejs } from "./blendtree/BinaryLerpSource";
import { ClipSource as ClipSourcejs } from "./blendtree/ClipSource";
import { FrozenClipSource as FrozenClipSourcejs } from "./blendtree/FrozenClipSource";
import { ManagedTransformSource as ManagedTransformSourcejs } from "./blendtree/ManagedTransformSource";
import { AbstractAnimationChannel as AbstractAnimationChanneljs } from "./clip/AbstractAnimationChannel";
import { AnimationClip as AnimationClip_AnimationClipjs } from "./clip/AnimationClip";
import { AnimationClipInstance as AnimationClipInstancejs } from "./clip/AnimationClipInstance";
import {     InterpolatedFloatChannel as InterpolatedFloatChannel_InterpolatedFloatChanneljs, } from "./clip/InterpolatedFloatChannel";
import { JointChannel as JointChannel_JointChanneljs } from "./clip/JointChannel";
import { JointData as JointDatajs } from "./clip/JointData";
import { TransformChannel as TransformChanneljs } from "./clip/TransformChannel";
import { TransformData as TransformDatajs } from "./clip/TransformData";
import { TriggerChannel as TriggerChannel_TriggerChanneljs } from "./clip/TriggerChannel";
import { TriggerData as TriggerData_TriggerDatajs } from "./clip/TriggerData";
import { AnimationComponent as AnimationComponentjs } from "./components/AnimationComponent";
import { AnimationClipHandler as AnimationClipHandlerjs } from "./handlers/AnimationClipHandler";
import { AnimationComponentHandler as AnimationComponentHandlerjs } from "./handlers/AnimationComponentHandler";
import { AnimationHandlersjs as AnimationHandlers_AnimationHandlersjsjs } from "./handlers/AnimationHandlers";
import { AnimationLayersHandler as AnimationLayersHandlerjs } from "./handlers/AnimationLayersHandler";
import { AnimationStateHandler as AnimationStateHandlerjs } from "./handlers/AnimationStateHandler";
import { SkeletonHandler as SkeletonHandlerjs } from "./handlers/SkeletonHandler";
import { Joint as Jointjs } from "./Joint";
import { AnimationLayer as AnimationLayerjs } from "./layer/AnimationLayer";
import { LayerLerpBlender as LayerLerpBlender_LayerLerpBlenderjs } from "./layer/LayerLerpBlender";
import { Skeleton as Skeletonjs } from "./Skeleton";
import { SkeletonPose as SkeletonPosejs } from "./SkeletonPose";
import { AbstractState as AbstractStatejs } from "./state/AbstractState";
import { AbstractTransitionState as AbstractTransitionStatejs } from "./state/AbstractTransitionState";
import { FadeTransitionState as FadeTransitionStatejs } from "./state/FadeTransitionState";
import { FrozenTransitionState as FrozenTransitionStatejs } from "./state/FrozenTransitionState";
import { SteadyState as SteadyStatejs } from "./state/SteadyState";
import { SyncFadeTransitionState as SyncFadeTransitionStatejs } from "./state/SyncFadeTransitionState";
import { AnimationSystem as AnimationSystem_AnimationSystemjs } from "./systems/AnimationSystem";
module.exports = {
	Source: Source_Sourcejs,
	BinaryLerpSource: BinaryLerpSourcejs,
	ClipSource: ClipSourcejs,
	FrozenClipSource: FrozenClipSourcejs,
	ManagedTransformSource: ManagedTransformSourcejs,
	AbstractAnimationChannel: AbstractAnimationChannel_AbstractAnimationChanneljs,
	AnimationClip: AnimationClip_AnimationClipjs,
	AnimationClipInstance: AnimationClipInstancejs,
	InterpolatedFloatChannel: InterpolatedFloatChannel_InterpolatedFloatChanneljs,
	JointChannel: JointChannel_JointChanneljs,
	JointData: JointDatajs,
	TransformChannel: TransformChannel_TransformChanneljs,
	TransformData: TransformDatajs,
	TriggerChannel: TriggerChannel_TriggerChanneljs,
	TriggerData: TriggerData_TriggerDatajs,
	AnimationComponent: AnimationComponentjs,
	AnimationClipHandler: AnimationClipHandlerjs,
	AnimationComponentHandler: AnimationComponentHandlerjs,
	AnimationHandlers: AnimationHandlers_AnimationHandlersjsjs,
	AnimationLayersHandler: AnimationLayersHandlerjs,
	AnimationStateHandler: AnimationStateHandlerjs,
	SkeletonHandler: SkeletonHandlerjs,
	Joint: Joint_Jointjs,
	AnimationLayer: AnimationLayerjs,
	LayerLerpBlender: LayerLerpBlender_LayerLerpBlenderjs,
	Skeleton: Skeletonjs,
	SkeletonPose: SkeletonPosejs,
	AbstractState: AbstractState_AbstractStatejs,
	AbstractTransitionState: AbstractTransitionStatejs,
	FadeTransitionState: FadeTransitionStatejs,
	FrozenTransitionState: FrozenTransitionStatejs,
	SteadyState: SteadyStatejs,
	SyncFadeTransitionState: SyncFadeTransitionStatejs,
	AnimationSystem: AnimationSystem_AnimationSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}