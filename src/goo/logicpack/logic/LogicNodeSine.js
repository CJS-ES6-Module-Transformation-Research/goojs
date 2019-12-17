import { LogicLayer } from "./LogicLayer";
import { LogicNode } from "./LogicNode";
import * as LogicNodes from "./LogicNodes";
import { LogicInterface } from "./LogicInterface";
var exported_LogicNodeSine = LogicNodeSine;
function LogicNodeSine() {
	LogicNode.call(this);
	this.logicInterface = LogicNodeSine.logicInterface;
	this.type = 'LogicNodeSine';
	this._time = 0;
}

LogicNodeSine.prototype = Object.create(LogicNode.prototype);
LogicNodeSine.editorName = 'Sine';

LogicNodeSine.prototype.onInputChanged = function (instDesc, portID, value) {
	LogicLayer.writeValue(this.logicInstance, LogicNodeSine.outportSin, Math.sin(value));
	LogicLayer.writeValue(this.logicInstance, LogicNodeSine.outportCos, Math.cos(value));
};

LogicNodeSine.logicInterface = new LogicInterface();
LogicNodeSine.outportSin = LogicNodeSine.logicInterface.addOutputProperty('Sine', 'float');
LogicNodeSine.outportCos = LogicNodeSine.logicInterface.addOutputProperty('Cosine', 'float');
LogicNodeSine.inportPhase = LogicNodeSine.logicInterface.addInputProperty('Phase', 'float', 0);

LogicNodes.registerType('LogicNodeSine', LogicNodeSine);

/**
 * Logic node that calculates sin & cos.
 * @private
 */
export { exported_LogicNodeSine as LogicNodeSine };