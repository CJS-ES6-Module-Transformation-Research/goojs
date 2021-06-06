var mod_LogicNodeMax = LogicNodeMax;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that computes the max of two inputs.
 * @private
 */
function LogicNodeMax() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeMax.logicInterface;
	this.type = 'LogicNodeMax';
}

LogicNodeMax.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeMax.editorName = 'Max';

LogicNodeMax.prototype.onInputChanged = function (instDesc) {
	var val1 = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeMax.inportX);
	var val2 = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeMax.inportY);
	var out = Math.max(val1, val2);

	LogicLayer_LogicLayer.writeValue(instDesc, LogicNodeMax.outportSum, out);
};

LogicNodeMax.logicInterface = new LogicInterface_LogicInterface();
LogicNodeMax.outportSum = LogicNodeMax.logicInterface.addOutputProperty('max', 'float');
LogicNodeMax.inportX = LogicNodeMax.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMax.inportY = LogicNodeMax.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes_LogicNodes.registerType('LogicNodeMax', LogicNodeMax);

/**
 * Logic node that computes the max of two inputs.
 * @private
 */
export { mod_LogicNodeMax as LogicNodeMax };