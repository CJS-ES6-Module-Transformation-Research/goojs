import { AbstractTimelineChannel } from "./AbstractTimelineChannel";
import { EventChannel } from "./EventChannel";
import { TimelineComponent } from "./TimelineComponent";
import { TimelineComponentHandler } from "./TimelineComponentHandler";
import { TimelineSystem } from "./TimelineSystem";
import { ValueChannel } from "./ValueChannel";
module.exports = {
	AbstractTimelineChannel: AbstractTimelineChannel,
	EventChannel: EventChannel,
	TimelineComponent: TimelineComponent,
	TimelineComponentHandler: TimelineComponentHandler,
	TimelineSystem: TimelineSystem,
	ValueChannel: ValueChannel
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}