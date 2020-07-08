import { MachineHandler as MachineHandler_MachineHandler } from "./MachineHandler";
import { ProximityComponent as proximityProximityComponent_ProximityComponent } from "./proximity/ProximityComponent";
import { ProximitySystem as proximityProximitySystem_ProximitySystem } from "./proximity/ProximitySystem";
import { Action as statemachineactionsAction_Action } from "./statemachine/actions/Action";
import { Actions as statemachineactionsActions_Actions } from "./statemachine/actions/Actions";
import { AddLightAction as statemachineactionsAddLightAction_AddLightAction } from "./statemachine/actions/AddLightAction";
import {     AddPositionAction as statemachineactionsAddPositionAction_AddPositionAction, } from "./statemachine/actions/AddPositionAction";
import {     AddVariableAction as statemachineactionsAddVariableAction_AddVariableAction, } from "./statemachine/actions/AddVariableAction";
import {     ApplyImpulseAction as statemachineactionsApplyImpulseAction_ApplyImpulseAction, } from "./statemachine/actions/ApplyImpulseAction";
import { ArrowsAction as statemachineactionsArrowsAction_ArrowsAction } from "./statemachine/actions/ArrowsAction";
import { CollidesAction as statemachineactionsCollidesAction_CollidesAction } from "./statemachine/actions/CollidesAction";
import {     CompareCounterAction as statemachineactionsCompareCounterAction_CompareCounterAction, } from "./statemachine/actions/CompareCounterAction";
import {     CompareCountersAction as statemachineactionsCompareCountersAction_CompareCountersAction, } from "./statemachine/actions/CompareCountersAction";
import {     CompareDistanceAction as statemachineactionsCompareDistanceAction_CompareDistanceAction, } from "./statemachine/actions/CompareDistanceAction";
import {     CopyJointTransformAction as statemachineactionsCopyJointTransformAction_CopyJointTransformAction, } from "./statemachine/actions/CopyJointTransformAction";
import { DollyZoomAction as statemachineactionsDollyZoomAction_DollyZoomAction } from "./statemachine/actions/DollyZoomAction";
import { EmitAction as statemachineactionsEmitAction_EmitAction } from "./statemachine/actions/EmitAction";
import { EvalAction as statemachineactionsEvalAction_EvalAction } from "./statemachine/actions/EvalAction";
import { FireAction as statemachineactionsFireAction_FireAction } from "./statemachine/actions/FireAction";
import {     GetPositionAction as statemachineactionsGetPositionAction_GetPositionAction, } from "./statemachine/actions/GetPositionAction";
import { HideAction as statemachineactionsHideAction_HideAction } from "./statemachine/actions/HideAction";
import { HtmlAction as statemachineactionsHtmlAction_HtmlAction } from "./statemachine/actions/HtmlAction";
import { InBoxAction as statemachineactionsInBoxAction_InBoxAction } from "./statemachine/actions/InBoxAction";
import {     IncrementCounterAction as statemachineactionsIncrementCounterAction_IncrementCounterAction, } from "./statemachine/actions/IncrementCounterAction";
import { InFrustumAction as statemachineactionsInFrustumAction_InFrustumAction } from "./statemachine/actions/InFrustumAction";
import { KeyDownAction as statemachineactionsKeyDownAction_KeyDownAction } from "./statemachine/actions/KeyDownAction";
import { KeyPressedAction as statemachineactionsKeyPressedAction_KeyPressedAction } from "./statemachine/actions/KeyPressedAction";
import { KeyUpAction as statemachineactionsKeyUpAction_KeyUpAction } from "./statemachine/actions/KeyUpAction";
import { LogMessageAction as statemachineactionsLogMessageAction_LogMessageAction } from "./statemachine/actions/LogMessageAction";
import { LookAtAction as statemachineactionsLookAtAction_LookAtAction } from "./statemachine/actions/LookAtAction";
import { MouseDownAction as statemachineactionsMouseDownAction_MouseDownAction } from "./statemachine/actions/MouseDownAction";
import { MouseMoveAction as statemachineactionsMouseMoveAction_MouseMoveAction } from "./statemachine/actions/MouseMoveAction";
import { MouseUpAction as statemachineactionsMouseUpAction_MouseUpAction } from "./statemachine/actions/MouseUpAction";
import { MoveAction as statemachineactionsMoveAction_MoveAction } from "./statemachine/actions/MoveAction";
import {     MultiplyVariableAction as statemachineactionsMultiplyVariableAction_MultiplyVariableAction, } from "./statemachine/actions/MultiplyVariableAction";
import {     NumberCompareAction as statemachineactionsNumberCompareAction_NumberCompareAction, } from "./statemachine/actions/NumberCompareAction";
import {     PauseAnimationAction as statemachineactionsPauseAnimationAction_PauseAnimationAction, } from "./statemachine/actions/PauseAnimationAction";
import { PickAction as statemachineactionsPickAction_PickAction } from "./statemachine/actions/PickAction";
import {     PickAndExitAction as statemachineactionsPickAndExitAction_PickAndExitAction, } from "./statemachine/actions/PickAndExitAction";
import {     RandomTransitionAction as statemachineactionsRandomTransitionAction_RandomTransitionAction, } from "./statemachine/actions/RandomTransitionAction";
import { RemoveAction as statemachineactionsRemoveAction_RemoveAction } from "./statemachine/actions/RemoveAction";
import {     RemoveLightAction as statemachineactionsRemoveLightAction_RemoveLightAction, } from "./statemachine/actions/RemoveLightAction";
import {     RemoveParticlesAction as statemachineactionsRemoveParticlesAction_RemoveParticlesAction, } from "./statemachine/actions/RemoveParticlesAction";
import {     ResumeAnimationAction as statemachineactionsResumeAnimationAction_ResumeAnimationAction, } from "./statemachine/actions/ResumeAnimationAction";
import { RotateAction as statemachineactionsRotateAction_RotateAction } from "./statemachine/actions/RotateAction";
import { ScaleAction as statemachineactionsScaleAction_ScaleAction } from "./statemachine/actions/ScaleAction";
import {     SetAnimationAction as statemachineactionsSetAnimationAction_SetAnimationAction, } from "./statemachine/actions/SetAnimationAction";
import {     SetClearColorAction as statemachineactionsSetClearColorAction_SetClearColorAction, } from "./statemachine/actions/SetClearColorAction";
import { SetCounterAction as statemachineactionsSetCounterAction_SetCounterAction } from "./statemachine/actions/SetCounterAction";
import {     SetLightRangeAction as statemachineactionsSetLightRangeAction_SetLightRangeAction, } from "./statemachine/actions/SetLightRangeAction";
import {     SetPositionAction as statemachineactionsSetPositionAction_SetPositionAction, } from "./statemachine/actions/SetPositionAction";
import {     SetRenderTargetAction as statemachineactionsSetRenderTargetAction_SetRenderTargetAction, } from "./statemachine/actions/SetRenderTargetAction";
import {     SetRotationAction as statemachineactionsSetRotationAction_SetRotationAction, } from "./statemachine/actions/SetRotationAction";
import {     SetVariableAction as statemachineactionsSetVariableAction_SetVariableAction, } from "./statemachine/actions/SetVariableAction";
import { ShakeAction as statemachineactionsShakeAction_ShakeAction } from "./statemachine/actions/ShakeAction";
import { ShowAction as statemachineactionsShowAction_ShowAction } from "./statemachine/actions/ShowAction";
import { SmokeAction as statemachineactionsSmokeAction_SmokeAction } from "./statemachine/actions/SmokeAction";
import {     SoundFadeInAction as statemachineactionsSoundFadeInAction_SoundFadeInAction, } from "./statemachine/actions/SoundFadeInAction";
import {     SoundFadeOutAction as statemachineactionsSoundFadeOutAction_SoundFadeOutAction, } from "./statemachine/actions/SoundFadeOutAction";
import {     SwitchCameraAction as statemachineactionsSwitchCameraAction_SwitchCameraAction, } from "./statemachine/actions/SwitchCameraAction";
import { TagAction as statemachineactionsTagAction_TagAction } from "./statemachine/actions/TagAction";
import { TransitionAction as statemachineactionsTransitionAction_TransitionAction } from "./statemachine/actions/TransitionAction";
import {     TransitionOnMessageAction as statemachineactionsTransitionOnMessageAction_TransitionOnMessageAction, } from "./statemachine/actions/TransitionOnMessageAction";
import {     TriggerEnterAction as statemachineactionsTriggerEnterAction_TriggerEnterAction, } from "./statemachine/actions/TriggerEnterAction";
import {     TriggerLeaveAction as statemachineactionsTriggerLeaveAction_TriggerLeaveAction, } from "./statemachine/actions/TriggerLeaveAction";
import {     TweenLightColorAction as statemachineactionsTweenLightColorAction_TweenLightColorAction, } from "./statemachine/actions/TweenLightColorAction";
import {     TweenLookAtAction as statemachineactionsTweenLookAtAction_TweenLookAtAction, } from "./statemachine/actions/TweenLookAtAction";
import { TweenMoveAction as statemachineactionsTweenMoveAction_TweenMoveAction } from "./statemachine/actions/TweenMoveAction";
import {     TweenOpacityAction as statemachineactionsTweenOpacityAction_TweenOpacityAction, } from "./statemachine/actions/TweenOpacityAction";
import {     TweenRotationAction as statemachineactionsTweenRotationAction_TweenRotationAction, } from "./statemachine/actions/TweenRotationAction";
import { TweenScaleAction as statemachineactionsTweenScaleAction_TweenScaleAction } from "./statemachine/actions/TweenScaleAction";
import {     TweenTextureOffsetAction as statemachineactionsTweenTextureOffsetAction_TweenTextureOffsetAction, } from "./statemachine/actions/TweenTextureOffsetAction";
import { WaitAction as statemachineactionsWaitAction_WaitAction } from "./statemachine/actions/WaitAction";
import { WasdAction as statemachineactionsWasdAction_WasdAction } from "./statemachine/actions/WasdAction";
import { FsmUtils as statemachineFSMUtil_FsmUtils } from "./statemachine/FSMUtil";
import * as statemachineFsmUtils_FsmUtils from "./statemachine/FsmUtils";
import { Machine as statemachineMachine_Machine } from "./statemachine/Machine";
import { State as statemachineState_State } from "./statemachine/State";
import * as statemachineStateMachineComponent_StateMachineComponent from "./statemachine/StateMachineComponent";
import { StateMachineSystem as statemachineStateMachineSystem_StateMachineSystem } from "./statemachine/StateMachineSystem";
import {     StateMachineComponentHandler as StateMachineComponentHandler_StateMachineComponentHandler, } from "./StateMachineComponentHandler";
var indexjs;
indexjs = {
	MachineHandler: MachineHandler_MachineHandler,
	ProximityComponent: proximityProximityComponent_ProximityComponent,
	ProximitySystem: proximityProximitySystem_ProximitySystem,
	Action: statemachineactionsAction_Action,
	Actions: statemachineactionsActions_Actions,
	AddLightAction: statemachineactionsAddLightAction_AddLightAction,
	AddPositionAction: statemachineactionsAddPositionAction_AddPositionAction,
	AddVariableAction: statemachineactionsAddVariableAction_AddVariableAction,
	ApplyImpulseAction: statemachineactionsApplyImpulseAction_ApplyImpulseAction,
	ArrowsAction: statemachineactionsArrowsAction_ArrowsAction,
	CollidesAction: statemachineactionsCollidesAction_CollidesAction,
	CompareCounterAction: statemachineactionsCompareCounterAction_CompareCounterAction,
	CompareCountersAction: statemachineactionsCompareCountersAction_CompareCountersAction,
	CompareDistanceAction: statemachineactionsCompareDistanceAction_CompareDistanceAction,
	CopyJointTransformAction: statemachineactionsCopyJointTransformAction_CopyJointTransformAction,
	DollyZoomAction: statemachineactionsDollyZoomAction_DollyZoomAction,
	EmitAction: statemachineactionsEmitAction_EmitAction,
	EvalAction: statemachineactionsEvalAction_EvalAction,
	FireAction: statemachineactionsFireAction_FireAction,
	GetPositionAction: statemachineactionsGetPositionAction_GetPositionAction,
	HideAction: statemachineactionsHideAction_HideAction,
	HtmlAction: statemachineactionsHtmlAction_HtmlAction,
	InBoxAction: statemachineactionsInBoxAction_InBoxAction,
	IncrementCounterAction: statemachineactionsIncrementCounterAction_IncrementCounterAction,
	InFrustumAction: statemachineactionsInFrustumAction_InFrustumAction,
	KeyDownAction: statemachineactionsKeyDownAction_KeyDownAction,
	KeyPressedAction: statemachineactionsKeyPressedAction_KeyPressedAction,
	KeyUpAction: statemachineactionsKeyUpAction_KeyUpAction,
	LogMessageAction: statemachineactionsLogMessageAction_LogMessageAction,
	LookAtAction: statemachineactionsLookAtAction_LookAtAction,
	MouseDownAction: statemachineactionsMouseDownAction_MouseDownAction,
	MouseMoveAction: statemachineactionsMouseMoveAction_MouseMoveAction,
	MouseUpAction: statemachineactionsMouseUpAction_MouseUpAction,
	MoveAction: statemachineactionsMoveAction_MoveAction,
	MultiplyVariableAction: statemachineactionsMultiplyVariableAction_MultiplyVariableAction,
	NumberCompareAction: statemachineactionsNumberCompareAction_NumberCompareAction,
	PauseAnimationAction: statemachineactionsPauseAnimationAction_PauseAnimationAction,
	PickAction: statemachineactionsPickAction_PickAction,
	PickAndExitAction: statemachineactionsPickAndExitAction_PickAndExitAction,
	RandomTransitionAction: statemachineactionsRandomTransitionAction_RandomTransitionAction,
	RemoveAction: statemachineactionsRemoveAction_RemoveAction,
	RemoveLightAction: statemachineactionsRemoveLightAction_RemoveLightAction,
	RemoveParticlesAction: statemachineactionsRemoveParticlesAction_RemoveParticlesAction,
	ResumeAnimationAction: statemachineactionsResumeAnimationAction_ResumeAnimationAction,
	RotateAction: statemachineactionsRotateAction_RotateAction,
	ScaleAction: statemachineactionsScaleAction_ScaleAction,
	SetAnimationAction: statemachineactionsSetAnimationAction_SetAnimationAction,
	SetClearColorAction: statemachineactionsSetClearColorAction_SetClearColorAction,
	SetCounterAction: statemachineactionsSetCounterAction_SetCounterAction,
	SetLightRangeAction: statemachineactionsSetLightRangeAction_SetLightRangeAction,
	SetPositionAction: statemachineactionsSetPositionAction_SetPositionAction,
	SetRenderTargetAction: statemachineactionsSetRenderTargetAction_SetRenderTargetAction,
	SetRotationAction: statemachineactionsSetRotationAction_SetRotationAction,
	SetVariableAction: statemachineactionsSetVariableAction_SetVariableAction,
	ShakeAction: statemachineactionsShakeAction_ShakeAction,
	ShowAction: statemachineactionsShowAction_ShowAction,
	SmokeAction: statemachineactionsSmokeAction_SmokeAction,
	SoundFadeInAction: statemachineactionsSoundFadeInAction_SoundFadeInAction,
	SoundFadeOutAction: statemachineactionsSoundFadeOutAction_SoundFadeOutAction,
	SwitchCameraAction: statemachineactionsSwitchCameraAction_SwitchCameraAction,
	TagAction: statemachineactionsTagAction_TagAction,
	TransitionAction: statemachineactionsTransitionAction_TransitionAction,
	TransitionOnMessageAction: statemachineactionsTransitionOnMessageAction_TransitionOnMessageAction,
	TriggerEnterAction: statemachineactionsTriggerEnterAction_TriggerEnterAction,
	TriggerLeaveAction: statemachineactionsTriggerLeaveAction_TriggerLeaveAction,
	TweenLightColorAction: statemachineactionsTweenLightColorAction_TweenLightColorAction,
	TweenLookAtAction: statemachineactionsTweenLookAtAction_TweenLookAtAction,
	TweenMoveAction: statemachineactionsTweenMoveAction_TweenMoveAction,
	TweenOpacityAction: statemachineactionsTweenOpacityAction_TweenOpacityAction,
	TweenRotationAction: statemachineactionsTweenRotationAction_TweenRotationAction,
	TweenScaleAction: statemachineactionsTweenScaleAction_TweenScaleAction,
	TweenTextureOffsetAction: statemachineactionsTweenTextureOffsetAction_TweenTextureOffsetAction,
	WaitAction: statemachineactionsWaitAction_WaitAction,
	WasdAction: statemachineactionsWasdAction_WasdAction,
	FSMUtil: statemachineFSMUtil_FsmUtils,
	FsmUtils: statemachineFsmUtils_FsmUtils,
	Machine: statemachineMachine_Machine,
	State: statemachineState_State,
	StateMachineComponent: statemachineStateMachineComponent_StateMachineComponent,
	StateMachineSystem: statemachineStateMachineSystem_StateMachineSystem,
	StateMachineComponentHandler: StateMachineComponentHandler_StateMachineComponentHandler,
	StateMachineHandlers: {}
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}