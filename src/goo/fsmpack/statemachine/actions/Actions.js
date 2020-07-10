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
	ArrowsAction: _ArrowsAction.ArrowsAction,
	DomEventAction: _DomEventAction.DomEventAction,
	MouseUpAction: _MouseUpAction.MouseUpAction,
	MouseDownAction: _MouseDownAction.MouseDownAction,
	MouseMoveAction: _MouseMoveAction.MouseMoveAction,
	MousePressedAction: _MousePressedAction.MousePressedAction,
	KeyUpAction: _KeyUpAction.KeyUpAction,
	KeyDownAction: _KeyDownAction.KeyDownAction,
	KeyPressedAction: _KeyPressedAction.KeyPressedAction,
	PickAction: _PickAction.PickAction,
	PickAndExitAction: _PickAndExitAction.PickAndExitAction,
	ClickAction: _ClickAction.ClickAction,
	HoverEnterAction: _HoverEnterAction.HoverEnterAction,
	HoverExitAction: _HoverExitAction.HoverExitAction,
	WasdAction: _WasdAction.WasdAction,
	MoveAction: _MoveAction.MoveAction,
	RotateAction: _RotateAction.RotateAction,
	ScaleAction: _ScaleAction.ScaleAction,
	LookAtAction: _LookAtAction.LookAtAction,
	TweenMoveAction: _TweenMoveAction.TweenMoveAction,
	TweenRotationAction: _TweenRotationAction.TweenRotationAction,
	TweenScaleAction: _TweenScaleAction.TweenScaleAction,
	TweenLookAtAction: _TweenLookAtAction.TweenLookAtAction,
	ShakeAction: _ShakeAction.ShakeAction,
	PauseAnimationAction: _PauseAnimationAction.PauseAnimationAction,
	ResumeAnimationAction: _ResumeAnimationAction.ResumeAnimationAction,
	SetAnimationAction: _SetAnimationAction.SetAnimationAction,
	SetTimeScaleAction: _SetTimeScaleAction.SetTimeScaleAction,
	SetAnimationOffsetAction: _SetAnimationOffsetAction.SetAnimationOffsetAction,
	WaitAction: _WaitAction.WaitAction,
	TransitionAction: _TransitionAction.TransitionAction,
	NextFrameAction: _NextFrameAction.NextFrameAction,
	RandomTransitionAction: _RandomTransitionAction.RandomTransitionAction,
	EmitAction: _EmitAction.EmitAction,
	TransitionOnMessageAction: _TransitionOnMessageAction.TransitionOnMessageAction,
	EvalAction: _EvalAction.EvalAction,
	HideAction: _HideAction.HideAction,
	ShowAction: _ShowAction.ShowAction,
	RemoveAction: _RemoveAction.RemoveAction,
	AddLightAction: _AddLightAction.AddLightAction,
	RemoveLightAction: _RemoveLightAction.RemoveLightAction,
	SetLightPropertiesAction: _SetLightPropertiesAction.SetLightPropertiesAction,
	TweenLightColorAction: _TweenLightColorAction.TweenLightColorAction,
	SetClearColorAction: _SetClearColorAction.SetClearColorAction,
	SwitchCameraAction: _SwitchCameraAction.SwitchCameraAction,
	InFrustumAction: _InFrustumAction.InFrustumAction,
	DollyZoomAction: _DollyZoomAction.DollyZoomAction,
	InBoxAction: _InBoxAction.InBoxAction,
	CompareDistanceAction: _CompareDistanceAction.CompareDistanceAction,
	CollidesAction: _CollidesAction.CollidesAction,
	TagAction: _TagAction.TagAction,
	SmokeAction: _SmokeAction.SmokeAction,
	FireAction: _FireAction.FireAction,
	RemoveParticlesAction: _RemoveParticlesAction.RemoveParticlesAction,
	TogglePostFxAction: _TogglePostFxAction.TogglePostFxAction,
	ToggleFullscreenAction: _ToggleFullscreenAction.ToggleFullscreenAction,
	PlaySoundAction: _PlaySoundAction.PlaySoundAction,
	PauseSoundAction: _PauseSoundAction.PauseSoundAction,
	StopSoundAction: _StopSoundAction.StopSoundAction,
	SoundFadeInAction: _SoundFadeInAction.SoundFadeInAction,
	SoundFadeOutAction: _SoundFadeOutAction.SoundFadeOutAction,
	SetRenderTargetAction: _SetRenderTargetAction.SetRenderTargetAction,
	TweenTextureOffsetAction: _TweenTextureOffsetAction.TweenTextureOffsetAction,
	SetMaterialColorAction: _SetMaterialColorAction.SetMaterialColorAction,
	TweenMaterialColorAction: _TweenMaterialColorAction.TweenMaterialColorAction,
	LogMessageAction: _LogMessageAction.LogMessageAction,
	TweenOpacityAction: _TweenOpacityAction.TweenOpacityAction,
	HtmlAction: _HtmlAction.HtmlAction,
	CopyJointTransformAction: _CopyJointTransformAction.CopyJointTransformAction,
	TriggerEnterAction: _TriggerEnterAction.TriggerEnterAction,
	TriggerLeaveAction: _TriggerLeaveAction.TriggerLeaveAction,
	ApplyImpulseAction: _ApplyImpulseAction.ApplyImpulseAction,
	ApplyForceAction: _ApplyForceAction.ApplyForceAction,
	ApplyTorqueAction: _ApplyTorqueAction.ApplyTorqueAction,
	SetRigidBodyPositionAction: _SetRigidBodyPositionAction.SetRigidBodyPositionAction,
	SetRigidBodyRotationAction: _SetRigidBodyRotationAction.SetRigidBodyRotationAction,
	SetRigidBodyVelocityAction: _SetRigidBodyVelocityAction.SetRigidBodyVelocityAction,
	SetRigidBodyAngularVelocityAction: _SetRigidBodyAngularVelocityAction.SetRigidBodyAngularVelocityAction,
	CompareCounterAction: _CompareCounterAction.CompareCounterAction,
	CompareCountersAction: _CompareCountersAction.CompareCountersAction,
	SetCounterAction: _SetCounterAction.SetCounterAction,
	IncrementCounterAction: _IncrementCounterAction.IncrementCounterAction,
	MuteAction: _MuteAction.MuteAction,
	UnmuteAction: _UnmuteAction.UnmuteAction,
	ToggleMuteAction: _ToggleMuteAction.ToggleMuteAction,
	StartTimelineAction: _StartTimelineAction.StartTimelineAction,
	PauseTimelineAction: _PauseTimelineAction.PauseTimelineAction,
	StopTimelineAction: _StopTimelineAction.StopTimelineAction,
	SetTimelineTimeAction: _SetTimelineTimeAction.SetTimelineTimeAction,
	SetHtmlTextAction: _SetHtmlTextAction.SetHtmlTextAction,
	SpriteAnimationAction: _SpriteAnimationAction.SpriteAnimationAction,
	PauseParticleSystemAction: _PauseParticleSystemAction.PauseParticleSystemAction,
	StopParticleSystemAction: _StopParticleSystemAction.StopParticleSystemAction,
	StartParticleSystemAction: _StartParticleSystemAction.StartParticleSystemAction
};

for (var actionName in allActions) {
	var action = allActions[actionName];
	Actions.register(action.external.key, action);
}

var Actions_Actions;

exports.Actions = Actions_Actions = Actions;
exports.Actions = Actions_Actions;