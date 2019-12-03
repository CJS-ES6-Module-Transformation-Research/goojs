import { MachineHandler } from "./MachineHandler";
import { ProximityComponent } from "./proximity/ProximityComponent";
import { ProximitySystem } from "./proximity/ProximitySystem";
import { Action } from "./statemachine/actions/Action";
import { Actions } from "./statemachine/actions/Actions";
import { AddLightAction } from "./statemachine/actions/AddLightAction";
import { AddPositionAction } from "./statemachine/actions/AddPositionAction";
import { AddVariableAction } from "./statemachine/actions/AddVariableAction";
import { ApplyImpulseAction } from "./statemachine/actions/ApplyImpulseAction";
import { ArrowsAction } from "./statemachine/actions/ArrowsAction";
import { CollidesAction } from "./statemachine/actions/CollidesAction";
import { CompareCounterAction } from "./statemachine/actions/CompareCounterAction";
import { CompareCountersAction } from "./statemachine/actions/CompareCountersAction";
import { CompareDistanceAction } from "./statemachine/actions/CompareDistanceAction";
import { CopyJointTransformAction } from "./statemachine/actions/CopyJointTransformAction";
import { DollyZoomAction } from "./statemachine/actions/DollyZoomAction";
import { EmitAction } from "./statemachine/actions/EmitAction";
import { EvalAction } from "./statemachine/actions/EvalAction";
import { FireAction } from "./statemachine/actions/FireAction";
import { GetPositionAction } from "./statemachine/actions/GetPositionAction";
import { HideAction } from "./statemachine/actions/HideAction";
import { HtmlAction } from "./statemachine/actions/HtmlAction";
import { InBoxAction } from "./statemachine/actions/InBoxAction";
import { IncrementCounterAction } from "./statemachine/actions/IncrementCounterAction";
import { InFrustumAction } from "./statemachine/actions/InFrustumAction";
import { KeyDownAction } from "./statemachine/actions/KeyDownAction";
import { KeyPressedAction } from "./statemachine/actions/KeyPressedAction";
import { KeyUpAction } from "./statemachine/actions/KeyUpAction";
import { LogMessageAction } from "./statemachine/actions/LogMessageAction";
import { LookAtAction } from "./statemachine/actions/LookAtAction";
import { MouseDownAction } from "./statemachine/actions/MouseDownAction";
import { MouseMoveAction } from "./statemachine/actions/MouseMoveAction";
import { MouseUpAction } from "./statemachine/actions/MouseUpAction";
import { MoveAction } from "./statemachine/actions/MoveAction";
import { MultiplyVariableAction } from "./statemachine/actions/MultiplyVariableAction";
import { NumberCompareAction } from "./statemachine/actions/NumberCompareAction";
import { PauseAnimationAction } from "./statemachine/actions/PauseAnimationAction";
import { PickAction } from "./statemachine/actions/PickAction";
import { PickAndExitAction } from "./statemachine/actions/PickAndExitAction";
import { RandomTransitionAction } from "./statemachine/actions/RandomTransitionAction";
import { RemoveAction } from "./statemachine/actions/RemoveAction";
import { RemoveLightAction } from "./statemachine/actions/RemoveLightAction";
import { RemoveParticlesAction } from "./statemachine/actions/RemoveParticlesAction";
import { ResumeAnimationAction } from "./statemachine/actions/ResumeAnimationAction";
import { RotateAction } from "./statemachine/actions/RotateAction";
import { ScaleAction } from "./statemachine/actions/ScaleAction";
import { SetAnimationAction } from "./statemachine/actions/SetAnimationAction";
import { SetClearColorAction } from "./statemachine/actions/SetClearColorAction";
import { SetCounterAction } from "./statemachine/actions/SetCounterAction";
import { SetLightRangeAction } from "./statemachine/actions/SetLightRangeAction";
import { SetPositionAction } from "./statemachine/actions/SetPositionAction";
import { SetRenderTargetAction } from "./statemachine/actions/SetRenderTargetAction";
import { SetRotationAction } from "./statemachine/actions/SetRotationAction";
import { SetVariableAction } from "./statemachine/actions/SetVariableAction";
import { ShakeAction } from "./statemachine/actions/ShakeAction";
import { ShowAction } from "./statemachine/actions/ShowAction";
import { SmokeAction } from "./statemachine/actions/SmokeAction";
import { SoundFadeInAction } from "./statemachine/actions/SoundFadeInAction";
import { SoundFadeOutAction } from "./statemachine/actions/SoundFadeOutAction";
import { SwitchCameraAction } from "./statemachine/actions/SwitchCameraAction";
import { TagAction } from "./statemachine/actions/TagAction";
import { TransitionAction } from "./statemachine/actions/TransitionAction";
import { TransitionOnMessageAction } from "./statemachine/actions/TransitionOnMessageAction";
import { TriggerEnterAction } from "./statemachine/actions/TriggerEnterAction";
import { TriggerLeaveAction } from "./statemachine/actions/TriggerLeaveAction";
import { TweenLightColorAction } from "./statemachine/actions/TweenLightColorAction";
import { TweenLookAtAction } from "./statemachine/actions/TweenLookAtAction";
import { TweenMoveAction } from "./statemachine/actions/TweenMoveAction";
import { TweenOpacityAction } from "./statemachine/actions/TweenOpacityAction";
import { TweenRotationAction } from "./statemachine/actions/TweenRotationAction";
import { TweenScaleAction } from "./statemachine/actions/TweenScaleAction";
import { TweenTextureOffsetAction } from "./statemachine/actions/TweenTextureOffsetAction";
import { WaitAction } from "./statemachine/actions/WaitAction";
import { WasdAction } from "./statemachine/actions/WasdAction";
import { FSMUtil } from "./statemachine/FSMUtil";
import * as FsmUtils from "./statemachine/FsmUtils";
import { Machine } from "./statemachine/Machine";
import { State } from "./statemachine/State";
import { StateMachineComponent } from "./statemachine/StateMachineComponent";
import { StateMachineSystem } from "./statemachine/StateMachineSystem";
import { StateMachineComponentHandler } from "./StateMachineComponentHandler";
module.exports = {
	MachineHandler: MachineHandler,
	ProximityComponent: ProximityComponent,
	ProximitySystem: ProximitySystem,
	Action: Action,
	Actions: Actions,
	AddLightAction: AddLightAction,
	AddPositionAction: AddPositionAction,
	AddVariableAction: AddVariableAction,
	ApplyImpulseAction: ApplyImpulseAction,
	ArrowsAction: ArrowsAction,
	CollidesAction: CollidesAction,
	CompareCounterAction: CompareCounterAction,
	CompareCountersAction: CompareCountersAction,
	CompareDistanceAction: CompareDistanceAction,
	CopyJointTransformAction: CopyJointTransformAction,
	DollyZoomAction: DollyZoomAction,
	EmitAction: EmitAction,
	EvalAction: EvalAction,
	FireAction: FireAction,
	GetPositionAction: GetPositionAction,
	HideAction: HideAction,
	HtmlAction: HtmlAction,
	InBoxAction: InBoxAction,
	IncrementCounterAction: IncrementCounterAction,
	InFrustumAction: InFrustumAction,
	KeyDownAction: KeyDownAction,
	KeyPressedAction: KeyPressedAction,
	KeyUpAction: KeyUpAction,
	LogMessageAction: LogMessageAction,
	LookAtAction: LookAtAction,
	MouseDownAction: MouseDownAction,
	MouseMoveAction: MouseMoveAction,
	MouseUpAction: MouseUpAction,
	MoveAction: MoveAction,
	MultiplyVariableAction: MultiplyVariableAction,
	NumberCompareAction: NumberCompareAction,
	PauseAnimationAction: PauseAnimationAction,
	PickAction: PickAction,
	PickAndExitAction: PickAndExitAction,
	RandomTransitionAction: RandomTransitionAction,
	RemoveAction: RemoveAction,
	RemoveLightAction: RemoveLightAction,
	RemoveParticlesAction: RemoveParticlesAction,
	ResumeAnimationAction: ResumeAnimationAction,
	RotateAction: RotateAction,
	ScaleAction: ScaleAction,
	SetAnimationAction: SetAnimationAction,
	SetClearColorAction: SetClearColorAction,
	SetCounterAction: SetCounterAction,
	SetLightRangeAction: SetLightRangeAction,
	SetPositionAction: SetPositionAction,
	SetRenderTargetAction: SetRenderTargetAction,
	SetRotationAction: SetRotationAction,
	SetVariableAction: SetVariableAction,
	ShakeAction: ShakeAction,
	ShowAction: ShowAction,
	SmokeAction: SmokeAction,
	SoundFadeInAction: SoundFadeInAction,
	SoundFadeOutAction: SoundFadeOutAction,
	SwitchCameraAction: SwitchCameraAction,
	TagAction: TagAction,
	TransitionAction: TransitionAction,
	TransitionOnMessageAction: TransitionOnMessageAction,
	TriggerEnterAction: TriggerEnterAction,
	TriggerLeaveAction: TriggerLeaveAction,
	TweenLightColorAction: TweenLightColorAction,
	TweenLookAtAction: TweenLookAtAction,
	TweenMoveAction: TweenMoveAction,
	TweenOpacityAction: TweenOpacityAction,
	TweenRotationAction: TweenRotationAction,
	TweenScaleAction: TweenScaleAction,
	TweenTextureOffsetAction: TweenTextureOffsetAction,
	WaitAction: WaitAction,
	WasdAction: WasdAction,
	FSMUtil: FSMUtil,
	FsmUtils: FsmUtils,
	Machine: Machine,
	State: State,
	StateMachineComponent: StateMachineComponent,
	StateMachineSystem: StateMachineSystem,
	StateMachineComponentHandler: StateMachineComponentHandler,
	StateMachineHandlers: require('./StateMachineHandlers')
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}