var mod_StopTimelineAction = StopTimelineAction;
import { Action as Action_Action } from "./Action";

function StopTimelineAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

StopTimelineAction.prototype = Object.create(Action_Action.prototype);
StopTimelineAction.prototype.constructor = StopTimelineAction;

StopTimelineAction.external = {
	key: 'Stop Timeline',
	name: 'Stop Timeline',
	type: 'timeline',
	description: 'Stops the timeline.',
	canTransition: true,
	parameters: [],
	transitions: []
};

StopTimelineAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();

	if (!entity.hasComponent('TimelineComponent')) { return; }

	entity.timelineComponent.stop();
};

export { mod_StopTimelineAction as StopTimelineAction };