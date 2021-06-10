var mod_LogicNodeAdd = LogicNodeAdd;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node to add values.
 * @private
 */
function LogicNodeAdd() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeAdd.logicInterface;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeAdd.editorName = 'Add';

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeAdd.inportX) +
		LogicLayer_LogicLayer.readPort(instDesc, LogicNodeAdd.inportY);

	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeAdd.outportSum, out);
};

LogicNodeAdd.logicInterface = new LogicInterface_LogicInterface();
LogicNodeAdd.outportSum = LogicNodeAdd.logicInterface.addOutputProperty('sum', 'float');
LogicNodeAdd.inportX = LogicNodeAdd.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeAdd.inportY = LogicNodeAdd.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes_LogicNodes.registerType('LogicNodeAdd', LogicNodeAdd);

/**
 * Logic node to add values.
 * @private
 */
export { mod_LogicNodeAdd as LogicNodeAdd };
