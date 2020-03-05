import {     AbstractTimelineChannel as AbstractTimelineChannel_AbstractTimelineChanneljs, } from "./AbstractTimelineChannel";
import { EventChannel as EventChannel_EventChanneljs } from "./EventChannel";
import { TimelineComponent as TimelineComponent_TimelineComponentjs } from "./TimelineComponent";
import {     TimelineComponentHandler as TimelineComponentHandler_TimelineComponentHandlerjs, } from "./TimelineComponentHandler";
import { TimelineSystem as TimelineSystem_TimelineSystemjs } from "./TimelineSystem";
import { ValueChannel as ValueChannel_ValueChanneljs } from "./ValueChannel";
module.exports = {
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