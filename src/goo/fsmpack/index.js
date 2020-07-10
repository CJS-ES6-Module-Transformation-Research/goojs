"use strict";

var _MachineHandler = require("./MachineHandler");

var _ProximityComponent = require("./proximity/ProximityComponent");

var _ProximitySystem = require("./proximity/ProximitySystem");

var _Action = require("./statemachine/actions/Action");

var _Actions = require("./statemachine/actions/Actions");

var statemachineactionsActions_Actions = _interopRequireWildcard(_Actions);

var _AddLightAction = require("./statemachine/actions/AddLightAction");

var _AddPositionAction = require("./statemachine/actions/AddPositionAction");

var _AddVariableAction = require("./statemachine/actions/AddVariableAction");

var _ApplyImpulseAction = require("./statemachine/actions/ApplyImpulseAction");

var _ArrowsAction = require("./statemachine/actions/ArrowsAction");

var _CollidesAction = require("./statemachine/actions/CollidesAction");

var _CompareCounterAction = require("./statemachine/actions/CompareCounterAction");

var _CompareCountersAction = require("./statemachine/actions/CompareCountersAction");

var _CompareDistanceAction = require("./statemachine/actions/CompareDistanceAction");

var _CopyJointTransformAction = require("./statemachine/actions/CopyJointTransformAction");

var _DollyZoomAction = require("./statemachine/actions/DollyZoomAction");

var _EmitAction = require("./statemachine/actions/EmitAction");

var _EvalAction = require("./statemachine/actions/EvalAction");

var _FireAction = require("./statemachine/actions/FireAction");

var _GetPositionAction = require("./statemachine/actions/GetPositionAction");

var _HideAction = require("./statemachine/actions/HideAction");

var _HtmlAction = require("./statemachine/actions/HtmlAction");

var _InBoxAction = require("./statemachine/actions/InBoxAction");

var _IncrementCounterAction = require("./statemachine/actions/IncrementCounterAction");

var _InFrustumAction = require("./statemachine/actions/InFrustumAction");

var _KeyDownAction = require("./statemachine/actions/KeyDownAction");

var _KeyPressedAction = require("./statemachine/actions/KeyPressedAction");

var _KeyUpAction = require("./statemachine/actions/KeyUpAction");

var _LogMessageAction = require("./statemachine/actions/LogMessageAction");

var _LookAtAction = require("./statemachine/actions/LookAtAction");

var _MouseDownAction = require("./statemachine/actions/MouseDownAction");

var _MouseMoveAction = require("./statemachine/actions/MouseMoveAction");

var _MouseUpAction = require("./statemachine/actions/MouseUpAction");

var _MoveAction = require("./statemachine/actions/MoveAction");

var _MultiplyVariableAction = require("./statemachine/actions/MultiplyVariableAction");

var _NumberCompareAction = require("./statemachine/actions/NumberCompareAction");

var _PauseAnimationAction = require("./statemachine/actions/PauseAnimationAction");

var _PickAction = require("./statemachine/actions/PickAction");

var _PickAndExitAction = require("./statemachine/actions/PickAndExitAction");

var _RandomTransitionAction = require("./statemachine/actions/RandomTransitionAction");

var _RemoveAction = require("./statemachine/actions/RemoveAction");

var _RemoveLightAction = require("./statemachine/actions/RemoveLightAction");

var _RemoveParticlesAction = require("./statemachine/actions/RemoveParticlesAction");

var _ResumeAnimationAction = require("./statemachine/actions/ResumeAnimationAction");

var _RotateAction = require("./statemachine/actions/RotateAction");

var _ScaleAction = require("./statemachine/actions/ScaleAction");

var _SetAnimationAction = require("./statemachine/actions/SetAnimationAction");

var _SetClearColorAction = require("./statemachine/actions/SetClearColorAction");

var _SetCounterAction = require("./statemachine/actions/SetCounterAction");

var _SetLightRangeAction = require("./statemachine/actions/SetLightRangeAction");

var _SetPositionAction = require("./statemachine/actions/SetPositionAction");

