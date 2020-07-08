var LogicNodeSine_LogicNodeSine = LogicNodeSine;
import { writeValue as LogicLayerjs_writeValue } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeSine() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeSine.logicInterface;
	this.type = 'LogicNodeSine';
	this._time = 0;
}

LogicNodeSine.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeSine.editorName = 'Sine';

LogicNodeSine.prototype.onInputChanged = function (instDesc, portID, value) {
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeSine.outportSin, Math.sin(value));
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeSine.outportCos, Math.cos(value));
};

LogicNodeSine.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeSine.outportSin = LogicNodeSine.logicInterface.addOutputProperty('Sine', 'float');
LogicNodeSine.outportCos = LogicNodeSine.logicInterface.addOutputProperty('Cosine', 'float');
LogicNodeSine.inportPhase = LogicNodeSine.logicInterface.addInputProperty('Phase', 'float', 0);

LogicNodesjs_registerType('LogicNodeSine', LogicNodeSine);

/**
 * Logic node that calculates sin & cos.
 * @private
 */
export { LogicNodeSine_LogicNodeSine as LogicNodeSine };