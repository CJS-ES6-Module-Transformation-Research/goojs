import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeSub_inportY;
var LogicNodeSub_inportX;
var LogicNodeSub_outportSum;
var LogicNodeSub_editorName;
var LogicNodeSub_logicInterface;
function LogicNodeSub() {
	LogicNodejs.call(this);
	LogicNodeSub_logicInterface = LogicNodeSub_logicInterface;;
	this.type = 'LogicNodeSub';
}

LogicNodeSub.prototype = Object.create(LogicNodejs.prototype);
LogicNodeSub_editorName = "Sub";;

LogicNodeSub.prototype.onInputChanged = function (instDesc /*, portID, value */ ) {
	var out = LogicLayerjs.readPort(instDesc, LogicNodeSub_inportX) -
		LogicLayerjs.readPort(instDesc, LogicNodeSub_inportY);

	LogicLayerjs.writeValue(this.logicInstance, LogicNodeSub_outportSum, out);
};

LogicNodeSub_logicInterface = new LogicInterfacejs();
LogicNodeSub_outportSum = LogicNodeSub_logicInterface.addOutputProperty("sum", "float");;
LogicNodeSub_inportX = LogicNodeSub_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeSub_inportY = LogicNodeSub_logicInterface.addInputProperty("y", "float", 0);;

LogicNodesjs.registerType('LogicNodeSub', LogicNodeSub);

var exported_LogicNodeSub = LogicNodeSub;

/**
 * Logic node that subtracts inputs.
 * @private
 */
export { exported_LogicNodeSub as LogicNodeSub };