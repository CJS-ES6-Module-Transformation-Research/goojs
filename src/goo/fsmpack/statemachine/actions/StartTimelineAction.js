'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StartTimelineAction = undefined;

var _Action = require('./Action');

var StartTimelineAction_StartTimelineAction = StartTimelineAction;

function StartTimelineAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

StartTimelineAction.prototype = Object.create(_Action.Action.prototype);
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

	if (!entity.hasComponent('TimelineComponent')) {
		return;
	}

	entity.timelineComponent.start();
};

exports.StartTimelineAction = StartTimelineAction_StartTimelineAction;