var _SetRenderTargetAction = require("./statemachine/actions/SetRenderTargetAction");

var _SetRotationAction = require("./statemachine/actions/SetRotationAction");

var _SetVariableAction = require("./statemachine/actions/SetVariableAction");

var _ShakeAction = require("./statemachine/actions/ShakeAction");

var _ShowAction = require("./statemachine/actions/ShowAction");

var _SmokeAction = require("./statemachine/actions/SmokeAction");

var _SoundFadeInAction = require("./statemachine/actions/SoundFadeInAction");

var _SoundFadeOutAction = require("./statemachine/actions/SoundFadeOutAction");

var _SwitchCameraAction = require("./statemachine/actions/SwitchCameraAction");

var _TagAction = require("./statemachine/actions/TagAction");

var _TransitionAction = require("./statemachine/actions/TransitionAction");

var _TransitionOnMessageAction = require("./statemachine/actions/TransitionOnMessageAction");

var _TriggerEnterAction = require("./statemachine/actions/TriggerEnterAction");

var _TriggerLeaveAction = require("./statemachine/actions/TriggerLeaveAction");

var _TweenLightColorAction = require("./statemachine/actions/TweenLightColorAction");

var _TweenLookAtAction = require("./statemachine/actions/TweenLookAtAction");

var _TweenMoveAction = require("./statemachine/actions/TweenMoveAction");

var _TweenOpacityAction = require("./statemachine/actions/TweenOpacityAction");

var _TweenRotationAction = require("./statemachine/actions/TweenRotationAction");

var _TweenScaleAction = require("./statemachine/actions/TweenScaleAction");

var _TweenTextureOffsetAction = require("./statemachine/actions/TweenTextureOffsetAction");

var _WaitAction = require("./statemachine/actions/WaitAction");

var _WasdAction = require("./statemachine/actions/WasdAction");

var _FSMUtil = require("./statemachine/FSMUtil");

var _FsmUtils = require("./statemachine/FsmUtils");

var _Machine = require("./statemachine/Machine");

var _State = require("./statemachine/State");

var _StateMachineComponent = require("./statemachine/StateMachineComponent");

var _StateMachineSystem = require("./statemachine/StateMachineSystem");

