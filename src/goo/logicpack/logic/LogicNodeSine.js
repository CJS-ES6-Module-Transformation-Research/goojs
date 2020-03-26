import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
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
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeSine.outportSin, Math.sin(value));
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeSine.outportCos, Math.cos(value));
};

LogicNodeSine.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeSine.outportSin = LogicNodeSine.logicInterface.addOutputProperty('Sine', 'float');
LogicNodeSine.outportCos = LogicNodeSine.logicInterface.addOutputProperty('Cosine', 'float');
LogicNodeSine.inportPhase = LogicNodeSine.logicInterface.addInputProperty('Phase', 'float', 0);

LogicNodes_LogicNodesjs.registerType('LogicNodeSine', LogicNodeSine);

var exported_LogicNodeSine = LogicNodeSine;

/**
 * Logic node that calculates sin & cos.
 * @private
 */
export { exported_LogicNodeSine as LogicNodeSine };