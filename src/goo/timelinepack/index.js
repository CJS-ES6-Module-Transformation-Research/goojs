import {     AbstractTimelineChannel as AbstractTimelineChannel_AbstractTimelineChanneljs, } from "./AbstractTimelineChannel";
import { EventChannel as EventChannel_EventChanneljs } from "./EventChannel";
import { TimelineComponent as TimelineComponentjs } from "./TimelineComponent";
import { TimelineComponentHandler as TimelineComponentHandlerjs } from "./TimelineComponentHandler";
import { TimelineSystem as TimelineSystemjs } from "./TimelineSystem";
import { ValueChannel as ValueChanneljs } from "./ValueChannel";
module.exports = {
	AbstractTimelineChannel: AbstractTimelineChannel_AbstractTimelineChanneljs,
	EventChannel: EventChannel_EventChanneljs,
	TimelineComponent: TimelineComponentjs,
	TimelineComponentHandler: TimelineComponentHandlerjs,
	TimelineSystem: TimelineSystemjs,
	ValueChannel: ValueChanneljs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}