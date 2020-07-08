var LogicNodeMax_LogicNodeMax = LogicNodeMax;
import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeMax() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeMax.logicInterface;
	this.type = 'LogicNodeMax';
}

LogicNodeMax.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMax.editorName = 'Max';

LogicNodeMax.prototype.onInputChanged = function (instDesc) {
	var val1 = LogicLayerjs_readPort(instDesc, LogicNodeMax.inportX);
	var val2 = LogicLayerjs_readPort(instDesc, LogicNodeMax.inportY);
	var out = Math.max(val1, val2);

	LogicLayerjs_writeValue(instDesc, LogicNodeMax.outportSum, out);
};

LogicNodeMax.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeMax.outportSum = LogicNodeMax.logicInterface.addOutputProperty('max', 'float');
LogicNodeMax.inportX = LogicNodeMax.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMax.inportY = LogicNodeMax.logicInterface.addInputProperty('y', 'float', 0);

LogicNodesjs_registerType('LogicNodeMax', LogicNodeMax);

/**
 * Logic node that computes the max of two inputs.
 * @private
 */
export { LogicNodeMax_LogicNodeMax as LogicNodeMax };