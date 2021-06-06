var allActionsArray;
var Actions_allActions;
var actionForType;
var register;
import { ArrowsAction as ArrowsAction_ArrowsAction } from "./ArrowsAction";
import { DomEventAction as DomEventAction_DomEventAction } from "./DomEventAction";
import { MouseUpAction as MouseUpAction_MouseUpAction } from "./MouseUpAction";
import { MouseDownAction as MouseDownAction_MouseDownAction } from "./MouseDownAction";
import { MouseMoveAction as MouseMoveAction_MouseMoveAction } from "./MouseMoveAction";
import { MousePressedAction as MousePressedAction_MousePressedAction } from "./MousePressedAction";
import { KeyUpAction as KeyUpAction_KeyUpAction } from "./KeyUpAction";
import { KeyDownAction as KeyDownAction_KeyDownAction } from "./KeyDownAction";
import { KeyPressedAction as KeyPressedAction_KeyPressedAction } from "./KeyPressedAction";
import { PickAction as PickAction_PickAction } from "./PickAction";
import { PickAndExitAction as PickAndExitAction_PickAndExitAction } from "./PickAndExitAction";
import { ClickAction as ClickAction_ClickAction } from "./ClickAction";
import { HoverEnterAction as HoverEnterAction_HoverEnterAction } from "./HoverEnterAction";
import { HoverExitAction as HoverExitAction_HoverExitAction } from "./HoverExitAction";
import { WasdAction as WasdAction_WasdAction } from "./WasdAction";
import { MoveAction as MoveAction_MoveAction } from "./MoveAction";
import { RotateAction as RotateAction_RotateAction } from "./RotateAction";
import { ScaleAction as ScaleAction_ScaleAction } from "./ScaleAction";
import { LookAtAction as LookAtAction_LookAtAction } from "./LookAtAction";
import { TweenMoveAction as TweenMoveAction_TweenMoveAction } from "./TweenMoveAction";
import { TweenRotationAction as TweenRotationAction_TweenRotationAction } from "./TweenRotationAction";
import { TweenScaleAction as TweenScaleAction_TweenScaleAction } from "./TweenScaleAction";
import { TweenLookAtAction as TweenLookAtAction_TweenLookAtAction } from "./TweenLookAtAction";
import { ShakeAction as ShakeAction_ShakeAction } from "./ShakeAction";
import { PauseAnimationAction as PauseAnimationAction_PauseAnimationAction } from "./PauseAnimationAction";
import { ResumeAnimationAction as ResumeAnimationAction_ResumeAnimationAction } from "./ResumeAnimationAction";
import { SetAnimationAction as SetAnimationAction_SetAnimationAction } from "./SetAnimationAction";
import { SetTimeScaleAction as SetTimeScaleAction_SetTimeScaleAction } from "./SetTimeScaleAction";
import {     SetAnimationOffsetAction as SetAnimationOffsetAction_SetAnimationOffsetAction, } from "./SetAnimationOffsetAction";
import { WaitAction as WaitAction_WaitAction } from "./WaitAction";
import { TransitionAction as TransitionAction_TransitionAction } from "./TransitionAction";
import { NextFrameAction as NextFrameAction_NextFrameAction } from "./NextFrameAction";
import { RandomTransitionAction as RandomTransitionAction_RandomTransitionAction } from "./RandomTransitionAction";
import { EmitAction as EmitAction_EmitAction } from "./EmitAction";
import {     TransitionOnMessageAction as TransitionOnMessageAction_TransitionOnMessageAction, } from "./TransitionOnMessageAction";
import { EvalAction as EvalAction_EvalAction } from "./EvalAction";
import { HideAction as HideAction_HideAction } from "./HideAction";
import { ShowAction as ShowAction_ShowAction } from "./ShowAction";
import { RemoveAction as RemoveAction_RemoveAction } from "./RemoveAction";
import { AddLightAction as AddLightAction_AddLightAction } from "./AddLightAction";
import { RemoveLightAction as RemoveLightAction_RemoveLightAction } from "./RemoveLightAction";
import {     SetLightPropertiesAction as SetLightPropertiesAction_SetLightPropertiesAction, } from "./SetLightPropertiesAction";
import { TweenLightColorAction as TweenLightColorAction_TweenLightColorAction } from "./TweenLightColorAction";
import { SetClearColorAction as SetClearColorAction_SetClearColorAction } from "./SetClearColorAction";
import { SwitchCameraAction as SwitchCameraAction_SwitchCameraAction } from "./SwitchCameraAction";
import { InFrustumAction as InFrustumAction_InFrustumAction } from "./InFrustumAction";
import { DollyZoomAction as DollyZoomAction_DollyZoomAction } from "./DollyZoomAction";
import { InBoxAction as InBoxAction_InBoxAction } from "./InBoxAction";
import { CompareDistanceAction as CompareDistanceAction_CompareDistanceAction } from "./CompareDistanceAction";
import { CollidesAction as CollidesAction_CollidesAction } from "./CollidesAction";
import { TagAction as TagAction_TagAction } from "./TagAction";
import { SmokeAction as SmokeAction_SmokeAction } from "./SmokeAction";
import { FireAction as FireAction_FireAction } from "./FireAction";
import { RemoveParticlesAction as RemoveParticlesAction_RemoveParticlesAction } from "./RemoveParticlesAction";
import { TogglePostFxAction as TogglePostFxAction_TogglePostFxAction } from "./TogglePostFxAction";
import { ToggleFullscreenAction as ToggleFullscreenAction_ToggleFullscreenAction } from "./ToggleFullscreenAction";
import { PlaySoundAction as PlaySoundAction_PlaySoundAction } from "./PlaySoundAction";
import { PauseSoundAction as PauseSoundAction_PauseSoundAction } from "./PauseSoundAction";
import { StopSoundAction as StopSoundAction_StopSoundAction } from "./StopSoundAction";
import { SoundFadeInAction as SoundFadeInAction_SoundFadeInAction } from "./SoundFadeInAction";
import { SoundFadeOutAction as SoundFadeOutAction_SoundFadeOutAction } from "./SoundFadeOutAction";
import { SetRenderTargetAction as SetRenderTargetAction_SetRenderTargetAction } from "./SetRenderTargetAction";
import {     TweenTextureOffsetAction as TweenTextureOffsetAction_TweenTextureOffsetAction, } from "./TweenTextureOffsetAction";
import { SetMaterialColorAction as SetMaterialColorAction_SetMaterialColorAction } from "./SetMaterialColorAction";
import {     TweenMaterialColorAction as TweenMaterialColorAction_TweenMaterialColorAction, } from "./TweenMaterialColorAction";
import { LogMessageAction as LogMessageAction_LogMessageAction } from "./LogMessageAction";
import { TweenOpacityAction as TweenOpacityAction_TweenOpacityAction } from "./TweenOpacityAction";
import { HtmlAction as HtmlAction_HtmlAction } from "./HtmlAction";
import {     CopyJointTransformAction as CopyJointTransformAction_CopyJointTransformAction, } from "./CopyJointTransformAction";
import { TriggerEnterAction as TriggerEnterAction_TriggerEnterAction } from "./TriggerEnterAction";
import { TriggerLeaveAction as TriggerLeaveAction_TriggerLeaveAction } from "./TriggerLeaveAction";
import { ApplyImpulseAction as ApplyImpulseAction_ApplyImpulseAction } from "./ApplyImpulseAction";
import { ApplyForceAction as ApplyForceAction_ApplyForceAction } from "./ApplyForceAction";
import { ApplyTorqueAction as ApplyTorqueAction_ApplyTorqueAction } from "./ApplyTorqueAction";
import {     SetRigidBodyPositionAction as SetRigidBodyPositionAction_SetRigidBodyPositionAction, } from "./SetRigidBodyPositionAction";
import {     SetRigidBodyRotationAction as SetRigidBodyRotationAction_SetRigidBodyRotationAction, } from "./SetRigidBodyRotationAction";
import {     SetRigidBodyVelocityAction as SetRigidBodyVelocityAction_SetRigidBodyVelocityAction, } from "./SetRigidBodyVelocityAction";
import {     SetRigidBodyAngularVelocityAction as SetRigidBodyAngularVelocityAction_SetRigidBodyAngularVelocityAction, } from "./SetRigidBodyAngularVelocityAction";
import { CompareCounterAction as CompareCounterAction_CompareCounterAction } from "./CompareCounterAction";
import { CompareCountersAction as CompareCountersAction_CompareCountersAction } from "./CompareCountersAction";
import { SetCounterAction as SetCounterAction_SetCounterAction } from "./SetCounterAction";
import { IncrementCounterAction as IncrementCounterAction_IncrementCounterAction } from "./IncrementCounterAction";
import { MuteAction as MuteAction_MuteAction } from "./MuteAction";
import { UnmuteAction as UnmuteAction_UnmuteAction } from "./UnmuteAction";
import { ToggleMuteAction as ToggleMuteAction_ToggleMuteAction } from "./ToggleMuteAction";
import { StartTimelineAction as StartTimelineAction_StartTimelineAction } from "./StartTimelineAction";
import { PauseTimelineAction as PauseTimelineAction_PauseTimelineAction } from "./PauseTimelineAction";
import { StopTimelineAction as StopTimelineAction_StopTimelineAction } from "./StopTimelineAction";
import { SetTimelineTimeAction as SetTimelineTimeAction_SetTimelineTimeAction } from "./SetTimelineTimeAction";
import { SetHtmlTextAction as SetHtmlTextAction_SetHtmlTextAction } from "./SetHtmlTextAction";
import { SpriteAnimationAction as SpriteAnimationAction_SpriteAnimationAction } from "./SpriteAnimationAction";
import {     PauseParticleSystemAction as PauseParticleSystemAction_PauseParticleSystemAction, } from "./PauseParticleSystemAction";
import {     StopParticleSystemAction as StopParticleSystemAction_StopParticleSystemAction, } from "./StopParticleSystemAction";
import {     StartParticleSystemAction as StartParticleSystemAction_StartParticleSystemAction, } from "./StartParticleSystemAction";
var _actions = {};

