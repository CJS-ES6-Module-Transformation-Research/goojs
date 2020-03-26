import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeSub() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeSub.logicInterface;
	this.type = 'LogicNodeSub';
}

LogicNodeSub.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeSub.editorName = 'Sub';

LogicNodeSub.prototype.onInputChanged = function (instDesc /*, portID, value */ ) {
	var out = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeSub.inportX) -
		LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeSub.inportY);

	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeSub.outportSum, out);
};

LogicNodeSub.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeSub.outportSum = LogicNodeSub.logicInterface.addOutputProperty('sum', 'float');
LogicNodeSub.inportX = LogicNodeSub.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeSub.inportY = LogicNodeSub.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes_LogicNodesjs.registerType('LogicNodeSub', LogicNodeSub);

var exported_LogicNodeSub = LogicNodeSub;

/**
 * Logic node that subtracts inputs.
 * @private
 */
export { exported_LogicNodeSub as LogicNodeSub };