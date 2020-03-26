"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Actions = undefined;

var _ArrowsAction = require("./ArrowsAction");

var _DomEventAction = require("./DomEventAction");

var _MouseUpAction = require("./MouseUpAction");

var _MouseDownAction = require("./MouseDownAction");

var _MouseMoveAction = require("./MouseMoveAction");

var _MousePressedAction = require("./MousePressedAction");

var _KeyUpAction = require("./KeyUpAction");

var _KeyDownAction = require("./KeyDownAction");

var _KeyPressedAction = require("./KeyPressedAction");

var _PickAction = require("./PickAction");

var _PickAndExitAction = require("./PickAndExitAction");

var _ClickAction = require("./ClickAction");

var _HoverEnterAction = require("./HoverEnterAction");

var _HoverExitAction = require("./HoverExitAction");

var _WasdAction = require("./WasdAction");

var _MoveAction = require("./MoveAction");

var _RotateAction = require("./RotateAction");

var _ScaleAction = require("./ScaleAction");

var _LookAtAction = require("./LookAtAction");

var _TweenMoveAction = require("./TweenMoveAction");

var _TweenRotationAction = require("./TweenRotationAction");

var _TweenScaleAction = require("./TweenScaleAction");

var _TweenLookAtAction = require("./TweenLookAtAction");

var _ShakeAction = require("./ShakeAction");

var _PauseAnimationAction = require("./PauseAnimationAction");

var _ResumeAnimationAction = require("./ResumeAnimationAction");

var _SetAnimationAction = require("./SetAnimationAction");

var _SetTimeScaleAction = require("./SetTimeScaleAction");

var _SetAnimationOffsetAction = require("./SetAnimationOffsetAction");

var _WaitAction = require("./WaitAction");

var _TransitionAction = require("./TransitionAction");

var _NextFrameAction = require("./NextFrameAction");

var _RandomTransitionAction = require("./RandomTransitionAction");

var _EmitAction = require("./EmitAction");

var _TransitionOnMessageAction = require("./TransitionOnMessageAction");

var _EvalAction = require("./EvalAction");

var _HideAction = require("./HideAction");

var _ShowAction = require("./ShowAction");

var _RemoveAction = require("./RemoveAction");

var _AddLightAction = require("./AddLightAction");

var _RemoveLightAction = require("./RemoveLightAction");

var _SetLightPropertiesAction = require("./SetLightPropertiesAction");

var _TweenLightColorAction = require("./TweenLightColorAction");

var _SetClearColorAction = require("./SetClearColorAction");

var _SwitchCameraAction = require("./SwitchCameraAction");

var _InFrustumAction = require("./InFrustumAction");

var _DollyZoomAction = require("./DollyZoomAction");

var _InBoxAction = require("./InBoxAction");

var _CompareDistanceAction = require("./CompareDistanceAction");

var _CollidesAction = require("./CollidesAction");

var _TagAction = require("./TagAction");

var _SmokeAction = require("./SmokeAction");

var _FireAction = require("./FireAction");

var _RemoveParticlesAction = require("./RemoveParticlesAction");

var _TogglePostFxAction = require("./TogglePostFxAction");

var _ToggleFullscreenAction = require("./ToggleFullscreenAction");

var _PlaySoundAction = require("./PlaySoundAction");

var _PauseSoundAction = require("./PauseSoundAction");

var _StopSoundAction = require("./StopSoundAction");

var _SoundFadeInAction = require("./SoundFadeInAction");

var _SoundFadeOutAction = require("./SoundFadeOutAction");

var _SetRenderTargetAction = require("./SetRenderTargetAction");

var _TweenTextureOffsetAction = require("./TweenTextureOffsetAction");

var _SetMaterialColorAction = require("./SetMaterialColorAction");

var _TweenMaterialColorAction = require("./TweenMaterialColorAction");

var _LogMessageAction = require("./LogMessageAction");

var _TweenOpacityAction = require("./TweenOpacityAction");

var _HtmlAction = require("./HtmlAction");

