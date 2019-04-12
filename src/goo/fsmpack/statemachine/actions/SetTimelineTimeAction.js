Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetTimelineTimeAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetTimelineTimeAction() {
	_Action2.default.apply(this, arguments);
}

SetTimelineTimeAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
