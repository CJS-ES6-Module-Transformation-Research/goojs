import { Source as blendtreeSource_Source } from "./blendtree/Source";
import { BinaryLerpSource as blendtreeBinaryLerpSource_BinaryLerpSource } from "./blendtree/BinaryLerpSource";
import { ClipSource as blendtreeClipSource_ClipSource } from "./blendtree/ClipSource";
import { FrozenClipSource as blendtreeFrozenClipSource_FrozenClipSource } from "./blendtree/FrozenClipSource";
import {     ManagedTransformSource as blendtreeManagedTransformSource_ManagedTransformSource, } from "./blendtree/ManagedTransformSource";
import {     AbstractAnimationChannel as clipAbstractAnimationChannel_AbstractAnimationChannel, } from "./clip/AbstractAnimationChannel";
import { AnimationClip as clipAnimationClip_AnimationClip } from "./clip/AnimationClip";
import { AnimationClipInstance as clipAnimationClipInstance_AnimationClipInstance } from "./clip/AnimationClipInstance";
import {     InterpolatedFloatChannel as clipInterpolatedFloatChannel_InterpolatedFloatChannel, } from "./clip/InterpolatedFloatChannel";
import { JointChannel as clipJointChannel_JointChannel } from "./clip/JointChannel";
import { JointData as clipJointData_JointData } from "./clip/JointData";
import { TransformChannel as clipTransformChannel_TransformChannel } from "./clip/TransformChannel";
import { TransformData as clipTransformData_TransformData } from "./clip/TransformData";
import { TriggerChannel as clipTriggerChannel_TriggerChannel } from "./clip/TriggerChannel";
import { TriggerData as clipTriggerData_TriggerData } from "./clip/TriggerData";
import { AnimationComponent as componentsAnimationComponent_AnimationComponent } from "./components/AnimationComponent";
import { AnimationClipHandler as handlersAnimationClipHandler_AnimationClipHandler } from "./handlers/AnimationClipHandler";
import {     AnimationComponentHandler as handlersAnimationComponentHandler_AnimationComponentHandler, } from "./handlers/AnimationComponentHandler";
import * as handlersAnimationHandlers_AnimationHandlersjs from "./handlers/AnimationHandlers";
import {     AnimationLayersHandler as handlersAnimationLayersHandler_AnimationLayersHandler, } from "./handlers/AnimationLayersHandler";
import {     AnimationStateHandler as handlersAnimationStateHandler_AnimationStateHandler, } from "./handlers/AnimationStateHandler";
import { SkeletonHandler as handlersSkeletonHandler_SkeletonHandler } from "./handlers/SkeletonHandler";
import { Joint as Joint_Joint } from "./Joint";
import { AnimationLayer as layerAnimationLayer_AnimationLayer } from "./layer/AnimationLayer";
import { LayerLerpBlender as layerLayerLerpBlender_LayerLerpBlender } from "./layer/LayerLerpBlender";
import { Skeleton as Skeleton_Skeleton } from "./Skeleton";
import { SkeletonPose as SkeletonPose_SkeletonPose } from "./SkeletonPose";
import { AbstractState as stateAbstractState_AbstractState } from "./state/AbstractState";
import {     AbstractTransitionState as stateAbstractTransitionState_AbstractTransitionState, } from "./state/AbstractTransitionState";
import { FadeTransitionState as stateFadeTransitionState_FadeTransitionState } from "./state/FadeTransitionState";
import { FrozenTransitionState as stateFrozenTransitionState_FrozenTransitionState } from "./state/FrozenTransitionState";
import { SteadyState as stateSteadyState_SteadyState } from "./state/SteadyState";
import {     SyncFadeTransitionState as stateSyncFadeTransitionState_SyncFadeTransitionState, } from "./state/SyncFadeTransitionState";
import { AnimationSystem as systemsAnimationSystem_AnimationSystem } from "./systems/AnimationSystem";
var indexjs;
indexjs = {
	Source: blendtreeSource_Source,
	BinaryLerpSource: blendtreeBinaryLerpSource_BinaryLerpSource,
	ClipSource: blendtreeClipSource_ClipSource,
	FrozenClipSource: blendtreeFrozenClipSource_FrozenClipSource,
	ManagedTransformSource: blendtreeManagedTransformSource_ManagedTransformSource,
	AbstractAnimationChannel: clipAbstractAnimationChannel_AbstractAnimationChannel,
	AnimationClip: clipAnimationClip_AnimationClip,
	AnimationClipInstance: clipAnimationClipInstance_AnimationClipInstance,
	InterpolatedFloatChannel: clipInterpolatedFloatChannel_InterpolatedFloatChannel,
	JointChannel: clipJointChannel_JointChannel,
	JointData: clipJointData_JointData,
	TransformChannel: clipTransformChannel_TransformChannel,
	TransformData: clipTransformData_TransformData,
	TriggerChannel: clipTriggerChannel_TriggerChannel,
	TriggerData: clipTriggerData_TriggerData,
	AnimationComponent: componentsAnimationComponent_AnimationComponent,
	AnimationClipHandler: handlersAnimationClipHandler_AnimationClipHandler,
	AnimationComponentHandler: handlersAnimationComponentHandler_AnimationComponentHandler,
	AnimationHandlers: handlersAnimationHandlers_AnimationHandlersjs,
	AnimationLayersHandler: handlersAnimationLayersHandler_AnimationLayersHandler,
	AnimationStateHandler: handlersAnimationStateHandler_AnimationStateHandler,
	SkeletonHandler: handlersSkeletonHandler_SkeletonHandler,
	Joint: Joint_Joint,
	AnimationLayer: layerAnimationLayer_AnimationLayer,
	LayerLerpBlender: layerLayerLerpBlender_LayerLerpBlender,
	Skeleton: Skeleton_Skeleton,
	SkeletonPose: SkeletonPose_SkeletonPose,
	AbstractState: stateAbstractState_AbstractState,
	AbstractTransitionState: stateAbstractTransitionState_AbstractTransitionState,
	FadeTransitionState: stateFadeTransitionState_FadeTransitionState,
	FrozenTransitionState: stateFrozenTransitionState_FrozenTransitionState,
	SteadyState: stateSteadyState_SteadyState,
	SyncFadeTransitionState: stateSyncFadeTransitionState_SyncFadeTransitionState,
	AnimationSystem: systemsAnimationSystem_AnimationSystem
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}