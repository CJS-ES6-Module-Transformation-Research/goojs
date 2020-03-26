import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
function LogicNodeTime() {
	LogicNode_LogicNodejs.call(this);
	this.wantsProcessCall = true;
	this.logicInterface = LogicNodeTime.logicInterface;
	this.type = 'LogicNodeTime';
	this._time = 0;
	this._running = true;
}

// Logic interface set-up
LogicNodeTime.prototype = Object.create(LogicNode_LogicNodejs.prototype);

LogicNodeTime.editorName = 'Time';
LogicNodeTime.logicInterface = new LogicInterface_LogicInterfacejs();

// ports
LogicNodeTime.outPropTime = LogicNodeTime.logicInterface.addOutputProperty('Time', 'float');

// events
LogicNodeTime.outEventReached1 = LogicNodeTime.logicInterface.addOutputEvent('>1');
LogicNodeTime.inEventStart = LogicNodeTime.logicInterface.addInputEvent('Start');
LogicNodeTime.inEventStop = LogicNodeTime.logicInterface.addInputEvent('Stop');
LogicNodeTime.inEventReset = LogicNodeTime.logicInterface.addInputEvent('Reset');

LogicNodeTime.prototype.onConfigure = function () {
	this._time = 0;
	this._running = true;
};

// Process
LogicNodeTime.prototype.processLogic = function (tpf) {
	if (this._running) {
		var old = this._time;
		this._time += tpf;
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeTime.outPropTime, this._time);

		if (old < 1 && this._time >= 1) {
			LogicLayer_LogicLayerjs.fireEvent(this.logicInstance, LogicNodeTime.outEventReached1);
		}
	}
};

// should they have args too?
LogicNodeTime.prototype.onEvent = function (instDesc, event) {
	if (event === LogicNodeTime.inEventStart) {
		this._running = true;
	} else if (event === LogicNodeTime.inEventStop) {
		this._running = false;
	} else if (event === LogicNodeTime.inEventReset) {
		this._time = 0;
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeTime.outPropTime, 0);
	}
};

LogicNodes_LogicNodesjs.registerType('LogicNodeTime', LogicNodeTime);

var exported_LogicNodeTime = LogicNodeTime;

/**
 * Logic node implementing a time counter. Processed every frame and time is increased. Output
 * can be read through the 'Time' port
 * @private
 */
export { exported_LogicNodeTime as LogicNodeTime };