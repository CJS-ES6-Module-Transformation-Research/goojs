var StartTimelineAction_StartTimelineAction = StartTimelineAction;
import { Action as Action_Actionjs } from "./Action";

function StartTimelineAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

StartTimelineAction.prototype = Object.create(Action_Actionjs.prototype);
StartTimelineAction.prototype.constructor = StartTimelineAction;

StartTimelineAction.external = {
	key: 'Start Timeline',
	name: 'Start Timeline',
	type: 'timeline',
	description: 'Starts or resumes the timeline.',
	canTransition: true,
	parameters: [],
	transitions: []
};

StartTimelineAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();

	if (!entity.hasComponent('TimelineComponent')) { return; }

	entity.timelineComponent.start();
};

export { StartTimelineAction_StartTimelineAction as StartTimelineAction };