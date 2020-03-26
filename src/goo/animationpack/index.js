"use strict";

var _Source = require("./blendtree/Source");

var _BinaryLerpSource = require("./blendtree/BinaryLerpSource");

var _ClipSource = require("./blendtree/ClipSource");

var _FrozenClipSource = require("./blendtree/FrozenClipSource");

var _ManagedTransformSource = require("./blendtree/ManagedTransformSource");

var _AbstractAnimationChannel = require("./clip/AbstractAnimationChannel");

var _AnimationClip = require("./clip/AnimationClip");

var _AnimationClipInstance = require("./clip/AnimationClipInstance");

var _InterpolatedFloatChannel = require("./clip/InterpolatedFloatChannel");

var _JointChannel = require("./clip/JointChannel");

var _JointData = require("./clip/JointData");

var _TransformChannel = require("./clip/TransformChannel");

var _TransformData = require("./clip/TransformData");

var _TriggerChannel = require("./clip/TriggerChannel");

var _TriggerData = require("./clip/TriggerData");

var _AnimationComponent = require("./components/AnimationComponent");

var _AnimationClipHandler = require("./handlers/AnimationClipHandler");

var _AnimationComponentHandler = require("./handlers/AnimationComponentHandler");

var _AnimationHandlers = require("./handlers/AnimationHandlers");

var _AnimationLayersHandler = require("./handlers/AnimationLayersHandler");

var _AnimationStateHandler = require("./handlers/AnimationStateHandler");

var _SkeletonHandler = require("./handlers/SkeletonHandler");

var _Joint = require("./Joint");

var _AnimationLayer = require("./layer/AnimationLayer");

var _LayerLerpBlender = require("./layer/LayerLerpBlender");

var _Skeleton = require("./Skeleton");

var _SkeletonPose = require("./SkeletonPose");

var _AbstractState = require("./state/AbstractState");

var _AbstractTransitionState = require("./state/AbstractTransitionState");

var _FadeTransitionState = require("./state/FadeTransitionState");

var _FrozenTransitionState = require("./state/FrozenTransitionState");

var _SteadyState = require("./state/SteadyState");

var _SyncFadeTransitionState = require("./state/SyncFadeTransitionState");

var _AnimationSystem = require("./systems/AnimationSystem");

var indexjs;
indexjs = {
	Source: _Source.Sourcejs,
	BinaryLerpSource: _BinaryLerpSource.BinaryLerpSourcejs,
	ClipSource: _ClipSource.ClipSourcejs,
	FrozenClipSource: _FrozenClipSource.FrozenClipSourcejs,
	ManagedTransformSource: _ManagedTransformSource.ManagedTransformSourcejs,
	AbstractAnimationChannel: _AbstractAnimationChannel.AbstractAnimationChanneljs,
	AnimationClip: _AnimationClip.AnimationClipjs,
	AnimationClipInstance: _AnimationClipInstance.AnimationClipInstancejs,
	InterpolatedFloatChannel: _InterpolatedFloatChannel.InterpolatedFloatChanneljs,
	JointChannel: _JointChannel.JointChanneljs,
	JointData: _JointData.JointDatajs,
	TransformChannel: _TransformChannel.TransformChanneljs,
	TransformData: _TransformData.TransformDatajs,
	TriggerChannel: _TriggerChannel.TriggerChanneljs,
	TriggerData: _TriggerData.TriggerDatajs,
	AnimationComponent: _AnimationComponent.AnimationComponentjs,
	AnimationClipHandler: _AnimationClipHandler.AnimationClipHandlerjs,
	AnimationComponentHandler: _AnimationComponentHandler.AnimationComponentHandlerjs,
	AnimationHandlers: _AnimationHandlers.handlersAnimationHandlers_obj,
	AnimationLayersHandler: _AnimationLayersHandler.AnimationLayersHandlerjs,
	AnimationStateHandler: _AnimationStateHandler.AnimationStateHandlerjs,
	SkeletonHandler: _SkeletonHandler.SkeletonHandlerjs,
	Joint: _Joint.Jointjs,
	AnimationLayer: _AnimationLayer.AnimationLayerjs,
	LayerLerpBlender: _LayerLerpBlender.LayerLerpBlenderjs,
	Skeleton: _Skeleton.Skeletonjs,
	SkeletonPose: _SkeletonPose.SkeletonPosejs,
	AbstractState: _AbstractState.AbstractStatejs,
	AbstractTransitionState: _AbstractTransitionState.AbstractTransitionStatejs,
	FadeTransitionState: _FadeTransitionState.FadeTransitionStatejs,
	FrozenTransitionState: _FrozenTransitionState.FrozenTransitionStatejs,
	SteadyState: _SteadyState.SteadyStatejs,
	SyncFadeTransitionState: _SyncFadeTransitionState.SyncFadeTransitionStatejs,
	AnimationSystem: _AnimationSystem.AnimationSystemjs
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
