Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ArrowsAction = require("./ArrowsAction");

var _ArrowsAction2 = _interopRequireDefault(_ArrowsAction);

var _DomEventAction = require("./DomEventAction");

var _DomEventAction2 = _interopRequireDefault(_DomEventAction);

var _MouseUpAction = require("./MouseUpAction");

var _MouseUpAction2 = _interopRequireDefault(_MouseUpAction);

var _MouseDownAction = require("./MouseDownAction");

var _MouseDownAction2 = _interopRequireDefault(_MouseDownAction);

var _MouseMoveAction = require("./MouseMoveAction");

var _MouseMoveAction2 = _interopRequireDefault(_MouseMoveAction);

var _MousePressedAction = require("./MousePressedAction");

var _MousePressedAction2 = _interopRequireDefault(_MousePressedAction);

var _KeyUpAction = require("./KeyUpAction");

var _KeyUpAction2 = _interopRequireDefault(_KeyUpAction);

var _KeyDownAction = require("./KeyDownAction");

var _KeyDownAction2 = _interopRequireDefault(_KeyDownAction);

var _KeyPressedAction = require("./KeyPressedAction");

var _KeyPressedAction2 = _interopRequireDefault(_KeyPressedAction);

var _PickAction = require("./PickAction");

var _PickAction2 = _interopRequireDefault(_PickAction);

var _PickAndExitAction = require("./PickAndExitAction");

var _PickAndExitAction2 = _interopRequireDefault(_PickAndExitAction);

var _ClickAction = require("./ClickAction");

var _ClickAction2 = _interopRequireDefault(_ClickAction);

var _HoverEnterAction = require("./HoverEnterAction");

var _HoverEnterAction2 = _interopRequireDefault(_HoverEnterAction);

var _HoverExitAction = require("./HoverExitAction");

var _HoverExitAction2 = _interopRequireDefault(_HoverExitAction);

var _WasdAction = require("./WasdAction");

var _WasdAction2 = _interopRequireDefault(_WasdAction);

var _MoveAction = require("./MoveAction");

var _MoveAction2 = _interopRequireDefault(_MoveAction);

var _RotateAction = require("./RotateAction");

var _RotateAction2 = _interopRequireDefault(_RotateAction);

var _ScaleAction = require("./ScaleAction");

var _ScaleAction2 = _interopRequireDefault(_ScaleAction);

var _LookAtAction = require("./LookAtAction");

var _LookAtAction2 = _interopRequireDefault(_LookAtAction);

var _TweenMoveAction = require("./TweenMoveAction");

var _TweenMoveAction2 = _interopRequireDefault(_TweenMoveAction);

var _TweenRotationAction = require("./TweenRotationAction");

var _TweenRotationAction2 = _interopRequireDefault(_TweenRotationAction);

var _TweenScaleAction = require("./TweenScaleAction");

var _TweenScaleAction2 = _interopRequireDefault(_TweenScaleAction);

var _TweenLookAtAction = require("./TweenLookAtAction");

var _TweenLookAtAction2 = _interopRequireDefault(_TweenLookAtAction);

var _ShakeAction = require("./ShakeAction");

var _ShakeAction2 = _interopRequireDefault(_ShakeAction);

var _PauseAnimationAction = require("./PauseAnimationAction");

var _PauseAnimationAction2 = _interopRequireDefault(_PauseAnimationAction);

var _ResumeAnimationAction = require("./ResumeAnimationAction");

var _ResumeAnimationAction2 = _interopRequireDefault(_ResumeAnimationAction);

var _SetAnimationAction = require("./SetAnimationAction");

var _SetAnimationAction2 = _interopRequireDefault(_SetAnimationAction);

var _SetTimeScaleAction = require("./SetTimeScaleAction");

var _SetTimeScaleAction2 = _interopRequireDefault(_SetTimeScaleAction);

var _SetAnimationOffsetAction = require("./SetAnimationOffsetAction");

var _SetAnimationOffsetAction2 = _interopRequireDefault(_SetAnimationOffsetAction);

var _WaitAction = require("./WaitAction");

var _WaitAction2 = _interopRequireDefault(_WaitAction);

