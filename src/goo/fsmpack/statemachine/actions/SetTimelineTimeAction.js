var mod_SetTimelineTimeAction = SetTimelineTimeAction;
import { Action as Action_Action } from "./Action";

function SetTimelineTimeAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

SetTimelineTimeAction.prototype = Object.create(Action_Action.prototype);
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

export { mod_SetTimelineTimeAction as SetTimelineTimeAction };