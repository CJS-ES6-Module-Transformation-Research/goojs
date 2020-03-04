import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
var LogicNodeRandom_outPropRandom;
var LogicNodeRandom_editorName;
var LogicNodeRandom_logicInterface;
function LogicNodeRandom() {
	LogicNodejs.call(this);
	this.wantsProcessCall = true;
	LogicNodeRandom_logicInterface = LogicNodeRandom_logicInterface;;
	this.type = 'LogicNodeRandom';
}

// Logic interface set-up
LogicNodeRandom.prototype = Object.create(LogicNodejs.prototype);
LogicNodeRandom_editorName = "Random";;
LogicNodeRandom_logicInterface = new LogicInterfacejs();

// ports
LogicNodeRandom_outPropRandom = LogicNodeRandom_logicInterface.addOutputProperty("Random0_1", "float");;

// Process
LogicNodeRandom.prototype.processLogic = function () {
	LogicLayerjs.writeValue(this.logicInstance, LogicNodeRandom_outPropRandom, Math.random());
};

LogicNodesjs.registerType('LogicNodeRandom', LogicNodeRandom);

var exported_LogicNodeRandom = LogicNodeRandom;

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
export { exported_LogicNodeRandom as LogicNodeRandom };