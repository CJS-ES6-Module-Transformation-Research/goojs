import {     AbstractTimelineChanneljs as AbstractTimelineChannel_AbstractTimelineChanneljs, } from "./AbstractTimelineChannel";
import { EventChanneljs as EventChannel_EventChanneljs } from "./EventChannel";
import { TimelineComponentjs as TimelineComponent_TimelineComponentjs } from "./TimelineComponent";
import {     TimelineComponentHandlerjs as TimelineComponentHandler_TimelineComponentHandlerjs, } from "./TimelineComponentHandler";
import { TimelineSystemjs as TimelineSystem_TimelineSystemjs } from "./TimelineSystem";
import { ValueChanneljs as ValueChannel_ValueChanneljs } from "./ValueChannel";
var indexjs;
indexjs = {
	AbstractTimelineChannel: AbstractTimelineChannel_AbstractTimelineChanneljs,
	EventChannel: EventChannel_EventChanneljs,
	TimelineComponent: TimelineComponent_TimelineComponentjs,
	TimelineComponentHandler: TimelineComponentHandler_TimelineComponentHandlerjs,
	TimelineSystem: TimelineSystem_TimelineSystemjs,
	ValueChannel: ValueChannel_ValueChanneljs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}