var _TransitionAction = require("./TransitionAction");

var _TransitionAction2 = _interopRequireDefault(_TransitionAction);

var _NextFrameAction = require("./NextFrameAction");

var _NextFrameAction2 = _interopRequireDefault(_NextFrameAction);

var _RandomTransitionAction = require("./RandomTransitionAction");

var _RandomTransitionAction2 = _interopRequireDefault(_RandomTransitionAction);

var _EmitAction = require("./EmitAction");

var _EmitAction2 = _interopRequireDefault(_EmitAction);

var _TransitionOnMessageAction = require("./TransitionOnMessageAction");

var _TransitionOnMessageAction2 = _interopRequireDefault(_TransitionOnMessageAction);

var _EvalAction = require("./EvalAction");

var _EvalAction2 = _interopRequireDefault(_EvalAction);

var _HideAction = require("./HideAction");

var _HideAction2 = _interopRequireDefault(_HideAction);

var _ShowAction = require("./ShowAction");

var _ShowAction2 = _interopRequireDefault(_ShowAction);

var _RemoveAction = require("./RemoveAction");

var _RemoveAction2 = _interopRequireDefault(_RemoveAction);

var _AddLightAction = require("./AddLightAction");

var _AddLightAction2 = _interopRequireDefault(_AddLightAction);

var _RemoveLightAction = require("./RemoveLightAction");

var _RemoveLightAction2 = _interopRequireDefault(_RemoveLightAction);

var _SetLightPropertiesAction = require("./SetLightPropertiesAction");

var _SetLightPropertiesAction2 = _interopRequireDefault(_SetLightPropertiesAction);

var _TweenLightColorAction = require("./TweenLightColorAction");

var _TweenLightColorAction2 = _interopRequireDefault(_TweenLightColorAction);

var _SetClearColorAction = require("./SetClearColorAction");

var _SetClearColorAction2 = _interopRequireDefault(_SetClearColorAction);

var _SwitchCameraAction = require("./SwitchCameraAction");

var _SwitchCameraAction2 = _interopRequireDefault(_SwitchCameraAction);

var _InFrustumAction = require("./InFrustumAction");

var _InFrustumAction2 = _interopRequireDefault(_InFrustumAction);

var _DollyZoomAction = require("./DollyZoomAction");

var _DollyZoomAction2 = _interopRequireDefault(_DollyZoomAction);

var _InBoxAction = require("./InBoxAction");

var _InBoxAction2 = _interopRequireDefault(_InBoxAction);

var _CompareDistanceAction = require("./CompareDistanceAction");

var _CompareDistanceAction2 = _interopRequireDefault(_CompareDistanceAction);

var _CollidesAction = require("./CollidesAction");

var _CollidesAction2 = _interopRequireDefault(_CollidesAction);

var _TagAction = require("./TagAction");

var _TagAction2 = _interopRequireDefault(_TagAction);

var _SmokeAction = require("./SmokeAction");

var _SmokeAction2 = _interopRequireDefault(_SmokeAction);

var _FireAction = require("./FireAction");

var _FireAction2 = _interopRequireDefault(_FireAction);

var _RemoveParticlesAction = require("./RemoveParticlesAction");

var _RemoveParticlesAction2 = _interopRequireDefault(_RemoveParticlesAction);

var _TogglePostFxAction = require("./TogglePostFxAction");

var _TogglePostFxAction2 = _interopRequireDefault(_TogglePostFxAction);

var _ToggleFullscreenAction = require("./ToggleFullscreenAction");

var _ToggleFullscreenAction2 = _interopRequireDefault(_ToggleFullscreenAction);

var _PlaySoundAction = require("./PlaySoundAction");

var _PlaySoundAction2 = _interopRequireDefault(_PlaySoundAction);

var _PauseSoundAction = require("./PauseSoundAction");

var _PauseSoundAction2 = _interopRequireDefault(_PauseSoundAction);

var _StopSoundAction = require("./StopSoundAction");

var _StopSoundAction2 = _interopRequireDefault(_StopSoundAction);

var _SoundFadeInAction = require("./SoundFadeInAction");

