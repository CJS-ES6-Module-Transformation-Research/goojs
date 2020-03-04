import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeMouse_outEventRmb;
var LogicNodeMouse_outEventLmb;
var LogicNodeMouse_portDY;
var LogicNodeMouse_portDX;
var LogicNodeMouse_portY;
var LogicNodeMouse_portX;
var LogicNodeMouse_editorName;
var LogicNodeMouse_eventMouseDown;
var LogicNodeMouse_eventMouseMove;
var LogicNodeMouse_logicInterface;
function LogicNodeMouse() {
	LogicNodejs.call(this);
	LogicNodeMouse_logicInterface = LogicNodeMouse_logicInterface;;
	this.type = 'LogicNodeMouse';

	LogicNodeMouse_eventMouseMove = function(event) {
        var mx = event.clientX;
        var my = event.clientY;
        var dx = mx - this.x;
        var dy = my - this.y;
        LogicLayerjs.writeValue(this.logicInstance, LogicNodeMouse_portX, mx);
        LogicLayerjs.writeValue(this.logicInstance, LogicNodeMouse_portY, my);
        LogicLayerjs.writeValue(this.logicInstance, LogicNodeMouse_portDX, dx);
        LogicLayerjs.writeValue(this.logicInstance, LogicNodeMouse_portDY, dy);
    }.bind(this);;

	LogicNodeMouse_eventMouseDown = function(event) {
        if (event.button === 0) {
            LogicLayerjs.fireEvent(this.logicInstance, LogicNodeMouse_outEventLmb);
        }
        if (event.button === 2) {
            LogicLayerjs.fireEvent(this.logicInstance, LogicNodeMouse_outEventRmb);
        }
    }.bind(this);;
}

LogicNodeMouse.prototype = Object.create(LogicNodejs.prototype);
LogicNodeMouse_editorName = "Mouse";;

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

LogicNodeMouse_logicInterface = new LogicInterfacejs();
LogicNodeMouse_portX = LogicNodeMouse_logicInterface.addOutputProperty("x", "float", 0);;
LogicNodeMouse_portY = LogicNodeMouse_logicInterface.addOutputProperty("y", "float", 0);;
LogicNodeMouse_portDX = LogicNodeMouse_logicInterface.addOutputProperty("dx", "float", 0);;
LogicNodeMouse_portDY = LogicNodeMouse_logicInterface.addOutputProperty("dy", "float", 0);;
LogicNodeMouse_outEventLmb = LogicNodeMouse_logicInterface.addOutputEvent("lmb");;
LogicNodeMouse_outEventRmb = LogicNodeMouse_logicInterface.addOutputEvent("rmb");;

LogicNodesjs.registerType('LogicNodeMouse', LogicNodeMouse);

var exported_LogicNodeMouse = LogicNodeMouse;

/**
 * Logic node that reads mouse input.
 * @private
 */
export { exported_LogicNodeMouse as LogicNodeMouse };