var _CopyJointTransformAction = require("./CopyJointTransformAction");

var _TriggerEnterAction = require("./TriggerEnterAction");

var _TriggerLeaveAction = require("./TriggerLeaveAction");

var _ApplyImpulseAction = require("./ApplyImpulseAction");

var _ApplyForceAction = require("./ApplyForceAction");

var _ApplyTorqueAction = require("./ApplyTorqueAction");

var _SetRigidBodyPositionAction = require("./SetRigidBodyPositionAction");

var _SetRigidBodyRotationAction = require("./SetRigidBodyRotationAction");

var _SetRigidBodyVelocityAction = require("./SetRigidBodyVelocityAction");

var _SetRigidBodyAngularVelocityAction = require("./SetRigidBodyAngularVelocityAction");

var _CompareCounterAction = require("./CompareCounterAction");

var _CompareCountersAction = require("./CompareCountersAction");

var _SetCounterAction = require("./SetCounterAction");

var _IncrementCounterAction = require("./IncrementCounterAction");

var _MuteAction = require("./MuteAction");

var _UnmuteAction = require("./UnmuteAction");

var _ToggleMuteAction = require("./ToggleMuteAction");

var _StartTimelineAction = require("./StartTimelineAction");

var _PauseTimelineAction = require("./PauseTimelineAction");

var _StopTimelineAction = require("./StopTimelineAction");

var _SetTimelineTimeAction = require("./SetTimelineTimeAction");

var _SetHtmlTextAction = require("./SetHtmlTextAction");

var _SpriteAnimationAction = require("./SpriteAnimationAction");

var _PauseParticleSystemAction = require("./PauseParticleSystemAction");

var _StopParticleSystemAction = require("./StopParticleSystemAction");

var _StartParticleSystemAction = require("./StartParticleSystemAction");

var _actions = {};

var Actions = function Actions() {};

