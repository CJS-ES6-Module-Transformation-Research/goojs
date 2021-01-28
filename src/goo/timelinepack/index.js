import { AbstractTimelineChannel as AbstractTimelineChannel_AbstractTimelineChannel } from "./AbstractTimelineChannel";
import { EventChannel as EventChannel_EventChannel } from "./EventChannel";
import { TimelineComponent as TimelineComponent_TimelineComponent } from "./TimelineComponent";
import {     TimelineComponentHandler as TimelineComponentHandler_TimelineComponentHandler, } from "./TimelineComponentHandler";
import { TimelineSystem as TimelineSystem_TimelineSystem } from "./TimelineSystem";
import { ValueChannel as ValueChannel_ValueChannel } from "./ValueChannel";
var indexjs;
indexjs = {
	AbstractTimelineChannel: AbstractTimelineChannel_AbstractTimelineChannel,
	EventChannel: EventChannel_EventChannel,
	TimelineComponent: TimelineComponent_TimelineComponent,
	TimelineComponentHandler: TimelineComponentHandler_TimelineComponentHandler,
	TimelineSystem: TimelineSystem_TimelineSystem,
	ValueChannel: ValueChannel_ValueChannel
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}