var IGNORED_ACTIONS = [
	'Eval',
	'HTMLPick',
	'Remove',
	'Collides',
	'Tag'
];

register = function (name, actionClass) {
	_actions[name] = actionClass;
};

actionForType = function (name) {
	return _actions[name];
};

Actions_allActions = function () {
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

allActionsArray = function () {
	var array = [];
	var actions = Actions_allActions();
	var keys = Object.keys(actions);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		array.push(actions[key]);
	}
	return array;
};


var allActions = {
	ArrowsAction: ArrowsAction_ArrowsAction,
	DomEventAction: DomEventAction_DomEventAction,
	MouseUpAction: MouseUpAction_MouseUpAction,
	MouseDownAction: MouseDownAction_MouseDownAction,
	MouseMoveAction: MouseMoveAction_MouseMoveAction,
	MousePressedAction: MousePressedAction_MousePressedAction,
	KeyUpAction: KeyUpAction_KeyUpAction,
	KeyDownAction: KeyDownAction_KeyDownAction,
	KeyPressedAction: KeyPressedAction_KeyPressedAction,
	PickAction: PickAction_PickAction,
	PickAndExitAction: PickAndExitAction_PickAndExitAction,
	ClickAction: ClickAction_ClickAction,
	HoverEnterAction: HoverEnterAction_HoverEnterAction,
	HoverExitAction: HoverExitAction_HoverExitAction,
	WasdAction: WasdAction_WasdAction,
	MoveAction: MoveAction_MoveAction,
	RotateAction: RotateAction_RotateAction,
	ScaleAction: ScaleAction_ScaleAction,
	LookAtAction: LookAtAction_LookAtAction,
	TweenMoveAction: TweenMoveAction_TweenMoveAction,
	TweenRotationAction: TweenRotationAction_TweenRotationAction,
	TweenScaleAction: TweenScaleAction_TweenScaleAction,
	TweenLookAtAction: TweenLookAtAction_TweenLookAtAction,
	ShakeAction: ShakeAction_ShakeAction,
	PauseAnimationAction: PauseAnimationAction_PauseAnimationAction,
	ResumeAnimationAction: ResumeAnimationAction_ResumeAnimationAction,
	SetAnimationAction: SetAnimationAction_SetAnimationAction,
	SetTimeScaleAction: SetTimeScaleAction_SetTimeScaleAction,
	SetAnimationOffsetAction: SetAnimationOffsetAction_SetAnimationOffsetAction,
	WaitAction: WaitAction_WaitAction,
	TransitionAction: TransitionAction_TransitionAction,
	NextFrameAction: NextFrameAction_NextFrameAction,
	RandomTransitionAction: RandomTransitionAction_RandomTransitionAction,
	EmitAction: EmitAction_EmitAction,
	TransitionOnMessageAction: TransitionOnMessageAction_TransitionOnMessageAction,
	EvalAction: EvalAction_EvalAction,
	HideAction: HideAction_HideAction,
	ShowAction: ShowAction_ShowAction,
	RemoveAction: RemoveAction_RemoveAction,
	AddLightAction: AddLightAction_AddLightAction,
	RemoveLightAction: RemoveLightAction_RemoveLightAction,
	SetLightPropertiesAction: SetLightPropertiesAction_SetLightPropertiesAction,
	TweenLightColorAction: TweenLightColorAction_TweenLightColorAction,
	SetClearColorAction: SetClearColorAction_SetClearColorAction,
	SwitchCameraAction: SwitchCameraAction_SwitchCameraAction,
	InFrustumAction: InFrustumAction_InFrustumAction,
	DollyZoomAction: DollyZoomAction_DollyZoomAction,
	InBoxAction: InBoxAction_InBoxAction,
	CompareDistanceAction: CompareDistanceAction_CompareDistanceAction,
	CollidesAction: CollidesAction_CollidesAction,
	TagAction: TagAction_TagAction,
	SmokeAction: SmokeAction_SmokeAction,
	FireAction: FireAction_FireAction,
	RemoveParticlesAction: RemoveParticlesAction_RemoveParticlesAction,
	TogglePostFxAction: TogglePostFxAction_TogglePostFxAction,
	ToggleFullscreenAction: ToggleFullscreenAction_ToggleFullscreenAction,
	PlaySoundAction: PlaySoundAction_PlaySoundAction,
	PauseSoundAction: PauseSoundAction_PauseSoundAction,
	StopSoundAction: StopSoundAction_StopSoundAction,
	SoundFadeInAction: SoundFadeInAction_SoundFadeInAction,
	SoundFadeOutAction: SoundFadeOutAction_SoundFadeOutAction,
	SetRenderTargetAction: SetRenderTargetAction_SetRenderTargetAction,
	TweenTextureOffsetAction: TweenTextureOffsetAction_TweenTextureOffsetAction,
	SetMaterialColorAction: SetMaterialColorAction_SetMaterialColorAction,
	TweenMaterialColorAction: TweenMaterialColorAction_TweenMaterialColorAction,
	LogMessageAction: LogMessageAction_LogMessageAction,
	TweenOpacityAction: TweenOpacityAction_TweenOpacityAction,
	HtmlAction: HtmlAction_HtmlAction,
	CopyJointTransformAction: CopyJointTransformAction_CopyJointTransformAction,
	TriggerEnterAction: TriggerEnterAction_TriggerEnterAction,
	TriggerLeaveAction: TriggerLeaveAction_TriggerLeaveAction,
	ApplyImpulseAction: ApplyImpulseAction_ApplyImpulseAction,
	ApplyForceAction: ApplyForceAction_ApplyForceAction,
	ApplyTorqueAction: ApplyTorqueAction_ApplyTorqueAction,
	SetRigidBodyPositionAction: SetRigidBodyPositionAction_SetRigidBodyPositionAction,
	SetRigidBodyRotationAction: SetRigidBodyRotationAction_SetRigidBodyRotationAction,
	SetRigidBodyVelocityAction: SetRigidBodyVelocityAction_SetRigidBodyVelocityAction,
	SetRigidBodyAngularVelocityAction: SetRigidBodyAngularVelocityAction_SetRigidBodyAngularVelocityAction,
	CompareCounterAction: CompareCounterAction_CompareCounterAction,
	CompareCountersAction: CompareCountersAction_CompareCountersAction,
	SetCounterAction: SetCounterAction_SetCounterAction,
	IncrementCounterAction: IncrementCounterAction_IncrementCounterAction,
	MuteAction: MuteAction_MuteAction,
	UnmuteAction: UnmuteAction_UnmuteAction,
	ToggleMuteAction: ToggleMuteAction_ToggleMuteAction,
	StartTimelineAction: StartTimelineAction_StartTimelineAction,
	PauseTimelineAction: PauseTimelineAction_PauseTimelineAction,
	StopTimelineAction: StopTimelineAction_StopTimelineAction,
	SetTimelineTimeAction: SetTimelineTimeAction_SetTimelineTimeAction,
	SetHtmlTextAction: SetHtmlTextAction_SetHtmlTextAction,
	SpriteAnimationAction: SpriteAnimationAction_SpriteAnimationAction,
	PauseParticleSystemAction: PauseParticleSystemAction_PauseParticleSystemAction,
	StopParticleSystemAction: StopParticleSystemAction_StopParticleSystemAction,
	StartParticleSystemAction: StartParticleSystemAction_StartParticleSystemAction
};

for (var actionName in allActions) {
	var action = allActions[actionName];
	register(action.external.key, action);
}

export { actionForType, allActionsArray };