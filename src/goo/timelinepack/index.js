var _AbstractTimelineChannel = require("./AbstractTimelineChannel");

var _EventChannel = require("./EventChannel");

var _TimelineComponent = require("./TimelineComponent");

var _TimelineComponentHandler = require("./TimelineComponentHandler");

var _TimelineSystem = require("./TimelineSystem");

var _ValueChannel = require("./ValueChannel");

module.exports = {
	AbstractTimelineChannel: _AbstractTimelineChannel.AbstractTimelineChannel,
	EventChannel: _EventChannel.EventChannel,
	TimelineComponent: _TimelineComponent.TimelineComponent,
	TimelineComponentHandler: _TimelineComponentHandler.TimelineComponentHandler,
	TimelineSystem: _TimelineSystem.TimelineSystem,
	ValueChannel: _ValueChannel.ValueChannel
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
