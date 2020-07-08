var LogicNodeAdd_LogicNodeAdd = LogicNodeAdd;
import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeAdd() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeAdd.logicInterface;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeAdd.editorName = 'Add';

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = LogicLayerjs_readPort(instDesc, LogicNodeAdd.inportX) +
		LogicLayerjs_readPort(instDesc, LogicNodeAdd.inportY);

	LogicLayerjs_writeValue(this.logicInstance, LogicNodeAdd.outportSum, out);
};

LogicNodeAdd.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeAdd.outportSum = LogicNodeAdd.logicInterface.addOutputProperty('sum', 'float');
LogicNodeAdd.inportX = LogicNodeAdd.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeAdd.inportY = LogicNodeAdd.logicInterface.addInputProperty('y', 'float', 0);

LogicNodesjs_registerType('LogicNodeAdd', LogicNodeAdd);

/**
 * Logic node to add values.
 * @private
 */
export { LogicNodeAdd_LogicNodeAdd as LogicNodeAdd };