var _SoundFadeInAction2 = _interopRequireDefault(_SoundFadeInAction);

var _SoundFadeOutAction = require("./SoundFadeOutAction");

var _SoundFadeOutAction2 = _interopRequireDefault(_SoundFadeOutAction);

var _SetRenderTargetAction = require("./SetRenderTargetAction");

var _SetRenderTargetAction2 = _interopRequireDefault(_SetRenderTargetAction);

var _TweenTextureOffsetAction = require("./TweenTextureOffsetAction");

var _TweenTextureOffsetAction2 = _interopRequireDefault(_TweenTextureOffsetAction);

var _SetMaterialColorAction = require("./SetMaterialColorAction");

var _SetMaterialColorAction2 = _interopRequireDefault(_SetMaterialColorAction);

var _TweenMaterialColorAction = require("./TweenMaterialColorAction");

var _TweenMaterialColorAction2 = _interopRequireDefault(_TweenMaterialColorAction);

var _LogMessageAction = require("./LogMessageAction");

var _LogMessageAction2 = _interopRequireDefault(_LogMessageAction);

var _TweenOpacityAction = require("./TweenOpacityAction");

var _TweenOpacityAction2 = _interopRequireDefault(_TweenOpacityAction);

var _HtmlAction = require("./HtmlAction");

var _HtmlAction2 = _interopRequireDefault(_HtmlAction);

var _CopyJointTransformAction = require("./CopyJointTransformAction");

var _CopyJointTransformAction2 = _interopRequireDefault(_CopyJointTransformAction);

var _TriggerEnterAction = require("./TriggerEnterAction");

var _TriggerEnterAction2 = _interopRequireDefault(_TriggerEnterAction);

var _TriggerLeaveAction = require("./TriggerLeaveAction");

var _TriggerLeaveAction2 = _interopRequireDefault(_TriggerLeaveAction);

var _ApplyImpulseAction = require("./ApplyImpulseAction");

var _ApplyImpulseAction2 = _interopRequireDefault(_ApplyImpulseAction);

var _ApplyForceAction = require("./ApplyForceAction");

var _ApplyForceAction2 = _interopRequireDefault(_ApplyForceAction);

var _ApplyTorqueAction = require("./ApplyTorqueAction");

var _ApplyTorqueAction2 = _interopRequireDefault(_ApplyTorqueAction);

var _SetRigidBodyPositionAction = require("./SetRigidBodyPositionAction");

var _SetRigidBodyPositionAction2 = _interopRequireDefault(_SetRigidBodyPositionAction);

var _SetRigidBodyRotationAction = require("./SetRigidBodyRotationAction");

var _SetRigidBodyRotationAction2 = _interopRequireDefault(_SetRigidBodyRotationAction);

var _SetRigidBodyVelocityAction = require("./SetRigidBodyVelocityAction");

var _SetRigidBodyVelocityAction2 = _interopRequireDefault(_SetRigidBodyVelocityAction);

var _SetRigidBodyAngularVelocityAction = require("./SetRigidBodyAngularVelocityAction");

var _SetRigidBodyAngularVelocityAction2 = _interopRequireDefault(_SetRigidBodyAngularVelocityAction);

var _CompareCounterAction = require("./CompareCounterAction");

var _CompareCounterAction2 = _interopRequireDefault(_CompareCounterAction);

var _CompareCountersAction = require("./CompareCountersAction");

var _CompareCountersAction2 = _interopRequireDefault(_CompareCountersAction);

var _SetCounterAction = require("./SetCounterAction");

var _SetCounterAction2 = _interopRequireDefault(_SetCounterAction);

var _IncrementCounterAction = require("./IncrementCounterAction");

var _IncrementCounterAction2 = _interopRequireDefault(_IncrementCounterAction);

var _MuteAction = require("./MuteAction");

var _MuteAction2 = _interopRequireDefault(_MuteAction);

var _UnmuteAction = require("./UnmuteAction");

var _UnmuteAction2 = _interopRequireDefault(_UnmuteAction);

var _ToggleMuteAction = require("./ToggleMuteAction");

