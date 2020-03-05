import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeSub_inportY;
var LogicNodeSub_inportX;
var LogicNodeSub_outportSum;
var LogicNodeSub_editorName;
var LogicNodeSub_logicInterface;
function LogicNodeSub() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeSub_logicInterface = LogicNodeSub_logicInterface;;
	this.type = 'LogicNodeSub';
}

LogicNodeSub.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeSub_editorName = "Sub";;

LogicNodeSub.prototype.onInputChanged = function (instDesc /*, portID, value */ ) {
	var out = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeSub_inportX) -
		LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeSub_inportY);

	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeSub_outportSum, out);
};

LogicNodeSub_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeSub_outportSum = LogicNodeSub_logicInterface.addOutputProperty("sum", "float");;
LogicNodeSub_inportX = LogicNodeSub_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeSub_inportY = LogicNodeSub_logicInterface.addInputProperty("y", "float", 0);;

LogicNodes_LogicNodesjs.registerType('LogicNodeSub', LogicNodeSub);

var exported_LogicNodeSub = LogicNodeSub;

/**
 * Logic node that subtracts inputs.
 * @private
 */
export { exported_LogicNodeSub as LogicNodeSub };