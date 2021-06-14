var mod_LogicNodeSine = LogicNodeSine;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that calculates sin & cos.
 * @private
 */
function LogicNodeSine() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeSine.logicInterface;
	this.type = 'LogicNodeSine';
	this._time = 0;
}

LogicNodeSine.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeSine.editorName = 'Sine';

LogicNodeSine.prototype.onInputChanged = function (instDesc, portID, value) {
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeSine.outportSin, Math.sin(value));
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeSine.outportCos, Math.cos(value));
};

LogicNodeSine.logicInterface = new LogicInterface_LogicInterface();
LogicNodeSine.outportSin = LogicNodeSine.logicInterface.addOutputProperty('Sine', 'float');
LogicNodeSine.outportCos = LogicNodeSine.logicInterface.addOutputProperty('Cosine', 'float');
LogicNodeSine.inportPhase = LogicNodeSine.logicInterface.addInputProperty('Phase', 'float', 0);

LogicNodes_LogicNodes.registerType('LogicNodeSine', LogicNodeSine);

/**
 * Logic node that calculates sin & cos.
 * @private
 */
export { mod_LogicNodeSine as LogicNodeSine };