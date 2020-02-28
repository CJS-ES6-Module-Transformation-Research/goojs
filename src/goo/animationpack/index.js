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

module.exports = {
	Source: _Source.Source,
	BinaryLerpSource: _BinaryLerpSource.BinaryLerpSource,
	ClipSource: _ClipSource.ClipSource,
	FrozenClipSource: _FrozenClipSource.FrozenClipSource,
	ManagedTransformSource: _ManagedTransformSource.ManagedTransformSource,
	AbstractAnimationChannel: _AbstractAnimationChannel.AbstractAnimationChannel,
	AnimationClip: _AnimationClip.AnimationClip,
	AnimationClipInstance: _AnimationClipInstance.AnimationClipInstance,
	InterpolatedFloatChannel: _InterpolatedFloatChannel.InterpolatedFloatChannel,
	JointChannel: _JointChannel.JointChannel,
	JointData: _JointData.JointData,
	TransformChannel: _TransformChannel.TransformChannel,
	TransformData: _TransformData.TransformData,
	TriggerChannel: _TriggerChannel.TriggerChannel,
	TriggerData: _TriggerData.TriggerData,
	AnimationComponent: _AnimationComponent.AnimationComponent,
	AnimationClipHandler: _AnimationClipHandler.AnimationClipHandler,
	AnimationComponentHandler: _AnimationComponentHandler.AnimationComponentHandler,
	AnimationHandlers: _AnimationHandlers.AnimationHandlersjs,
	AnimationLayersHandler: _AnimationLayersHandler.AnimationLayersHandler,
	AnimationStateHandler: _AnimationStateHandler.AnimationStateHandler,
	SkeletonHandler: _SkeletonHandler.SkeletonHandler,
	Joint: _Joint.Joint,
	AnimationLayer: _AnimationLayer.AnimationLayer,
	LayerLerpBlender: _LayerLerpBlender.LayerLerpBlender,
	Skeleton: _Skeleton.Skeleton,
	SkeletonPose: _SkeletonPose.SkeletonPose,
	AbstractState: _AbstractState.AbstractState,
	AbstractTransitionState: _AbstractTransitionState.AbstractTransitionState,
	FadeTransitionState: _FadeTransitionState.FadeTransitionState,
	FrozenTransitionState: _FrozenTransitionState.FrozenTransitionState,
	SteadyState: _SteadyState.SteadyState,
	SyncFadeTransitionState: _SyncFadeTransitionState.SyncFadeTransitionState,
	AnimationSystem: _AnimationSystem.AnimationSystem
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
