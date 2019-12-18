Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PauseTimelineAction = undefined;

var _Action = require('./Action');

function PauseTimelineAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

PauseTimelineAction.prototype = Object.create(_Action.Action.prototype);
PauseTimelineAction.prototype.constructor = PauseTimelineAction;

PauseTimelineAction.external = {
	key: 'Pause Timeline',
	name: 'Pause Timeline',
	type: 'timeline',
	description: 'Pauses the timeline.',
	canTransition: true,
	parameters: [],
	transitions: []
};

PauseTimelineAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();

	if (!entity.hasComponent('TimelineComponent')) {
		return;
	}

	entity.timelineComponent.pause();
};

var exported_PauseTimelineAction = PauseTimelineAction;
exports.PauseTimelineAction = exported_PauseTimelineAction;
