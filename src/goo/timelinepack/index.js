import AbstractTimelineChannel_moduleDefault from "./AbstractTimelineChannel";
import EventChannel_moduleDefault from "./EventChannel";
import TimelineComponent_moduleDefault from "./TimelineComponent";
import TimelineComponentHandler_moduleDefault from "./TimelineComponentHandler";
import TimelineSystem_moduleDefault from "./TimelineSystem";
import ValueChannel_moduleDefault from "./ValueChannel";
export default {
	AbstractTimelineChannel: AbstractTimelineChannel_moduleDefault,
	EventChannel: EventChannel_moduleDefault,
	TimelineComponent: TimelineComponent_moduleDefault,
	TimelineComponentHandler: TimelineComponentHandler_moduleDefault,
	TimelineSystem: TimelineSystem_moduleDefault,
	ValueChannel: ValueChannel_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}