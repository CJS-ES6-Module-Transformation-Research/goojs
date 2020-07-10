var StopTimelineAction_StopTimelineAction = StopTimelineAction;
import { Action as Action_Actionjs } from "./Action";

function StopTimelineAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

StopTimelineAction.prototype = Object.create(Action_Actionjs.prototype);
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

export { StopTimelineAction_StopTimelineAction as StopTimelineAction };