var mod_LogicNodeSub = LogicNodeSub;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that subtracts inputs.
 * @private
 */
function LogicNodeSub() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeSub.logicInterface;
	this.type = 'LogicNodeSub';
}

LogicNodeSub.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeSub.editorName = 'Sub';

LogicNodeSub.prototype.onInputChanged = function (instDesc /*, portID, value */ ) {
	var out = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeSub.inportX) -
		LogicLayer_LogicLayer.readPort(instDesc, LogicNodeSub.inportY);

	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeSub.outportSum, out);
};

LogicNodeSub.logicInterface = new LogicInterface_LogicInterface();
LogicNodeSub.outportSum = LogicNodeSub.logicInterface.addOutputProperty('sum', 'float');
LogicNodeSub.inportX = LogicNodeSub.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeSub.inportY = LogicNodeSub.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes_LogicNodes.registerType('LogicNodeSub', LogicNodeSub);

/**
 * Logic node that subtracts inputs.
 * @private
 */
export { mod_LogicNodeSub as LogicNodeSub };