import ArrowsAction_moduleDefault from "./ArrowsAction";
import DomEventAction_moduleDefault from "./DomEventAction";
import MouseUpAction_moduleDefault from "./MouseUpAction";
import MouseDownAction_moduleDefault from "./MouseDownAction";
import MouseMoveAction_moduleDefault from "./MouseMoveAction";
import MousePressedAction_moduleDefault from "./MousePressedAction";
import KeyUpAction_moduleDefault from "./KeyUpAction";
import KeyDownAction_moduleDefault from "./KeyDownAction";
import KeyPressedAction_moduleDefault from "./KeyPressedAction";
import PickAction_moduleDefault from "./PickAction";
import PickAndExitAction_moduleDefault from "./PickAndExitAction";
import ClickAction_moduleDefault from "./ClickAction";
import HoverEnterAction_moduleDefault from "./HoverEnterAction";
import HoverExitAction_moduleDefault from "./HoverExitAction";
import WasdAction_moduleDefault from "./WasdAction";
import MoveAction_moduleDefault from "./MoveAction";
import RotateAction_moduleDefault from "./RotateAction";
import ScaleAction_moduleDefault from "./ScaleAction";
import LookAtAction_moduleDefault from "./LookAtAction";
import TweenMoveAction_moduleDefault from "./TweenMoveAction";
import TweenRotationAction_moduleDefault from "./TweenRotationAction";
import TweenScaleAction_moduleDefault from "./TweenScaleAction";
import TweenLookAtAction_moduleDefault from "./TweenLookAtAction";
import ShakeAction_moduleDefault from "./ShakeAction";
import PauseAnimationAction_moduleDefault from "./PauseAnimationAction";
import ResumeAnimationAction_moduleDefault from "./ResumeAnimationAction";
import SetAnimationAction_moduleDefault from "./SetAnimationAction";
import SetTimeScaleAction_moduleDefault from "./SetTimeScaleAction";
import SetAnimationOffsetAction_moduleDefault from "./SetAnimationOffsetAction";
import WaitAction_moduleDefault from "./WaitAction";
import TransitionAction_moduleDefault from "./TransitionAction";
import NextFrameAction_moduleDefault from "./NextFrameAction";
import RandomTransitionAction_moduleDefault from "./RandomTransitionAction";
import EmitAction_moduleDefault from "./EmitAction";
import TransitionOnMessageAction_moduleDefault from "./TransitionOnMessageAction";
import EvalAction_moduleDefault from "./EvalAction";
import HideAction_moduleDefault from "./HideAction";
import ShowAction_moduleDefault from "./ShowAction";
import RemoveAction_moduleDefault from "./RemoveAction";
import AddLightAction_moduleDefault from "./AddLightAction";
import RemoveLightAction_moduleDefault from "./RemoveLightAction";
import SetLightPropertiesAction_moduleDefault from "./SetLightPropertiesAction";
import TweenLightColorAction_moduleDefault from "./TweenLightColorAction";
import SetClearColorAction_moduleDefault from "./SetClearColorAction";
import SwitchCameraAction_moduleDefault from "./SwitchCameraAction";
import InFrustumAction_moduleDefault from "./InFrustumAction";
import DollyZoomAction_moduleDefault from "./DollyZoomAction";
import InBoxAction_moduleDefault from "./InBoxAction";
import CompareDistanceAction_moduleDefault from "./CompareDistanceAction";
import CollidesAction_moduleDefault from "./CollidesAction";
import TagAction_moduleDefault from "./TagAction";
import SmokeAction_moduleDefault from "./SmokeAction";
import FireAction_moduleDefault from "./FireAction";
import RemoveParticlesAction_moduleDefault from "./RemoveParticlesAction";
import TogglePostFxAction_moduleDefault from "./TogglePostFxAction";
import ToggleFullscreenAction_moduleDefault from "./ToggleFullscreenAction";
import PlaySoundAction_moduleDefault from "./PlaySoundAction";
import PauseSoundAction_moduleDefault from "./PauseSoundAction";
import StopSoundAction_moduleDefault from "./StopSoundAction";
import SoundFadeInAction_moduleDefault from "./SoundFadeInAction";
import SoundFadeOutAction_moduleDefault from "./SoundFadeOutAction";
import SetRenderTargetAction_moduleDefault from "./SetRenderTargetAction";
import TweenTextureOffsetAction_moduleDefault from "./TweenTextureOffsetAction";
import SetMaterialColorAction_moduleDefault from "./SetMaterialColorAction";
import TweenMaterialColorAction_moduleDefault from "./TweenMaterialColorAction";
import LogMessageAction_moduleDefault from "./LogMessageAction";
import TweenOpacityAction_moduleDefault from "./TweenOpacityAction";
import HtmlAction_moduleDefault from "./HtmlAction";
import CopyJointTransformAction_moduleDefault from "./CopyJointTransformAction";
import TriggerEnterAction_moduleDefault from "./TriggerEnterAction";
import TriggerLeaveAction_moduleDefault from "./TriggerLeaveAction";
import ApplyImpulseAction_moduleDefault from "./ApplyImpulseAction";
import ApplyForceAction_moduleDefault from "./ApplyForceAction";
import ApplyTorqueAction_moduleDefault from "./ApplyTorqueAction";
import SetRigidBodyPositionAction_moduleDefault from "./SetRigidBodyPositionAction";
import SetRigidBodyRotationAction_moduleDefault from "./SetRigidBodyRotationAction";
import SetRigidBodyVelocityAction_moduleDefault from "./SetRigidBodyVelocityAction";
import SetRigidBodyAngularVelocityAction_moduleDefault from "./SetRigidBodyAngularVelocityAction";
import CompareCounterAction_moduleDefault from "./CompareCounterAction";
import CompareCountersAction_moduleDefault from "./CompareCountersAction";
import SetCounterAction_moduleDefault from "./SetCounterAction";
import IncrementCounterAction_moduleDefault from "./IncrementCounterAction";
import MuteAction_moduleDefault from "./MuteAction";
import UnmuteAction_moduleDefault from "./UnmuteAction";
import ToggleMuteAction_moduleDefault from "./ToggleMuteAction";
import StartTimelineAction_moduleDefault from "./StartTimelineAction";
import PauseTimelineAction_moduleDefault from "./PauseTimelineAction";
import StopTimelineAction_moduleDefault from "./StopTimelineAction";
import SetTimelineTimeAction_moduleDefault from "./SetTimelineTimeAction";
import SetHtmlTextAction_moduleDefault from "./SetHtmlTextAction";
import SpriteAnimationAction_moduleDefault from "./SpriteAnimationAction";
import PauseParticleSystemAction_moduleDefault from "./PauseParticleSystemAction";
import StopParticleSystemAction_moduleDefault from "./StopParticleSystemAction";
import StartParticleSystemAction_moduleDefault from "./StartParticleSystemAction";
var _actions = {};

