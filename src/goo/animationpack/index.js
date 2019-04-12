import blendtreeSource_moduleDefault from "./blendtree/Source";
import blendtreeBinaryLerpSource_moduleDefault from "./blendtree/BinaryLerpSource";
import blendtreeClipSource_moduleDefault from "./blendtree/ClipSource";
import blendtreeFrozenClipSource_moduleDefault from "./blendtree/FrozenClipSource";
import blendtreeManagedTransformSource_moduleDefault from "./blendtree/ManagedTransformSource";
import clipAbstractAnimationChannel_moduleDefault from "./clip/AbstractAnimationChannel";
import clipAnimationClip_moduleDefault from "./clip/AnimationClip";
import clipAnimationClipInstance_moduleDefault from "./clip/AnimationClipInstance";
import clipInterpolatedFloatChannel_moduleDefault from "./clip/InterpolatedFloatChannel";
import clipJointChannel_moduleDefault from "./clip/JointChannel";
import clipJointData_moduleDefault from "./clip/JointData";
import clipTransformChannel_moduleDefault from "./clip/TransformChannel";
import clipTransformData_moduleDefault from "./clip/TransformData";
import clipTriggerChannel_moduleDefault from "./clip/TriggerChannel";
import clipTriggerData_moduleDefault from "./clip/TriggerData";
import componentsAnimationComponent_moduleDefault from "./components/AnimationComponent";
import handlersAnimationClipHandler_moduleDefault from "./handlers/AnimationClipHandler";
import handlersAnimationComponentHandler_moduleDefault from "./handlers/AnimationComponentHandler";
import handlersAnimationHandlers_moduleDefault from "./handlers/AnimationHandlers";
import handlersAnimationLayersHandler_moduleDefault from "./handlers/AnimationLayersHandler";
import handlersAnimationStateHandler_moduleDefault from "./handlers/AnimationStateHandler";
import handlersSkeletonHandler_moduleDefault from "./handlers/SkeletonHandler";
import Joint_moduleDefault from "./Joint";
import layerAnimationLayer_moduleDefault from "./layer/AnimationLayer";
import layerLayerLerpBlender_moduleDefault from "./layer/LayerLerpBlender";
import Skeleton_moduleDefault from "./Skeleton";
import SkeletonPose_moduleDefault from "./SkeletonPose";
import stateAbstractState_moduleDefault from "./state/AbstractState";
import stateAbstractTransitionState_moduleDefault from "./state/AbstractTransitionState";
import stateFadeTransitionState_moduleDefault from "./state/FadeTransitionState";
import stateFrozenTransitionState_moduleDefault from "./state/FrozenTransitionState";
import stateSteadyState_moduleDefault from "./state/SteadyState";
import stateSyncFadeTransitionState_moduleDefault from "./state/SyncFadeTransitionState";
import systemsAnimationSystem_moduleDefault from "./systems/AnimationSystem";
export default {
	Source: blendtreeSource_moduleDefault,
	BinaryLerpSource: blendtreeBinaryLerpSource_moduleDefault,
	ClipSource: blendtreeClipSource_moduleDefault,
	FrozenClipSource: blendtreeFrozenClipSource_moduleDefault,
	ManagedTransformSource: blendtreeManagedTransformSource_moduleDefault,
	AbstractAnimationChannel: clipAbstractAnimationChannel_moduleDefault,
	AnimationClip: clipAnimationClip_moduleDefault,
	AnimationClipInstance: clipAnimationClipInstance_moduleDefault,
	InterpolatedFloatChannel: clipInterpolatedFloatChannel_moduleDefault,
	JointChannel: clipJointChannel_moduleDefault,
	JointData: clipJointData_moduleDefault,
	TransformChannel: clipTransformChannel_moduleDefault,
	TransformData: clipTransformData_moduleDefault,
	TriggerChannel: clipTriggerChannel_moduleDefault,
	TriggerData: clipTriggerData_moduleDefault,
	AnimationComponent: componentsAnimationComponent_moduleDefault,
	AnimationClipHandler: handlersAnimationClipHandler_moduleDefault,
	AnimationComponentHandler: handlersAnimationComponentHandler_moduleDefault,
	AnimationHandlers: handlersAnimationHandlers_moduleDefault,
	AnimationLayersHandler: handlersAnimationLayersHandler_moduleDefault,
	AnimationStateHandler: handlersAnimationStateHandler_moduleDefault,
	SkeletonHandler: handlersSkeletonHandler_moduleDefault,
	Joint: Joint_moduleDefault,
	AnimationLayer: layerAnimationLayer_moduleDefault,
	LayerLerpBlender: layerLayerLerpBlender_moduleDefault,
	Skeleton: Skeleton_moduleDefault,
	SkeletonPose: SkeletonPose_moduleDefault,
	AbstractState: stateAbstractState_moduleDefault,
	AbstractTransitionState: stateAbstractTransitionState_moduleDefault,
	FadeTransitionState: stateFadeTransitionState_moduleDefault,
	FrozenTransitionState: stateFrozenTransitionState_moduleDefault,
	SteadyState: stateSteadyState_moduleDefault,
	SyncFadeTransitionState: stateSyncFadeTransitionState_moduleDefault,
	AnimationSystem: systemsAnimationSystem_moduleDefault
};;

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}