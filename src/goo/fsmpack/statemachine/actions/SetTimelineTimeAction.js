'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetTimelineTimeAction = undefined;

var _Action = require('./Action');

function SetTimelineTimeAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

SetTimelineTimeAction.prototype = Object.create(_Action.Action.prototype);
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

	if (!entity.hasComponent('TimelineComponent')) {
		return;
	}

	entity.timelineComponent.setTime(this.time);
};

var exported_SetTimelineTimeAction = SetTimelineTimeAction;
exports.SetTimelineTimeAction = exported_SetTimelineTimeAction;
