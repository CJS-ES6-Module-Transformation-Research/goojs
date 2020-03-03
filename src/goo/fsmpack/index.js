import { MachineHandler as MachineHandlerjs } from "./MachineHandler";
import { ProximityComponent as ProximityComponentjs } from "./proximity/ProximityComponent";
import { ProximitySystem } from "./proximity/ProximitySystem";
import { Action } from "./statemachine/actions/Action";
import { Actions } from "./statemachine/actions/Actions";
import { AddLightAction as AddLightActionjs } from "./statemachine/actions/AddLightAction";
import { AddPositionAction as AddPositionActionjs } from "./statemachine/actions/AddPositionAction";
import { AddVariableAction as AddVariableActionjs } from "./statemachine/actions/AddVariableAction";
import { ApplyImpulseAction as ApplyImpulseActionjs } from "./statemachine/actions/ApplyImpulseAction";
import { ArrowsAction as ArrowsActionjs } from "./statemachine/actions/ArrowsAction";
import { CollidesAction as CollidesActionjs } from "./statemachine/actions/CollidesAction";
import { CompareCounterAction as CompareCounterActionjs } from "./statemachine/actions/CompareCounterAction";
import { CompareCountersAction as CompareCountersActionjs } from "./statemachine/actions/CompareCountersAction";
import { CompareDistanceAction as CompareDistanceActionjs } from "./statemachine/actions/CompareDistanceAction";
import { CopyJointTransformAction as CopyJointTransformActionjs } from "./statemachine/actions/CopyJointTransformAction";
import { DollyZoomAction as DollyZoomActionjs } from "./statemachine/actions/DollyZoomAction";
import { EmitAction as EmitActionjs } from "./statemachine/actions/EmitAction";
import { EvalAction as EvalActionjs } from "./statemachine/actions/EvalAction";
import { FireAction as FireActionjs } from "./statemachine/actions/FireAction";
import { GetPositionAction as GetPositionActionjs } from "./statemachine/actions/GetPositionAction";
import { HideAction as HideActionjs } from "./statemachine/actions/HideAction";
import { HtmlAction as HtmlActionjs } from "./statemachine/actions/HtmlAction";
import { InBoxAction as InBoxActionjs } from "./statemachine/actions/InBoxAction";
import { IncrementCounterAction as IncrementCounterActionjs } from "./statemachine/actions/IncrementCounterAction";
import { InFrustumAction as InFrustumActionjs } from "./statemachine/actions/InFrustumAction";
import { KeyDownAction as KeyDownActionjs } from "./statemachine/actions/KeyDownAction";
import { KeyPressedAction as KeyPressedActionjs } from "./statemachine/actions/KeyPressedAction";
import { KeyUpAction as KeyUpActionjs } from "./statemachine/actions/KeyUpAction";
import { LogMessageAction as LogMessageActionjs } from "./statemachine/actions/LogMessageAction";
import { LookAtAction as LookAtActionjs } from "./statemachine/actions/LookAtAction";
import { MouseDownAction as MouseDownActionjs } from "./statemachine/actions/MouseDownAction";
import { MouseMoveAction as MouseMoveActionjs } from "./statemachine/actions/MouseMoveAction";
import { MouseUpAction as MouseUpActionjs } from "./statemachine/actions/MouseUpAction";
import { MoveAction as MoveActionjs } from "./statemachine/actions/MoveAction";
import { MultiplyVariableAction as MultiplyVariableActionjs } from "./statemachine/actions/MultiplyVariableAction";
import { NumberCompareAction as NumberCompareActionjs } from "./statemachine/actions/NumberCompareAction";
import { PauseAnimationAction as PauseAnimationActionjs } from "./statemachine/actions/PauseAnimationAction";
import { PickAction as PickActionjs } from "./statemachine/actions/PickAction";
import { PickAndExitAction as PickAndExitActionjs } from "./statemachine/actions/PickAndExitAction";
import { RandomTransitionAction as RandomTransitionActionjs } from "./statemachine/actions/RandomTransitionAction";
import { RemoveAction as RemoveActionjs } from "./statemachine/actions/RemoveAction";
import { RemoveLightAction as RemoveLightActionjs } from "./statemachine/actions/RemoveLightAction";
import { RemoveParticlesAction as RemoveParticlesActionjs } from "./statemachine/actions/RemoveParticlesAction";
import { ResumeAnimationAction as ResumeAnimationActionjs } from "./statemachine/actions/ResumeAnimationAction";
import { RotateAction as RotateActionjs } from "./statemachine/actions/RotateAction";
import { ScaleAction as ScaleActionjs } from "./statemachine/actions/ScaleAction";
import { SetAnimationAction as SetAnimationActionjs } from "./statemachine/actions/SetAnimationAction";
import { SetClearColorAction as SetClearColorActionjs } from "./statemachine/actions/SetClearColorAction";
import { SetCounterAction as SetCounterActionjs } from "./statemachine/actions/SetCounterAction";
import { SetLightRangeAction as SetLightRangeActionjs } from "./statemachine/actions/SetLightRangeAction";
import { SetPositionAction as SetPositionActionjs } from "./statemachine/actions/SetPositionAction";
import { SetRenderTargetAction as SetRenderTargetActionjs } from "./statemachine/actions/SetRenderTargetAction";
import { SetRotationAction as SetRotationActionjs } from "./statemachine/actions/SetRotationAction";
import { SetVariableAction as SetVariableActionjs } from "./statemachine/actions/SetVariableAction";
import { ShakeAction as ShakeActionjs } from "./statemachine/actions/ShakeAction";
import { ShowAction as ShowActionjs } from "./statemachine/actions/ShowAction";
import { SmokeAction as SmokeActionjs } from "./statemachine/actions/SmokeAction";
import { SoundFadeInAction as SoundFadeInActionjs } from "./statemachine/actions/SoundFadeInAction";
import { SoundFadeOutAction as SoundFadeOutActionjs } from "./statemachine/actions/SoundFadeOutAction";
import { SwitchCameraAction as SwitchCameraActionjs } from "./statemachine/actions/SwitchCameraAction";
import { TagAction as TagActionjs } from "./statemachine/actions/TagAction";
import { TransitionAction as TransitionActionjs } from "./statemachine/actions/TransitionAction";
import { TransitionOnMessageAction as TransitionOnMessageActionjs } from "./statemachine/actions/TransitionOnMessageAction";
import { TriggerEnterAction as TriggerEnterActionjs } from "./statemachine/actions/TriggerEnterAction";
import { TriggerLeaveAction as TriggerLeaveActionjs } from "./statemachine/actions/TriggerLeaveAction";
import { TweenLightColorAction as TweenLightColorActionjs } from "./statemachine/actions/TweenLightColorAction";
import { TweenLookAtAction as TweenLookAtActionjs } from "./statemachine/actions/TweenLookAtAction";
import { TweenMoveAction as TweenMoveActionjs } from "./statemachine/actions/TweenMoveAction";
import { TweenOpacityAction as TweenOpacityActionjs } from "./statemachine/actions/TweenOpacityAction";
import { TweenRotationAction as TweenRotationActionjs } from "./statemachine/actions/TweenRotationAction";
import { TweenScaleAction as TweenScaleActionjs } from "./statemachine/actions/TweenScaleAction";
import { TweenTextureOffsetAction as TweenTextureOffsetActionjs } from "./statemachine/actions/TweenTextureOffsetAction";
import { WaitAction as WaitActionjs } from "./statemachine/actions/WaitAction";
import { WasdAction as WasdActionjs } from "./statemachine/actions/WasdAction";
import { FsmUtils } from "./statemachine/FSMUtil";
import { FsmUtils } from "./statemachine/FsmUtils";
import { Machine } from "./statemachine/Machine";
import { State } from "./statemachine/State";
import { StateMachineComponent } from "./statemachine/StateMachineComponent";
import { StateMachineSystem } from "./statemachine/StateMachineSystem";
import { StateMachineComponentHandler as StateMachineComponentHandlerjs } from "./StateMachineComponentHandler";
module.exports = {
	MachineHandler: MachineHandlerjs,
	ProximityComponent: ProximityComponentjs,
	ProximitySystem: ProximitySystem_ProximitySystemjs,
	Action: Action_Actionjs,
	Actions: Actions_Actionsjs,
	AddLightAction: AddLightActionjs,
	AddPositionAction: AddPositionActionjs,
	AddVariableAction: AddVariableActionjs,
	ApplyImpulseAction: ApplyImpulseActionjs,
	ArrowsAction: ArrowsActionjs,
	CollidesAction: CollidesActionjs,
	CompareCounterAction: CompareCounterActionjs,
	CompareCountersAction: CompareCountersActionjs,
	CompareDistanceAction: CompareDistanceActionjs,
	CopyJointTransformAction: CopyJointTransformActionjs,
	DollyZoomAction: DollyZoomActionjs,
	EmitAction: EmitActionjs,
	EvalAction: EvalActionjs,
	FireAction: FireActionjs,
	GetPositionAction: GetPositionActionjs,
	HideAction: HideActionjs,
	HtmlAction: HtmlActionjs,
	InBoxAction: InBoxActionjs,
	IncrementCounterAction: IncrementCounterActionjs,
	InFrustumAction: InFrustumActionjs,
	KeyDownAction: KeyDownActionjs,
	KeyPressedAction: KeyPressedActionjs,
	KeyUpAction: KeyUpActionjs,
	LogMessageAction: LogMessageActionjs,
	LookAtAction: LookAtActionjs,
	MouseDownAction: MouseDownActionjs,
	MouseMoveAction: MouseMoveActionjs,
	MouseUpAction: MouseUpActionjs,
	MoveAction: MoveActionjs,
	MultiplyVariableAction: MultiplyVariableActionjs,
	NumberCompareAction: NumberCompareActionjs,
	PauseAnimationAction: PauseAnimationActionjs,
	PickAction: PickActionjs,
	PickAndExitAction: PickAndExitActionjs,
	RandomTransitionAction: RandomTransitionActionjs,
	RemoveAction: RemoveActionjs,
	RemoveLightAction: RemoveLightActionjs,
	RemoveParticlesAction: RemoveParticlesActionjs,
	ResumeAnimationAction: ResumeAnimationActionjs,
	RotateAction: RotateActionjs,
	ScaleAction: ScaleActionjs,
	SetAnimationAction: SetAnimationActionjs,
	SetClearColorAction: SetClearColorActionjs,
	SetCounterAction: SetCounterActionjs,
	SetLightRangeAction: SetLightRangeActionjs,
	SetPositionAction: SetPositionActionjs,
	SetRenderTargetAction: SetRenderTargetActionjs,
	SetRotationAction: SetRotationActionjs,
	SetVariableAction: SetVariableActionjs,
	ShakeAction: ShakeActionjs,
	ShowAction: ShowActionjs,
	SmokeAction: SmokeActionjs,
	SoundFadeInAction: SoundFadeInActionjs,
	SoundFadeOutAction: SoundFadeOutActionjs,
	SwitchCameraAction: SwitchCameraActionjs,
	TagAction: TagActionjs,
	TransitionAction: TransitionActionjs,
	TransitionOnMessageAction: TransitionOnMessageActionjs,
	TriggerEnterAction: TriggerEnterActionjs,
	TriggerLeaveAction: TriggerLeaveActionjs,
	TweenLightColorAction: TweenLightColorActionjs,
	TweenLookAtAction: TweenLookAtActionjs,
	TweenMoveAction: TweenMoveActionjs,
	TweenOpacityAction: TweenOpacityActionjs,
	TweenRotationAction: TweenRotationActionjs,
	TweenScaleAction: TweenScaleActionjs,
	TweenTextureOffsetAction: TweenTextureOffsetActionjs,
	WaitAction: WaitActionjs,
	WasdAction: WasdActionjs,
	FSMUtil: FSMUtil_FsmUtilsjs,
	FsmUtils: FsmUtils_FsmUtilsjs,
	Machine: Machine_Machinejs,
	State: State_Statejs,
	StateMachineComponent: StateMachineComponent_StateMachineComponentjs,
	StateMachineSystem: StateMachineSystem_StateMachineSystemjs,
	StateMachineComponentHandler: StateMachineComponentHandlerjs,
	StateMachineHandlers: {}
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}