var exported_Actions = Actions;

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
	ArrowsAction: _ArrowsAction.allActions,
	DomEventAction: _DomEventAction.allActions,
	MouseUpAction: _MouseUpAction.allActions,
	MouseDownAction: _MouseDownAction.allActions,
	MouseMoveAction: _MouseMoveAction.allActions,
	MousePressedAction: _MousePressedAction.allActions,
	KeyUpAction: _KeyUpAction.allActions,
	KeyDownAction: _KeyDownAction.allActions,
	KeyPressedAction: _KeyPressedAction.allActions,
	PickAction: _PickAction.allActions,
	PickAndExitAction: _PickAndExitAction.allActions,
	ClickAction: _ClickAction.allActions,
	HoverEnterAction: _HoverEnterAction.allActions,
	HoverExitAction: _HoverExitAction.allActions,
	WasdAction: _WasdAction.allActions,
	MoveAction: _MoveAction.allActions,
	RotateAction: _RotateAction.allActions,
	ScaleAction: _ScaleAction.allActions,
	LookAtAction: _LookAtAction.allActions,
	TweenMoveAction: _TweenMoveAction.allActions,
	TweenRotationAction: _TweenRotationAction.allActions,
	TweenScaleAction: _TweenScaleAction.allActions,
	TweenLookAtAction: _TweenLookAtAction.allActions,
	ShakeAction: _ShakeAction.allActions,
	PauseAnimationAction: _PauseAnimationAction.allActions,
	ResumeAnimationAction: _ResumeAnimationAction.allActions,
	SetAnimationAction: _SetAnimationAction.allActions,
	SetTimeScaleAction: _SetTimeScaleAction.allActions,
	SetAnimationOffsetAction: _SetAnimationOffsetAction.allActions,
	WaitAction: _WaitAction.allActions,
	TransitionAction: _TransitionAction.allActions,
	NextFrameAction: _NextFrameAction.allActions,
	RandomTransitionAction: _RandomTransitionAction.allActions,
	EmitAction: _EmitAction.allActions,
	TransitionOnMessageAction: _TransitionOnMessageAction.allActions,
	EvalAction: _EvalAction.allActions,
	HideAction: _HideAction.allActions,
	ShowAction: _ShowAction.allActions,
	RemoveAction: _RemoveAction.allActions,
	AddLightAction: _AddLightAction.allActions,
	RemoveLightAction: _RemoveLightAction.allActions,
	SetLightPropertiesAction: _SetLightPropertiesAction.allActions,
	TweenLightColorAction: _TweenLightColorAction.allActions,
	SetClearColorAction: _SetClearColorAction.allActions,
	SwitchCameraAction: _SwitchCameraAction.allActions,
	InFrustumAction: _InFrustumAction.allActions,
	DollyZoomAction: _DollyZoomAction.allActions,
	InBoxAction: _InBoxAction.allActions,
	CompareDistanceAction: _CompareDistanceAction.allActions,
	CollidesAction: _CollidesAction.allActions,
	TagAction: _TagAction.allActions,
	SmokeAction: _SmokeAction.allActions,
	FireAction: _FireAction.allActions,
	RemoveParticlesAction: _RemoveParticlesAction.allActions,
	TogglePostFxAction: _TogglePostFxAction.allActions,
	ToggleFullscreenAction: _ToggleFullscreenAction.allActions,
	PlaySoundAction: _PlaySoundAction.allActions,
	PauseSoundAction: _PauseSoundAction.allActions,
	StopSoundAction: _StopSoundAction.allActions,
	SoundFadeInAction: _SoundFadeInAction.allActions,
	SoundFadeOutAction: _SoundFadeOutAction.allActions,
	SetRenderTargetAction: _SetRenderTargetAction.allActions,
	TweenTextureOffsetAction: _TweenTextureOffsetAction.allActions,
	SetMaterialColorAction: _SetMaterialColorAction.allActions,
	TweenMaterialColorAction: _TweenMaterialColorAction.allActions,
	LogMessageAction: _LogMessageAction.allActions,
	TweenOpacityAction: _TweenOpacityAction.allActions,
	HtmlAction: _HtmlAction.allActions,
	CopyJointTransformAction: _CopyJointTransformAction.allActions,
	TriggerEnterAction: _TriggerEnterAction.allActions,
	TriggerLeaveAction: _TriggerLeaveAction.allActions,
	ApplyImpulseAction: _ApplyImpulseAction.allActions,
	ApplyForceAction: _ApplyForceAction.allActions,
	ApplyTorqueAction: _ApplyTorqueAction.allActions,
	SetRigidBodyPositionAction: _SetRigidBodyPositionAction.allActions,
	SetRigidBodyRotationAction: _SetRigidBodyRotationAction.allActions,
	SetRigidBodyVelocityAction: _SetRigidBodyVelocityAction.allActions,
	SetRigidBodyAngularVelocityAction: _SetRigidBodyAngularVelocityAction.allActions,
	CompareCounterAction: _CompareCounterAction.allActions,
	CompareCountersAction: _CompareCountersAction.allActions,
	SetCounterAction: _SetCounterAction.allActions,
	IncrementCounterAction: _IncrementCounterAction.allActions,
	MuteAction: _MuteAction.allActions,
	UnmuteAction: _UnmuteAction.allActions,
	ToggleMuteAction: _ToggleMuteAction.allActions,
	StartTimelineAction: _StartTimelineAction.allActions,
	PauseTimelineAction: _PauseTimelineAction.allActions,
	StopTimelineAction: _StopTimelineAction.allActions,
	SetTimelineTimeAction: _SetTimelineTimeAction.allActions,
	SetHtmlTextAction: _SetHtmlTextAction.allActions,
	SpriteAnimationAction: _SpriteAnimationAction.allActions,
	PauseParticleSystemAction: _PauseParticleSystemAction.allActions,
	StopParticleSystemAction: _StopParticleSystemAction.allActions,
	StartParticleSystemAction: _StartParticleSystemAction.allActions
};

for (var actionName in _ArrowsAction.allActions) {
	var action = _ArrowsAction.allActions[actionName];
	Actions.register(action.external.key, action);
}

exports.Actions = exported_Actions;
