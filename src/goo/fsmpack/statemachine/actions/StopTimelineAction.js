import { Action as Actionjs } from "./Action";

function StopTimelineAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

StopTimelineAction.prototype = Object.create(Actionjs.prototype);
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

var exported_StopTimelineAction = StopTimelineAction;
export { exported_StopTimelineAction as StopTimelineAction };