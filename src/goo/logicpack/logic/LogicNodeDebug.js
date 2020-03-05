import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeDebug_inportFloat;
var LogicNodeDebug_inportEvent;
var LogicNodeDebug_editorName;
var LogicNodeDebug_logicInterface;
function LogicNodeDebug() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeDebug_logicInterface = LogicNodeDebug_logicInterface;;
	this.type = 'LogicNodeDebug';
	this._time = 0;
}

LogicNodeDebug.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeDebug_editorName = "Debug";;

LogicNodeDebug.prototype.onInputChanged = function (instDesc, portID, value) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') value port ' + portID + ' = [' + value + ']');
};

LogicNodeDebug.prototype.onEvent = function (instDesc, portID) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') event on port ' + portID);
};

LogicNodeDebug_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeDebug_inportEvent = LogicNodeDebug_logicInterface.addInputEvent("Event");;
LogicNodeDebug_inportFloat = LogicNodeDebug_logicInterface.addInputProperty("FloatValue", "float", 0);;

LogicNodes_LogicNodesjs.registerType('LogicNodeDebug', LogicNodeDebug);

var exported_LogicNodeDebug = LogicNodeDebug;

/**
 * Logic node that writes output to the console.
 * @private
 */
export { exported_LogicNodeDebug as LogicNodeDebug };