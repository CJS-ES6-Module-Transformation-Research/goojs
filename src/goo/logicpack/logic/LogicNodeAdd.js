import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeAdd() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeAdd.logicInterface;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeAdd.editorName = 'Add';

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeAdd.inportX) +
		LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeAdd.inportY);

	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeAdd.outportSum, out);
};

LogicNodeAdd.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeAdd.outportSum = LogicNodeAdd.logicInterface.addOutputProperty('sum', 'float');
LogicNodeAdd.inportX = LogicNodeAdd.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeAdd.inportY = LogicNodeAdd.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes_LogicNodesjs.registerType('LogicNodeAdd', LogicNodeAdd);

var exported_LogicNodeAdd = LogicNodeAdd;

/**
 * Logic node to add values.
 * @private
 */
export { exported_LogicNodeAdd as LogicNodeAdd };
