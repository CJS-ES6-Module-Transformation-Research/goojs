import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeAdd_inportY;
var LogicNodeAdd_inportX;
var LogicNodeAdd_outportSum;
var LogicNodeAdd_editorName;
var LogicNodeAdd_logicInterface;
function LogicNodeAdd() {
	LogicNodejs.call(this);
	LogicNodeAdd_logicInterface = LogicNodeAdd_logicInterface;;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(LogicNodejs.prototype);
LogicNodeAdd_editorName = "Add";;

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = LogicLayerjs.readPort(instDesc, LogicNodeAdd_inportX) +
		LogicLayerjs.readPort(instDesc, LogicNodeAdd_inportY);

	LogicLayerjs.writeValue(this.logicInstance, LogicNodeAdd_outportSum, out);
};

LogicNodeAdd_logicInterface = new LogicInterfacejs();
LogicNodeAdd_outportSum = LogicNodeAdd_logicInterface.addOutputProperty("sum", "float");;
LogicNodeAdd_inportX = LogicNodeAdd_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeAdd_inportY = LogicNodeAdd_logicInterface.addInputProperty("y", "float", 0);;

LogicNodesjs.registerType('LogicNodeAdd', LogicNodeAdd);

var exported_LogicNodeAdd = LogicNodeAdd;

/**
 * Logic node to add values.
 * @private
 */
export { exported_LogicNodeAdd as LogicNodeAdd };
