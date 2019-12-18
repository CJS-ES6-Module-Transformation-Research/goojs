import { LogicLayer } from "./LogicLayer";
import { LogicNode } from "./LogicNode";
import { LogicInterface } from "./LogicInterface";
import * as LogicNodes from "./LogicNodes";
function LogicNodeRandom() {
	LogicNode.call(this);
	this.wantsProcessCall = true;
	this.logicInterface = LogicNodeRandom.logicInterface;
	this.type = 'LogicNodeRandom';
}

// Logic interface set-up
LogicNodeRandom.prototype = Object.create(LogicNode.prototype);
LogicNodeRandom.editorName = 'Random';
LogicNodeRandom.logicInterface = new LogicInterface();

// ports
LogicNodeRandom.outPropRandom = LogicNodeRandom.logicInterface.addOutputProperty('Random0_1', 'float');

// Process
LogicNodeRandom.prototype.processLogic = function () {
	LogicLayer.writeValue(this.logicInstance, LogicNodeRandom.outPropRandom, Math.random());
};

LogicNodes.registerType('LogicNodeRandom', LogicNodeRandom);

var exported_LogicNodeRandom = LogicNodeRandom;

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
export { exported_LogicNodeRandom as LogicNodeRandom };