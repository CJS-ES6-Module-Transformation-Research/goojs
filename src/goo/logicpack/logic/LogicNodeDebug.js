import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeDebug() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeDebug.logicInterface;
	this.type = 'LogicNodeDebug';
	this._time = 0;
}

LogicNodeDebug.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeDebug.editorName = 'Debug';

LogicNodeDebug.prototype.onInputChanged = function (instDesc, portID, value) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') value port ' + portID + ' = [' + value + ']');
};

LogicNodeDebug.prototype.onEvent = function (instDesc, portID) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') event on port ' + portID);
};

LogicNodeDebug.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeDebug.inportEvent = LogicNodeDebug.logicInterface.addInputEvent('Event');
LogicNodeDebug.inportFloat = LogicNodeDebug.logicInterface.addInputProperty('FloatValue', 'float', 0);

LogicNodes_LogicNodesjs.registerType('LogicNodeDebug', LogicNodeDebug);

var exported_LogicNodeDebug = LogicNodeDebug;

/**
 * Logic node that writes output to the console.
 * @private
 */
export { exported_LogicNodeDebug as LogicNodeDebug };