import { Action as Actionjs } from "./Action";

function StartTimelineAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

StartTimelineAction.prototype = Object.create(Actionjs.prototype);
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

var exported_StartTimelineAction = StartTimelineAction;
export { exported_StartTimelineAction as StartTimelineAction };