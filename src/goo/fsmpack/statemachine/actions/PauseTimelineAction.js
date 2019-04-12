Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = PauseTimelineAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function PauseTimelineAction() {
	_Action2.default.apply(this, arguments);
}

PauseTimelineAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
