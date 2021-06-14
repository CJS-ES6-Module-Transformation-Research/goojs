var mod_LogicNodeRandom = LogicNodeRandom;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
function LogicNodeRandom() {
	LogicNode_LogicNode.call(this);
	this.wantsProcessCall = true;
	this.logicInterface = LogicNodeRandom.logicInterface;
	this.type = 'LogicNodeRandom';
}

// Logic interface set-up
LogicNodeRandom.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeRandom.editorName = 'Random';
LogicNodeRandom.logicInterface = new LogicInterface_LogicInterface();

// ports
LogicNodeRandom.outPropRandom = LogicNodeRandom.logicInterface.addOutputProperty('Random0_1', 'float');

// Process
LogicNodeRandom.prototype.processLogic = function () {
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeRandom.outPropRandom, Math.random());
};

LogicNodes_LogicNodes.registerType('LogicNodeRandom', LogicNodeRandom);

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
export { mod_LogicNodeRandom as LogicNodeRandom };