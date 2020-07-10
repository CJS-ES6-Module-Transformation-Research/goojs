var SetTimelineTimeAction_SetTimelineTimeAction = SetTimelineTimeAction;
import { Action as Action_Actionjs } from "./Action";

function SetTimelineTimeAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

SetTimelineTimeAction.prototype = Object.create(Action_Actionjs.prototype);
SetTimelineTimeAction.prototype.constructor = SetTimelineTimeAction;

SetTimelineTimeAction.external = {
	key: 'Set Timeline Time',
	name: 'Set Timeline Time',
	type: 'timeline',
	description: 'Sets the current time of the timeline.',
	canTransition: true,
	parameters: [{
		name: 'Time',
		key: 'time',
		type: 'float',
		description: 'Timeline time to set.',
		'default': 0
	}],
	transitions: []
};

SetTimelineTimeAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();

	if (!entity.hasComponent('TimelineComponent')) { return; }

	entity.timelineComponent.setTime(this.time);
};

export { SetTimelineTimeAction_SetTimelineTimeAction as SetTimelineTimeAction };