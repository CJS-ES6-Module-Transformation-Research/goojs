import { writeValue as LogicLayerjs_writeValue } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
var LogicNodeRandom_outPropRandom;
var LogicNodeRandom_editorName;
var LogicNodeRandom_logicInterface;
function LogicNodeRandom() {
	LogicNode_LogicNodejs.call(this);
	this.wantsProcessCall = true;
	LogicNodeRandom_logicInterface = LogicNodeRandom_logicInterface;;
	this.type = 'LogicNodeRandom';
}

// Logic interface set-up
LogicNodeRandom.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeRandom_editorName = "Random";;
LogicNodeRandom_logicInterface = new LogicInterface_LogicInterfacejs();

// ports
LogicNodeRandom_outPropRandom = LogicNodeRandom_logicInterface.addOutputProperty("Random0_1", "float");;

// Process
LogicNodeRandom.prototype.processLogic = function () {
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeRandom_outPropRandom, Math.random());
};

LogicNodesjs_registerType('LogicNodeRandom', LogicNodeRandom);

var exported_LogicNodeRandom = LogicNodeRandom;

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
export { exported_LogicNodeRandom as LogicNodeRandom };