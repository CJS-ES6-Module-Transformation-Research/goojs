var LogicNodeSub_LogicNodeSub = LogicNodeSub;
import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeSub() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeSub.logicInterface;
	this.type = 'LogicNodeSub';
}

LogicNodeSub.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeSub.editorName = 'Sub';

LogicNodeSub.prototype.onInputChanged = function (instDesc /*, portID, value */ ) {
	var out = LogicLayerjs_readPort(instDesc, LogicNodeSub.inportX) -
		LogicLayerjs_readPort(instDesc, LogicNodeSub.inportY);

	LogicLayerjs_writeValue(this.logicInstance, LogicNodeSub.outportSum, out);
};

LogicNodeSub.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeSub.outportSum = LogicNodeSub.logicInterface.addOutputProperty('sum', 'float');
LogicNodeSub.inportX = LogicNodeSub.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeSub.inportY = LogicNodeSub.logicInterface.addInputProperty('y', 'float', 0);

LogicNodesjs_registerType('LogicNodeSub', LogicNodeSub);

/**
 * Logic node that subtracts inputs.
 * @private
 */
export { LogicNodeSub_LogicNodeSub as LogicNodeSub };