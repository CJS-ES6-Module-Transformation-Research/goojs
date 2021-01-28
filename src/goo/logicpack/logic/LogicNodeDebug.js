var mod_LogicNodeDebug = LogicNodeDebug;
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that writes output to the console.
 * @private
 */
function LogicNodeDebug() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeDebug.logicInterface;
	this.type = 'LogicNodeDebug';
	this._time = 0;
}

LogicNodeDebug.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeDebug.editorName = 'Debug';

LogicNodeDebug.prototype.onInputChanged = function (instDesc, portID, value) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') value port ' + portID + ' = [' + value + ']');
};

LogicNodeDebug.prototype.onEvent = function (instDesc, portID) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') event on port ' + portID);
};

LogicNodeDebug.logicInterface = new LogicInterface_LogicInterface();
LogicNodeDebug.inportEvent = LogicNodeDebug.logicInterface.addInputEvent('Event');
LogicNodeDebug.inportFloat = LogicNodeDebug.logicInterface.addInputProperty('FloatValue', 'float', 0);

LogicNodes_LogicNodes.registerType('LogicNodeDebug', LogicNodeDebug);

/**
 * Logic node that writes output to the console.
 * @private
 */
export { mod_LogicNodeDebug as LogicNodeDebug };