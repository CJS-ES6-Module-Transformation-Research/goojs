import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeAdd_inportY;
var LogicNodeAdd_inportX;
var LogicNodeAdd_outportSum;
var LogicNodeAdd_editorName;
var LogicNodeAdd_logicInterface;
function LogicNodeAdd() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeAdd_logicInterface = LogicNodeAdd_logicInterface;;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeAdd_editorName = "Add";;

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = LogicLayerjs_readPort(instDesc, LogicNodeAdd_inportX) +
		LogicLayerjs_readPort(instDesc, LogicNodeAdd_inportY);

	LogicLayerjs_writeValue(this.logicInstance, LogicNodeAdd_outportSum, out);
};

LogicNodeAdd_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeAdd_outportSum = LogicNodeAdd_logicInterface.addOutputProperty("sum", "float");;
LogicNodeAdd_inportX = LogicNodeAdd_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeAdd_inportY = LogicNodeAdd_logicInterface.addInputProperty("y", "float", 0);;

LogicNodesjs_registerType('LogicNodeAdd', LogicNodeAdd);

var exported_LogicNodeAdd = LogicNodeAdd;

/**
 * Logic node to add values.
 * @private
 */
export { exported_LogicNodeAdd as LogicNodeAdd };
