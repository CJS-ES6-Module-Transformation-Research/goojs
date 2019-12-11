import { LogicLayer } from "./LogicLayer";
import { LogicNode } from "./LogicNode";
import * as LogicNodes from "./LogicNodes";
import { LogicInterface } from "./LogicInterface";
var exported_LogicNodeAdd = LogicNodeAdd;
function LogicNodeAdd() {
	LogicNode.call(this);
	this.logicInterface = LogicNodeAdd.logicInterface;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(LogicNode.prototype);
LogicNodeAdd.editorName = 'Add';

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = LogicLayer.readPort(instDesc, LogicNodeAdd.inportX) +
		LogicLayer.readPort(instDesc, LogicNodeAdd.inportY);

	LogicLayer.writeValue(this.logicInstance, LogicNodeAdd.outportSum, out);
};

LogicNodeAdd.logicInterface = new LogicInterface();
LogicNodeAdd.outportSum = LogicNodeAdd.logicInterface.addOutputProperty('sum', 'float');
LogicNodeAdd.inportX = LogicNodeAdd.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeAdd.inportY = LogicNodeAdd.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes.registerType('LogicNodeAdd', LogicNodeAdd);

/**
 * Logic node to add values.
 * @private
 */
export { exported_LogicNodeAdd as LogicNodeAdd };
