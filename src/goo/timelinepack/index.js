"use strict";

var _AbstractTimelineChannel = require("./AbstractTimelineChannel");

var _EventChannel = require("./EventChannel");

var _TimelineComponent = require("./TimelineComponent");

var _TimelineComponentHandler = require("./TimelineComponentHandler");

var _TimelineSystem = require("./TimelineSystem");

var _ValueChannel = require("./ValueChannel");

var indexjs;
indexjs = {
	AbstractTimelineChannel: _AbstractTimelineChannel.AbstractTimelineChanneljs,
	EventChannel: _EventChannel.EventChanneljs,
	TimelineComponent: _TimelineComponent.TimelineComponentjs,
	TimelineComponentHandler: _TimelineComponentHandler.TimelineComponentHandlerjs,
	TimelineSystem: _TimelineSystem.TimelineSystemjs,
	ValueChannel: _ValueChannel.ValueChanneljs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