var _ToggleMuteAction2 = _interopRequireDefault(_ToggleMuteAction);

var _StartTimelineAction = require("./StartTimelineAction");

var _StartTimelineAction2 = _interopRequireDefault(_StartTimelineAction);

var _PauseTimelineAction = require("./PauseTimelineAction");

var _PauseTimelineAction2 = _interopRequireDefault(_PauseTimelineAction);

var _StopTimelineAction = require("./StopTimelineAction");

var _StopTimelineAction2 = _interopRequireDefault(_StopTimelineAction);

var _SetTimelineTimeAction = require("./SetTimelineTimeAction");

var _SetTimelineTimeAction2 = _interopRequireDefault(_SetTimelineTimeAction);

var _SetHtmlTextAction = require("./SetHtmlTextAction");

var _SetHtmlTextAction2 = _interopRequireDefault(_SetHtmlTextAction);

var _SpriteAnimationAction = require("./SpriteAnimationAction");

var _SpriteAnimationAction2 = _interopRequireDefault(_SpriteAnimationAction);

var _PauseParticleSystemAction = require("./PauseParticleSystemAction");

var _PauseParticleSystemAction2 = _interopRequireDefault(_PauseParticleSystemAction);

var _StopParticleSystemAction = require("./StopParticleSystemAction");

var _StopParticleSystemAction2 = _interopRequireDefault(_StopParticleSystemAction);

var _StartParticleSystemAction = require("./StartParticleSystemAction");

var _StartParticleSystemAction2 = _interopRequireDefault(_StartParticleSystemAction);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var _actions = {};

var Actions = function Actions() {};

var IGNORED_ACTIONS = ['Eval', 'HTMLPick', 'Remove', 'Collides', 'Tag'];

Actions.register = function (name, actionClass) {
	_actions[name] = actionClass;
};

Actions.actionForType = function (name) {
	return _actions[name];
};

Actions.allActions = function () {
	var actions = {};
	var keys = Object.keys(_actions);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (IGNORED_ACTIONS.indexOf(key) === -1) {
			actions[key] = _actions[key];
		}
	}
	return actions;
};

Actions.allActionsArray = function () {
	var array = [];
	var actions = Actions.allActions();
	var keys = Object.keys(actions);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		array.push(actions[key]);
	}
	return array;
};

