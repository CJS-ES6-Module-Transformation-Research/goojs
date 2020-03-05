import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeMax_inportY;
var LogicNodeMax_inportX;
var LogicNodeMax_outportSum;
var LogicNodeMax_editorName;
var LogicNodeMax_logicInterface;
function LogicNodeMax() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeMax_logicInterface = LogicNodeMax_logicInterface;;
	this.type = 'LogicNodeMax';
}

LogicNodeMax.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMax_editorName = "Max";;

LogicNodeMax.prototype.onInputChanged = function (instDesc) {
	var val1 = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeMax_inportX);
	var val2 = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeMax_inportY);
	var out = Math.max(val1, val2);

	LogicLayer_LogicLayerjs.writeValue(instDesc, LogicNodeMax_outportSum, out);
};

LogicNodeMax_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeMax_outportSum = LogicNodeMax_logicInterface.addOutputProperty("max", "float");;
LogicNodeMax_inportX = LogicNodeMax_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeMax_inportY = LogicNodeMax_logicInterface.addInputProperty("y", "float", 0);;

LogicNodes_LogicNodesjs.registerType('LogicNodeMax', LogicNodeMax);

var exported_LogicNodeMax = LogicNodeMax;

/**
 * Logic node that computes the max of two inputs.
 * @private
 */
export { exported_LogicNodeMax as LogicNodeMax };