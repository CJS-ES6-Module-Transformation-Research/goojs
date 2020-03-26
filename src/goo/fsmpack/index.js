"use strict";

var _MachineHandler = require("./MachineHandler");

var _ProximityComponent = require("./proximity/ProximityComponent");

var _ProximitySystem = require("./proximity/ProximitySystem");

var _Action = require("./statemachine/actions/Action");

var _Actions = require("./statemachine/actions/Actions");

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

var indexjs;
indexjs = {
	MachineHandler: _MachineHandler.MachineHandlerjs,
	ProximityComponent: _ProximityComponent.ProximityComponentjs,
	ProximitySystem: _ProximitySystem.ProximitySystemjs,
	Action: _Action.Actionjs,
	Actions: _Actions.Actionsjs,
	AddLightAction: _AddLightAction.AddLightActionjs,
	AddPositionAction: _AddPositionAction.AddPositionActionjs,
	AddVariableAction: _AddVariableAction.AddVariableActionjs,
	ApplyImpulseAction: _ApplyImpulseAction.ApplyImpulseActionjs,
	ArrowsAction: _ArrowsAction.ArrowsActionjs,
	CollidesAction: _CollidesAction.CollidesActionjs,
	CompareCounterAction: _CompareCounterAction.CompareCounterActionjs,
	CompareCountersAction: _CompareCountersAction.CompareCountersActionjs,
	CompareDistanceAction: _CompareDistanceAction.CompareDistanceActionjs,
	CopyJointTransformAction: _CopyJointTransformAction.CopyJointTransformActionjs,
	DollyZoomAction: _DollyZoomAction.DollyZoomActionjs,
	EmitAction: _EmitAction.EmitActionjs,
	EvalAction: _EvalAction.EvalActionjs,
	FireAction: _FireAction.FireActionjs,
	GetPositionAction: _GetPositionAction.GetPositionActionjs,
	HideAction: _HideAction.HideActionjs,
	HtmlAction: _HtmlAction.HtmlActionjs,
	InBoxAction: _InBoxAction.InBoxActionjs,
	IncrementCounterAction: _IncrementCounterAction.IncrementCounterActionjs,
	InFrustumAction: _InFrustumAction.InFrustumActionjs,
	KeyDownAction: _KeyDownAction.KeyDownActionjs,
	KeyPressedAction: _KeyPressedAction.KeyPressedActionjs,
	KeyUpAction: _KeyUpAction.KeyUpActionjs,
	LogMessageAction: _LogMessageAction.LogMessageActionjs,
	LookAtAction: _LookAtAction.LookAtActionjs,
	MouseDownAction: _MouseDownAction.MouseDownActionjs,
	MouseMoveAction: _MouseMoveAction.MouseMoveActionjs,
	MouseUpAction: _MouseUpAction.MouseUpActionjs,
	MoveAction: _MoveAction.MoveActionjs,
	MultiplyVariableAction: _MultiplyVariableAction.MultiplyVariableActionjs,
	NumberCompareAction: _NumberCompareAction.NumberCompareActionjs,
	PauseAnimationAction: _PauseAnimationAction.PauseAnimationActionjs,
	PickAction: _PickAction.PickActionjs,
	PickAndExitAction: _PickAndExitAction.PickAndExitActionjs,
	RandomTransitionAction: _RandomTransitionAction.RandomTransitionActionjs,
	RemoveAction: _RemoveAction.RemoveActionjs,
	RemoveLightAction: _RemoveLightAction.RemoveLightActionjs,
	RemoveParticlesAction: _RemoveParticlesAction.RemoveParticlesActionjs,
	ResumeAnimationAction: _ResumeAnimationAction.ResumeAnimationActionjs,
	RotateAction: _RotateAction.RotateActionjs,
	ScaleAction: _ScaleAction.ScaleActionjs,
	SetAnimationAction: _SetAnimationAction.SetAnimationActionjs,
	SetClearColorAction: _SetClearColorAction.SetClearColorActionjs,
	SetCounterAction: _SetCounterAction.SetCounterActionjs,
	SetLightRangeAction: _SetLightRangeAction.SetLightRangeActionjs,
	SetPositionAction: _SetPositionAction.SetPositionActionjs,
	SetRenderTargetAction: _SetRenderTargetAction.SetRenderTargetActionjs,
	SetRotationAction: _SetRotationAction.SetRotationActionjs,
	SetVariableAction: _SetVariableAction.SetVariableActionjs,
	ShakeAction: _ShakeAction.ShakeActionjs,
	ShowAction: _ShowAction.ShowActionjs,
	SmokeAction: _SmokeAction.SmokeActionjs,
	SoundFadeInAction: _SoundFadeInAction.SoundFadeInActionjs,
	SoundFadeOutAction: _SoundFadeOutAction.SoundFadeOutActionjs,
	SwitchCameraAction: _SwitchCameraAction.SwitchCameraActionjs,
	TagAction: _TagAction.TagActionjs,
	TransitionAction: _TransitionAction.TransitionActionjs,
	TransitionOnMessageAction: _TransitionOnMessageAction.TransitionOnMessageActionjs,
	TriggerEnterAction: _TriggerEnterAction.TriggerEnterActionjs,
	TriggerLeaveAction: _TriggerLeaveAction.TriggerLeaveActionjs,
	TweenLightColorAction: _TweenLightColorAction.TweenLightColorActionjs,
	TweenLookAtAction: _TweenLookAtAction.TweenLookAtActionjs,
	TweenMoveAction: _TweenMoveAction.TweenMoveActionjs,
	TweenOpacityAction: _TweenOpacityAction.TweenOpacityActionjs,
	TweenRotationAction: _TweenRotationAction.TweenRotationActionjs,
	TweenScaleAction: _TweenScaleAction.TweenScaleActionjs,
	TweenTextureOffsetAction: _TweenTextureOffsetAction.TweenTextureOffsetActionjs,
	WaitAction: _WaitAction.WaitActionjs,
	WasdAction: _WasdAction.WasdActionjs,
	FSMUtil: _FSMUtil.FSMUtiljs,
	FsmUtils: _FsmUtils.FsmUtilsjs,
	Machine: _Machine.Machinejs,
	State: _State.Statejs,
	StateMachineComponent: _StateMachineComponent.StateMachineComponentjs,
	StateMachineSystem: _StateMachineSystem.StateMachineSystemjs,
	StateMachineComponentHandler: _StateMachineComponentHandler.StateMachineComponentHandlerjs,
	StateMachineHandlers: {}
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