var allActions = {
	ArrowsAction: _ArrowsAction2.default,
	DomEventAction: _DomEventAction2.default,
	MouseUpAction: _MouseUpAction2.default,
	MouseDownAction: _MouseDownAction2.default,
	MouseMoveAction: _MouseMoveAction2.default,
	MousePressedAction: _MousePressedAction2.default,
	KeyUpAction: _KeyUpAction2.default,
	KeyDownAction: _KeyDownAction2.default,
	KeyPressedAction: _KeyPressedAction2.default,
	PickAction: _PickAction2.default,
	PickAndExitAction: _PickAndExitAction2.default,
	ClickAction: _ClickAction2.default,
	HoverEnterAction: _HoverEnterAction2.default,
	HoverExitAction: _HoverExitAction2.default,
	WasdAction: _WasdAction2.default,
	MoveAction: _MoveAction2.default,
	RotateAction: _RotateAction2.default,
	ScaleAction: _ScaleAction2.default,
	LookAtAction: _LookAtAction2.default,
	TweenMoveAction: _TweenMoveAction2.default,
	TweenRotationAction: _TweenRotationAction2.default,
	TweenScaleAction: _TweenScaleAction2.default,
	TweenLookAtAction: _TweenLookAtAction2.default,
	ShakeAction: _ShakeAction2.default,
	PauseAnimationAction: _PauseAnimationAction2.default,
	ResumeAnimationAction: _ResumeAnimationAction2.default,
	SetAnimationAction: _SetAnimationAction2.default,
	SetTimeScaleAction: _SetTimeScaleAction2.default,
	SetAnimationOffsetAction: _SetAnimationOffsetAction2.default,
	WaitAction: _WaitAction2.default,
	TransitionAction: _TransitionAction2.default,
	NextFrameAction: _NextFrameAction2.default,
	RandomTransitionAction: _RandomTransitionAction2.default,
	EmitAction: _EmitAction2.default,
	TransitionOnMessageAction: _TransitionOnMessageAction2.default,
	EvalAction: _EvalAction2.default,
	HideAction: _HideAction2.default,
	ShowAction: _ShowAction2.default,
	RemoveAction: _RemoveAction2.default,
	AddLightAction: _AddLightAction2.default,
	RemoveLightAction: _RemoveLightAction2.default,
	SetLightPropertiesAction: _SetLightPropertiesAction2.default,
	TweenLightColorAction: _TweenLightColorAction2.default,
	SetClearColorAction: _SetClearColorAction2.default,
	SwitchCameraAction: _SwitchCameraAction2.default,
	InFrustumAction: _InFrustumAction2.default,
	DollyZoomAction: _DollyZoomAction2.default,
	InBoxAction: _InBoxAction2.default,
	CompareDistanceAction: _CompareDistanceAction2.default,
	CollidesAction: _CollidesAction2.default,
	TagAction: _TagAction2.default,
	SmokeAction: _SmokeAction2.default,
	FireAction: _FireAction2.default,
	RemoveParticlesAction: _RemoveParticlesAction2.default,
	TogglePostFxAction: _TogglePostFxAction2.default,
	ToggleFullscreenAction: _ToggleFullscreenAction2.default,
	PlaySoundAction: _PlaySoundAction2.default,
	PauseSoundAction: _PauseSoundAction2.default,
	StopSoundAction: _StopSoundAction2.default,
	SoundFadeInAction: _SoundFadeInAction2.default,
	SoundFadeOutAction: _SoundFadeOutAction2.default,
	SetRenderTargetAction: _SetRenderTargetAction2.default,
	TweenTextureOffsetAction: _TweenTextureOffsetAction2.default,
	SetMaterialColorAction: _SetMaterialColorAction2.default,
	TweenMaterialColorAction: _TweenMaterialColorAction2.default,
	LogMessageAction: _LogMessageAction2.default,
	TweenOpacityAction: _TweenOpacityAction2.default,
	HtmlAction: _HtmlAction2.default,
	CopyJointTransformAction: _CopyJointTransformAction2.default,
	TriggerEnterAction: _TriggerEnterAction2.default,
	TriggerLeaveAction: _TriggerLeaveAction2.default,
	ApplyImpulseAction: _ApplyImpulseAction2.default,
	ApplyForceAction: _ApplyForceAction2.default,
	ApplyTorqueAction: _ApplyTorqueAction2.default,
	SetRigidBodyPositionAction: _SetRigidBodyPositionAction2.default,
	SetRigidBodyRotationAction: _SetRigidBodyRotationAction2.default,
	SetRigidBodyVelocityAction: _SetRigidBodyVelocityAction2.default,
	SetRigidBodyAngularVelocityAction: _SetRigidBodyAngularVelocityAction2.default,
	CompareCounterAction: _CompareCounterAction2.default,
	CompareCountersAction: _CompareCountersAction2.default,
	SetCounterAction: _SetCounterAction2.default,
	IncrementCounterAction: _IncrementCounterAction2.default,
	MuteAction: _MuteAction2.default,
	UnmuteAction: _UnmuteAction2.default,
	ToggleMuteAction: _ToggleMuteAction2.default,
	StartTimelineAction: _StartTimelineAction2.default,
	PauseTimelineAction: _PauseTimelineAction2.default,
	StopTimelineAction: _StopTimelineAction2.default,
	SetTimelineTimeAction: _SetTimelineTimeAction2.default,
	SetHtmlTextAction: _SetHtmlTextAction2.default,
	SpriteAnimationAction: _SpriteAnimationAction2.default,
	PauseParticleSystemAction: _PauseParticleSystemAction2.default,
	StopParticleSystemAction: _StopParticleSystemAction2.default,
	StartParticleSystemAction: _StartParticleSystemAction2.default
};

for (var actionName in allActions) {
	var action = allActions[actionName];
	Actions.register(action.external.key, action);
}

exports.default = Actions;
module.exports = exports.default;
