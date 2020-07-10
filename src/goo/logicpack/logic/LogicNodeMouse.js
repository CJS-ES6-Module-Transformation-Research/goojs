var LogicNodeMouse_LogicNodeMouse = LogicNodeMouse;
import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeMouse() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeMouse.logicInterface;
	this.type = 'LogicNodeMouse';

	this.eventMouseMove = function (event) {
		var mx = event.clientX;
		var my = event.clientY;
		var dx = mx - this.x;
		var dy = my - this.y;
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeMouse.portX, mx);
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeMouse.portY, my);
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeMouse.portDX, dx);
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeMouse.portDY, dy);
	}.bind(this);

	this.eventMouseDown = function (event) {
		if (event.button === 0) {
			LogicLayer_LogicLayerjs.fireEvent(this.logicInstance, LogicNodeMouse.outEventLmb);
		}
		if (event.button === 2) {
			LogicLayer_LogicLayerjs.fireEvent(this.logicInstance, LogicNodeMouse.outEventRmb);
		}
	}.bind(this);
}

LogicNodeMouse.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMouse.editorName = 'Mouse';

LogicNodeMouse.prototype.onSystemStarted = function () {
	this.x = 0;
	this.y = 0;
	document.addEventListener('mousemove', this.eventMouseMove, false);
	document.addEventListener('mousedown', this.eventMouseDown, false);
};

LogicNodeMouse.prototype.onSystemStopped = function () {
	document.removeEventListener('mousemove', this.eventMouseMove);
	document.removeEventListener('mousedown', this.eventMouseDown);
};

LogicNodeMouse.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeMouse.portX = LogicNodeMouse.logicInterface.addOutputProperty('x', 'float', 0);
LogicNodeMouse.portY = LogicNodeMouse.logicInterface.addOutputProperty('y', 'float', 0);
LogicNodeMouse.portDX = LogicNodeMouse.logicInterface.addOutputProperty('dx', 'float', 0);
LogicNodeMouse.portDY = LogicNodeMouse.logicInterface.addOutputProperty('dy', 'float', 0);
LogicNodeMouse.outEventLmb = LogicNodeMouse.logicInterface.addOutputEvent('lmb');
LogicNodeMouse.outEventRmb = LogicNodeMouse.logicInterface.addOutputEvent('rmb');

LogicNodes_LogicNodesjs.registerType('LogicNodeMouse', LogicNodeMouse);

/**
 * Logic node that reads mouse input.
 * @private
 */
export { LogicNodeMouse_LogicNodeMouse as LogicNodeMouse };