import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
function LogicNodeRandom() {
	LogicNode_LogicNodejs.call(this);
	this.wantsProcessCall = true;
	this.logicInterface = LogicNodeRandom.logicInterface;
	this.type = 'LogicNodeRandom';
}

// Logic interface set-up
LogicNodeRandom.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeRandom.editorName = 'Random';
LogicNodeRandom.logicInterface = new LogicInterface_LogicInterfacejs();

// ports
LogicNodeRandom.outPropRandom = LogicNodeRandom.logicInterface.addOutputProperty('Random0_1', 'float');

// Process
LogicNodeRandom.prototype.processLogic = function () {
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeRandom.outPropRandom, Math.random());
};

LogicNodes_LogicNodesjs.registerType('LogicNodeRandom', LogicNodeRandom);

var exported_LogicNodeRandom = LogicNodeRandom;

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
export { exported_LogicNodeRandom as LogicNodeRandom };