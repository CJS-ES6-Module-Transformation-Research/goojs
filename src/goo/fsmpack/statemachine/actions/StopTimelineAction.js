Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StopTimelineAction = undefined;

var _Action = require('./Action');

var exported_StopTimelineAction = StopTimelineAction;

function StopTimelineAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

StopTimelineAction.prototype = Object.create(_Action.Action.prototype);
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

	if (!entity.hasComponent('TimelineComponent')) {
		return;
	}

	entity.timelineComponent.stop();
};

exports.StopTimelineAction = exported_StopTimelineAction;
