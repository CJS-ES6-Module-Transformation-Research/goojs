Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = StartTimelineAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function StartTimelineAction() {
	_Action2.default.apply(this, arguments);
}

StartTimelineAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
