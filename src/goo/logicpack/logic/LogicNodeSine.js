import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeSine_inportPhase;
var LogicNodeSine_outportCos;
var LogicNodeSine_outportSin;
var LogicNodeSine_editorName;
var LogicNodeSine_logicInterface;
function LogicNodeSine() {
	LogicNodejs.call(this);
	LogicNodeSine_logicInterface = LogicNodeSine_logicInterface;;
	this.type = 'LogicNodeSine';
	this._time = 0;
}

LogicNodeSine.prototype = Object.create(LogicNodejs.prototype);
LogicNodeSine_editorName = "Sine";;

LogicNodeSine.prototype.onInputChanged = function (instDesc, portID, value) {
	LogicLayerjs.writeValue(this.logicInstance, LogicNodeSine_outportSin, Math.sin(value));
	LogicLayerjs.writeValue(this.logicInstance, LogicNodeSine_outportCos, Math.cos(value));
};

LogicNodeSine_logicInterface = new LogicInterfacejs();
LogicNodeSine_outportSin = LogicNodeSine_logicInterface.addOutputProperty("Sine", "float");;
LogicNodeSine_outportCos = LogicNodeSine_logicInterface.addOutputProperty("Cosine", "float");;
LogicNodeSine_inportPhase = LogicNodeSine_logicInterface.addInputProperty("Phase", "float", 0);;

LogicNodesjs.registerType('LogicNodeSine', LogicNodeSine);

var exported_LogicNodeSine = LogicNodeSine;

/**
 * Logic node that calculates sin & cos.
 * @private
 */
export { exported_LogicNodeSine as LogicNodeSine };