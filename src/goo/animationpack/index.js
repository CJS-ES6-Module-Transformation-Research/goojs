import { Source as Source_Sourcejs } from "./blendtree/Source";
import { BinaryLerpSource as BinaryLerpSource_BinaryLerpSourcejs } from "./blendtree/BinaryLerpSource";
import { ClipSource as ClipSource_ClipSourcejs } from "./blendtree/ClipSource";
import { FrozenClipSource as FrozenClipSource_FrozenClipSourcejs } from "./blendtree/FrozenClipSource";
import { ManagedTransformSource as ManagedTransformSource_ManagedTransformSourcejs } from "./blendtree/ManagedTransformSource";
import {     AbstractAnimationChannel as AbstractAnimationChannel_AbstractAnimationChanneljs, } from "./clip/AbstractAnimationChannel";
import { AnimationClip as AnimationClip_AnimationClipjs } from "./clip/AnimationClip";
import { AnimationClipInstance as AnimationClipInstance_AnimationClipInstancejs } from "./clip/AnimationClipInstance";
import {     InterpolatedFloatChannel as InterpolatedFloatChannel_InterpolatedFloatChanneljs, } from "./clip/InterpolatedFloatChannel";
import { JointChannel as JointChannel_JointChanneljs } from "./clip/JointChannel";
import { JointData as JointData_JointDatajs } from "./clip/JointData";
import { TransformChannel as TransformChannel_TransformChanneljs } from "./clip/TransformChannel";
import { TransformData as TransformData_TransformDatajs } from "./clip/TransformData";
import { TriggerChannel as TriggerChannel_TriggerChanneljs } from "./clip/TriggerChannel";
import { TriggerData as TriggerData_TriggerDatajs } from "./clip/TriggerData";
import { AnimationComponent as AnimationComponent_AnimationComponentjs } from "./components/AnimationComponent";
import { AnimationClipHandler as AnimationClipHandler_AnimationClipHandlerjs } from "./handlers/AnimationClipHandler";
import {     AnimationComponentHandler as AnimationComponentHandler_AnimationComponentHandlerjs, } from "./handlers/AnimationComponentHandler";
import { AnimationHandlersjs as AnimationHandlers_AnimationHandlersjsjs } from "./handlers/AnimationHandlers";
import { AnimationLayersHandler as AnimationLayersHandler_AnimationLayersHandlerjs } from "./handlers/AnimationLayersHandler";
import { AnimationStateHandler as AnimationStateHandler_AnimationStateHandlerjs } from "./handlers/AnimationStateHandler";
import { SkeletonHandler as SkeletonHandler_SkeletonHandlerjs } from "./handlers/SkeletonHandler";
import { Joint as Joint_Jointjs } from "./Joint";
import { AnimationLayer as AnimationLayer_AnimationLayerjs } from "./layer/AnimationLayer";
import { LayerLerpBlender as LayerLerpBlender_LayerLerpBlenderjs } from "./layer/LayerLerpBlender";
import { Skeleton as Skeleton_Skeletonjs } from "./Skeleton";
import { SkeletonPose as SkeletonPose_SkeletonPosejs } from "./SkeletonPose";
import { AbstractState as AbstractState_AbstractStatejs } from "./state/AbstractState";
import {     AbstractTransitionState as AbstractTransitionState_AbstractTransitionStatejs, } from "./state/AbstractTransitionState";
import { FadeTransitionState as FadeTransitionState_FadeTransitionStatejs } from "./state/FadeTransitionState";
import { FrozenTransitionState as FrozenTransitionState_FrozenTransitionStatejs } from "./state/FrozenTransitionState";
import { SteadyState as SteadyState_SteadyStatejs } from "./state/SteadyState";
import {     SyncFadeTransitionState as SyncFadeTransitionState_SyncFadeTransitionStatejs, } from "./state/SyncFadeTransitionState";
import { AnimationSystem as AnimationSystem_AnimationSystemjs } from "./systems/AnimationSystem";
module.exports = {
	Source: Source_Sourcejs,
	BinaryLerpSource: BinaryLerpSource_BinaryLerpSourcejs,
	ClipSource: ClipSource_ClipSourcejs,
	FrozenClipSource: FrozenClipSource_FrozenClipSourcejs,
	ManagedTransformSource: ManagedTransformSource_ManagedTransformSourcejs,
	AbstractAnimationChannel: AbstractAnimationChannel_AbstractAnimationChanneljs,
	AnimationClip: AnimationClip_AnimationClipjs,
	AnimationClipInstance: AnimationClipInstance_AnimationClipInstancejs,
	InterpolatedFloatChannel: InterpolatedFloatChannel_InterpolatedFloatChanneljs,
	JointChannel: JointChannel_JointChanneljs,
	JointData: JointData_JointDatajs,
	TransformChannel: TransformChannel_TransformChanneljs,
	TransformData: TransformData_TransformDatajs,
	TriggerChannel: TriggerChannel_TriggerChanneljs,
	TriggerData: TriggerData_TriggerDatajs,
	AnimationComponent: AnimationComponent_AnimationComponentjs,
	AnimationClipHandler: AnimationClipHandler_AnimationClipHandlerjs,
	AnimationComponentHandler: AnimationComponentHandler_AnimationComponentHandlerjs,
	AnimationHandlers: AnimationHandlers_AnimationHandlersjsjs,
	AnimationLayersHandler: AnimationLayersHandler_AnimationLayersHandlerjs,
	AnimationStateHandler: AnimationStateHandler_AnimationStateHandlerjs,
	SkeletonHandler: SkeletonHandler_SkeletonHandlerjs,
	Joint: Joint_Jointjs,
	AnimationLayer: AnimationLayer_AnimationLayerjs,
	LayerLerpBlender: LayerLerpBlender_LayerLerpBlenderjs,
	Skeleton: Skeleton_Skeletonjs,
	SkeletonPose: SkeletonPose_SkeletonPosejs,
	AbstractState: AbstractState_AbstractStatejs,
	AbstractTransitionState: AbstractTransitionState_AbstractTransitionStatejs,
	FadeTransitionState: FadeTransitionState_FadeTransitionStatejs,
	FrozenTransitionState: FrozenTransitionState_FrozenTransitionStatejs,
	SteadyState: SteadyState_SteadyStatejs,
	SyncFadeTransitionState: SyncFadeTransitionState_SyncFadeTransitionStatejs,
	AnimationSystem: AnimationSystem_AnimationSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}