var _StateMachineComponentHandler = require("./StateMachineComponentHandler");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs;
indexjs = {
	MachineHandler: _MachineHandler.MachineHandler,
	ProximityComponent: _ProximityComponent.ProximityComponent,
	ProximitySystem: _ProximitySystem.ProximitySystem,
	Action: _Action.Action,
	Actions: statemachineactionsActions_Actions,
	AddLightAction: _AddLightAction.AddLightAction,
	AddPositionAction: _AddPositionAction.AddPositionAction,
	AddVariableAction: _AddVariableAction.AddVariableAction,
	ApplyImpulseAction: _ApplyImpulseAction.ApplyImpulseAction,
	ArrowsAction: _ArrowsAction.ArrowsAction,
	CollidesAction: _CollidesAction.CollidesAction,
	CompareCounterAction: _CompareCounterAction.CompareCounterAction,
	CompareCountersAction: _CompareCountersAction.CompareCountersAction,
	CompareDistanceAction: _CompareDistanceAction.CompareDistanceAction,
	CopyJointTransformAction: _CopyJointTransformAction.CopyJointTransformAction,
	DollyZoomAction: _DollyZoomAction.DollyZoomAction,
	EmitAction: _EmitAction.EmitAction,
	EvalAction: _EvalAction.EvalAction,
	FireAction: _FireAction.FireAction,
	GetPositionAction: _GetPositionAction.GetPositionAction,
	HideAction: _HideAction.HideAction,
	HtmlAction: _HtmlAction.HtmlAction,
	InBoxAction: _InBoxAction.InBoxAction,
	IncrementCounterAction: _IncrementCounterAction.IncrementCounterAction,
	InFrustumAction: _InFrustumAction.InFrustumAction,
	KeyDownAction: _KeyDownAction.KeyDownAction,
	KeyPressedAction: _KeyPressedAction.KeyPressedAction,
	KeyUpAction: _KeyUpAction.KeyUpAction,
	LogMessageAction: _LogMessageAction.LogMessageAction,
	LookAtAction: _LookAtAction.LookAtAction,
	MouseDownAction: _MouseDownAction.MouseDownAction,
	MouseMoveAction: _MouseMoveAction.MouseMoveAction,
	MouseUpAction: _MouseUpAction.MouseUpAction,
	MoveAction: _MoveAction.MoveAction,
	MultiplyVariableAction: _MultiplyVariableAction.MultiplyVariableAction,
	NumberCompareAction: _NumberCompareAction.NumberCompareAction,
	PauseAnimationAction: _PauseAnimationAction.PauseAnimationAction,
	PickAction: _PickAction.PickAction,
	PickAndExitAction: _PickAndExitAction.PickAndExitAction,
	RandomTransitionAction: _RandomTransitionAction.RandomTransitionAction,
	RemoveAction: _RemoveAction.RemoveAction,
	RemoveLightAction: _RemoveLightAction.RemoveLightAction,
	RemoveParticlesAction: _RemoveParticlesAction.RemoveParticlesAction,
	ResumeAnimationAction: _ResumeAnimationAction.ResumeAnimationAction,
	RotateAction: _RotateAction.RotateAction,
	ScaleAction: _ScaleAction.ScaleAction,
	SetAnimationAction: _SetAnimationAction.SetAnimationAction,
	SetClearColorAction: _SetClearColorAction.SetClearColorAction,
	SetCounterAction: _SetCounterAction.SetCounterAction,
	SetLightRangeAction: _SetLightRangeAction.SetLightRangeAction,
	SetPositionAction: _SetPositionAction.SetPositionAction,
	SetRenderTargetAction: _SetRenderTargetAction.SetRenderTargetAction,
	SetRotationAction: _SetRotationAction.SetRotationAction,
	SetVariableAction: _SetVariableAction.SetVariableAction,
	ShakeAction: _ShakeAction.ShakeAction,
	ShowAction: _ShowAction.ShowAction,
	SmokeAction: _SmokeAction.SmokeAction,
	SoundFadeInAction: _SoundFadeInAction.SoundFadeInAction,
	SoundFadeOutAction: _SoundFadeOutAction.SoundFadeOutAction,
	SwitchCameraAction: _SwitchCameraAction.SwitchCameraAction,
	TagAction: _TagAction.TagAction,
	TransitionAction: _TransitionAction.TransitionAction,
	TransitionOnMessageAction: _TransitionOnMessageAction.TransitionOnMessageAction,
	TriggerEnterAction: _TriggerEnterAction.TriggerEnterAction,
	TriggerLeaveAction: _TriggerLeaveAction.TriggerLeaveAction,
	TweenLightColorAction: _TweenLightColorAction.TweenLightColorAction,
	TweenLookAtAction: _TweenLookAtAction.TweenLookAtAction,
	TweenMoveAction: _TweenMoveAction.TweenMoveAction,
	TweenOpacityAction: _TweenOpacityAction.TweenOpacityAction,
	TweenRotationAction: _TweenRotationAction.TweenRotationAction,
	TweenScaleAction: _TweenScaleAction.TweenScaleAction,
	TweenTextureOffsetAction: _TweenTextureOffsetAction.TweenTextureOffsetAction,
	WaitAction: _WaitAction.WaitAction,
	WasdAction: _WasdAction.WasdAction,
	FSMUtil: _FSMUtil.FsmUtils,
	FsmUtils: _FsmUtils.FsmUtils,
	Machine: _Machine.Machine,
	State: _State.State,
	StateMachineComponent: _StateMachineComponent.StateMachineComponent,
	StateMachineSystem: _StateMachineSystem.StateMachineSystem,
	StateMachineComponentHandler: _StateMachineComponentHandler.StateMachineComponentHandler,
	StateMachineHandlers: {}
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}