var mod_PauseTimelineAction = PauseTimelineAction;
import { Action as Action_Action } from "./Action";

function PauseTimelineAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

PauseTimelineAction.prototype = Object.create(Action_Action.prototype);
PauseTimelineAction.prototype.constructor = PauseTimelineAction;

PauseTimelineAction.external = {
	key: 'Pause Timeline',
	name: 'Pause Timeline',
	type: 'timeline',
	description: 'Pauses the timeline.',
	canTransition: true,
	parameters: [],
	transitions: []
};

PauseTimelineAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();

	if (!entity.hasComponent('TimelineComponent')) { return; }

	entity.timelineComponent.pause();
};

export { mod_PauseTimelineAction as PauseTimelineAction };