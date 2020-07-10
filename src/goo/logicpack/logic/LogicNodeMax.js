var LogicNodeMax_LogicNodeMax = LogicNodeMax;
import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeMax() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeMax.logicInterface;
	this.type = 'LogicNodeMax';
}

LogicNodeMax.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMax.editorName = 'Max';

LogicNodeMax.prototype.onInputChanged = function (instDesc) {
	var val1 = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeMax.inportX);
	var val2 = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeMax.inportY);
	var out = Math.max(val1, val2);

	LogicLayer_LogicLayerjs.writeValue(instDesc, LogicNodeMax.outportSum, out);
};

LogicNodeMax.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeMax.outportSum = LogicNodeMax.logicInterface.addOutputProperty('max', 'float');
LogicNodeMax.inportX = LogicNodeMax.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMax.inportY = LogicNodeMax.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes_LogicNodesjs.registerType('LogicNodeMax', LogicNodeMax);

/**
 * Logic node that computes the max of two inputs.
 * @private
 */
export { LogicNodeMax_LogicNodeMax as LogicNodeMax };