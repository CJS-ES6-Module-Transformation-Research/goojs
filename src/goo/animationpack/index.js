import { Sourcejs as blendtreeSource_Sourcejs } from "./blendtree/Source";
import { BinaryLerpSourcejs as blendtreeBinaryLerpSource_BinaryLerpSourcejs } from "./blendtree/BinaryLerpSource";
import { ClipSourcejs as blendtreeClipSource_ClipSourcejs } from "./blendtree/ClipSource";
import { FrozenClipSourcejs as blendtreeFrozenClipSource_FrozenClipSourcejs } from "./blendtree/FrozenClipSource";
import {     ManagedTransformSourcejs as blendtreeManagedTransformSource_ManagedTransformSourcejs, } from "./blendtree/ManagedTransformSource";
import {     AbstractAnimationChanneljs as clipAbstractAnimationChannel_AbstractAnimationChanneljs, } from "./clip/AbstractAnimationChannel";
import { AnimationClipjs as clipAnimationClip_AnimationClipjs } from "./clip/AnimationClip";
import {     AnimationClipInstancejs as clipAnimationClipInstance_AnimationClipInstancejs, } from "./clip/AnimationClipInstance";
import {     InterpolatedFloatChanneljs as clipInterpolatedFloatChannel_InterpolatedFloatChanneljs, } from "./clip/InterpolatedFloatChannel";
import { JointChanneljs as clipJointChannel_JointChanneljs } from "./clip/JointChannel";
import { JointDatajs as clipJointData_JointDatajs } from "./clip/JointData";
import { TransformChanneljs as clipTransformChannel_TransformChanneljs } from "./clip/TransformChannel";
import { TransformDatajs as clipTransformData_TransformDatajs } from "./clip/TransformData";
import { TriggerChanneljs as clipTriggerChannel_TriggerChanneljs } from "./clip/TriggerChannel";
import { TriggerDatajs as clipTriggerData_TriggerDatajs } from "./clip/TriggerData";
import { AnimationComponentjs as componentsAnimationComponent_AnimationComponentjs } from "./components/AnimationComponent";
import {     AnimationClipHandlerjs as handlersAnimationClipHandler_AnimationClipHandlerjs, } from "./handlers/AnimationClipHandler";
import {     AnimationComponentHandlerjs as handlersAnimationComponentHandler_AnimationComponentHandlerjs, } from "./handlers/AnimationComponentHandler";
import { handlersAnimationHandlers_obj } from "./handlers/AnimationHandlers";
import {     AnimationLayersHandlerjs as handlersAnimationLayersHandler_AnimationLayersHandlerjs, } from "./handlers/AnimationLayersHandler";
import {     AnimationStateHandlerjs as handlersAnimationStateHandler_AnimationStateHandlerjs, } from "./handlers/AnimationStateHandler";
import { SkeletonHandlerjs as handlersSkeletonHandler_SkeletonHandlerjs } from "./handlers/SkeletonHandler";
import { Jointjs as Joint_Jointjs } from "./Joint";
import { AnimationLayerjs as layerAnimationLayer_AnimationLayerjs } from "./layer/AnimationLayer";
import { LayerLerpBlenderjs as layerLayerLerpBlender_LayerLerpBlenderjs } from "./layer/LayerLerpBlender";
import { Skeletonjs as Skeleton_Skeletonjs } from "./Skeleton";
import { SkeletonPosejs as SkeletonPose_SkeletonPosejs } from "./SkeletonPose";
import { AbstractStatejs as stateAbstractState_AbstractStatejs } from "./state/AbstractState";
import {     AbstractTransitionStatejs as stateAbstractTransitionState_AbstractTransitionStatejs, } from "./state/AbstractTransitionState";
import { FadeTransitionStatejs as stateFadeTransitionState_FadeTransitionStatejs } from "./state/FadeTransitionState";
import {     FrozenTransitionStatejs as stateFrozenTransitionState_FrozenTransitionStatejs, } from "./state/FrozenTransitionState";
import { SteadyStatejs as stateSteadyState_SteadyStatejs } from "./state/SteadyState";
import {     SyncFadeTransitionStatejs as stateSyncFadeTransitionState_SyncFadeTransitionStatejs, } from "./state/SyncFadeTransitionState";
import { AnimationSystemjs as systemsAnimationSystem_AnimationSystemjs } from "./systems/AnimationSystem";
var indexjs;
indexjs = {
	Source: blendtreeSource_Sourcejs,
	BinaryLerpSource: blendtreeBinaryLerpSource_BinaryLerpSourcejs,
	ClipSource: blendtreeClipSource_ClipSourcejs,
	FrozenClipSource: blendtreeFrozenClipSource_FrozenClipSourcejs,
	ManagedTransformSource: blendtreeManagedTransformSource_ManagedTransformSourcejs,
	AbstractAnimationChannel: clipAbstractAnimationChannel_AbstractAnimationChanneljs,
	AnimationClip: clipAnimationClip_AnimationClipjs,
	AnimationClipInstance: clipAnimationClipInstance_AnimationClipInstancejs,
	InterpolatedFloatChannel: clipInterpolatedFloatChannel_InterpolatedFloatChanneljs,
	JointChannel: clipJointChannel_JointChanneljs,
	JointData: clipJointData_JointDatajs,
	TransformChannel: clipTransformChannel_TransformChanneljs,
	TransformData: clipTransformData_TransformDatajs,
	TriggerChannel: clipTriggerChannel_TriggerChanneljs,
	TriggerData: clipTriggerData_TriggerDatajs,
	AnimationComponent: componentsAnimationComponent_AnimationComponentjs,
	AnimationClipHandler: handlersAnimationClipHandler_AnimationClipHandlerjs,
	AnimationComponentHandler: handlersAnimationComponentHandler_AnimationComponentHandlerjs,
	AnimationHandlers: handlersAnimationHandlers_obj,
	AnimationLayersHandler: handlersAnimationLayersHandler_AnimationLayersHandlerjs,
	AnimationStateHandler: handlersAnimationStateHandler_AnimationStateHandlerjs,
	SkeletonHandler: handlersSkeletonHandler_SkeletonHandlerjs,
	Joint: Joint_Jointjs,
	AnimationLayer: layerAnimationLayer_AnimationLayerjs,
	LayerLerpBlender: layerLayerLerpBlender_LayerLerpBlenderjs,
	Skeleton: Skeleton_Skeletonjs,
	SkeletonPose: SkeletonPose_SkeletonPosejs,
	AbstractState: stateAbstractState_AbstractStatejs,
	AbstractTransitionState: stateAbstractTransitionState_AbstractTransitionStatejs,
	FadeTransitionState: stateFadeTransitionState_FadeTransitionStatejs,
	FrozenTransitionState: stateFrozenTransitionState_FrozenTransitionStatejs,
	SteadyState: stateSteadyState_SteadyStatejs,
	SyncFadeTransitionState: stateSyncFadeTransitionState_SyncFadeTransitionStatejs,
	AnimationSystem: systemsAnimationSystem_AnimationSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}