var Actions = function () {};

var IGNORED_ACTIONS = [
	'Eval',
	'HTMLPick',
	'Remove',
	'Collides',
	'Tag'
];

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
	ArrowsAction: ArrowsAction_moduleDefault,
	DomEventAction: DomEventAction_moduleDefault,
	MouseUpAction: MouseUpAction_moduleDefault,
	MouseDownAction: MouseDownAction_moduleDefault,
	MouseMoveAction: MouseMoveAction_moduleDefault,
	MousePressedAction: MousePressedAction_moduleDefault,
	KeyUpAction: KeyUpAction_moduleDefault,
	KeyDownAction: KeyDownAction_moduleDefault,
	KeyPressedAction: KeyPressedAction_moduleDefault,
	PickAction: PickAction_moduleDefault,
	PickAndExitAction: PickAndExitAction_moduleDefault,
	ClickAction: ClickAction_moduleDefault,
	HoverEnterAction: HoverEnterAction_moduleDefault,
	HoverExitAction: HoverExitAction_moduleDefault,
	WasdAction: WasdAction_moduleDefault,
	MoveAction: MoveAction_moduleDefault,
	RotateAction: RotateAction_moduleDefault,
	ScaleAction: ScaleAction_moduleDefault,
	LookAtAction: LookAtAction_moduleDefault,
	TweenMoveAction: TweenMoveAction_moduleDefault,
	TweenRotationAction: TweenRotationAction_moduleDefault,
	TweenScaleAction: TweenScaleAction_moduleDefault,
	TweenLookAtAction: TweenLookAtAction_moduleDefault,
	ShakeAction: ShakeAction_moduleDefault,
	PauseAnimationAction: PauseAnimationAction_moduleDefault,
	ResumeAnimationAction: ResumeAnimationAction_moduleDefault,
	SetAnimationAction: SetAnimationAction_moduleDefault,
	SetTimeScaleAction: SetTimeScaleAction_moduleDefault,
	SetAnimationOffsetAction: SetAnimationOffsetAction_moduleDefault,
	WaitAction: WaitAction_moduleDefault,
	TransitionAction: TransitionAction_moduleDefault,
	NextFrameAction: NextFrameAction_moduleDefault,
	RandomTransitionAction: RandomTransitionAction_moduleDefault,
	EmitAction: EmitAction_moduleDefault,
	TransitionOnMessageAction: TransitionOnMessageAction_moduleDefault,
	EvalAction: EvalAction_moduleDefault,
	HideAction: HideAction_moduleDefault,
	ShowAction: ShowAction_moduleDefault,
	RemoveAction: RemoveAction_moduleDefault,
	AddLightAction: AddLightAction_moduleDefault,
	RemoveLightAction: RemoveLightAction_moduleDefault,
	SetLightPropertiesAction: SetLightPropertiesAction_moduleDefault,
	TweenLightColorAction: TweenLightColorAction_moduleDefault,
	SetClearColorAction: SetClearColorAction_moduleDefault,
	SwitchCameraAction: SwitchCameraAction_moduleDefault,
	InFrustumAction: InFrustumAction_moduleDefault,
	DollyZoomAction: DollyZoomAction_moduleDefault,
	InBoxAction: InBoxAction_moduleDefault,
	CompareDistanceAction: CompareDistanceAction_moduleDefault,
	CollidesAction: CollidesAction_moduleDefault,
	TagAction: TagAction_moduleDefault,
	SmokeAction: SmokeAction_moduleDefault,
	FireAction: FireAction_moduleDefault,
	RemoveParticlesAction: RemoveParticlesAction_moduleDefault,
	TogglePostFxAction: TogglePostFxAction_moduleDefault,
	ToggleFullscreenAction: ToggleFullscreenAction_moduleDefault,
	PlaySoundAction: PlaySoundAction_moduleDefault,
	PauseSoundAction: PauseSoundAction_moduleDefault,
	StopSoundAction: StopSoundAction_moduleDefault,
	SoundFadeInAction: SoundFadeInAction_moduleDefault,
	SoundFadeOutAction: SoundFadeOutAction_moduleDefault,
	SetRenderTargetAction: SetRenderTargetAction_moduleDefault,
	TweenTextureOffsetAction: TweenTextureOffsetAction_moduleDefault,
	SetMaterialColorAction: SetMaterialColorAction_moduleDefault,
	TweenMaterialColorAction: TweenMaterialColorAction_moduleDefault,
	LogMessageAction: LogMessageAction_moduleDefault,
	TweenOpacityAction: TweenOpacityAction_moduleDefault,
	HtmlAction: HtmlAction_moduleDefault,
	CopyJointTransformAction: CopyJointTransformAction_moduleDefault,
	TriggerEnterAction: TriggerEnterAction_moduleDefault,
	TriggerLeaveAction: TriggerLeaveAction_moduleDefault,
	ApplyImpulseAction: ApplyImpulseAction_moduleDefault,
	ApplyForceAction: ApplyForceAction_moduleDefault,
	ApplyTorqueAction: ApplyTorqueAction_moduleDefault,
	SetRigidBodyPositionAction: SetRigidBodyPositionAction_moduleDefault,
	SetRigidBodyRotationAction: SetRigidBodyRotationAction_moduleDefault,
	SetRigidBodyVelocityAction: SetRigidBodyVelocityAction_moduleDefault,
	SetRigidBodyAngularVelocityAction: SetRigidBodyAngularVelocityAction_moduleDefault,
	CompareCounterAction: CompareCounterAction_moduleDefault,
	CompareCountersAction: CompareCountersAction_moduleDefault,
	SetCounterAction: SetCounterAction_moduleDefault,
	IncrementCounterAction: IncrementCounterAction_moduleDefault,
	MuteAction: MuteAction_moduleDefault,
	UnmuteAction: UnmuteAction_moduleDefault,
	ToggleMuteAction: ToggleMuteAction_moduleDefault,
	StartTimelineAction: StartTimelineAction_moduleDefault,
	PauseTimelineAction: PauseTimelineAction_moduleDefault,
	StopTimelineAction: StopTimelineAction_moduleDefault,
	SetTimelineTimeAction: SetTimelineTimeAction_moduleDefault,
	SetHtmlTextAction: SetHtmlTextAction_moduleDefault,
	SpriteAnimationAction: SpriteAnimationAction_moduleDefault,
	PauseParticleSystemAction: PauseParticleSystemAction_moduleDefault,
	StopParticleSystemAction: StopParticleSystemAction_moduleDefault,
	StartParticleSystemAction: StartParticleSystemAction_moduleDefault
};

for (var actionName in allActions) {
	var action = allActions[actionName];
	Actions.register(action.external.key, action);
}

export default Actions;