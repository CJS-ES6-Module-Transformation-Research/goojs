import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeInt() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeInt.logicInterface;
	this.type = 'LogicNodeInt';
	this.defValue = 0;
	this.value = 0;
}

LogicNodeInt.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeInt.editorName = 'Int';

LogicNodeInt.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.defValue = newConfig.value;
	}

	this.value = this.defValue;
};

LogicNodeInt.prototype.onConnected = function (instDesc) {
	LogicLayer_LogicLayerjs.writeValue(instDesc, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onEvent = function (instDesc, evt) {
	if (evt === LogicNodeInt.ineventIncrease) {
		this.value = this.value + 1;
	} else if (evt === LogicNodeInt.ineventDecrease) {
		this.value = this.value - 1;
	} else {
		this.value = this.defValue;
	}

	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStarted = function () {
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStopped = function () {};

LogicNodes_LogicNodesjs.registerType('LogicNodeInt', LogicNodeInt);

LogicNodeInt.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeInt.ineventReset = LogicNodeInt.logicInterface.addInputEvent('reset');
LogicNodeInt.ineventIncrease = LogicNodeInt.logicInterface.addInputEvent('increase');
LogicNodeInt.ineventDecrease = LogicNodeInt.logicInterface.addInputEvent('decrease');
LogicNodeInt.outportInt = LogicNodeInt.logicInterface.addOutputProperty('value', 'int');
LogicNodeInt.logicInterface.addConfigEntry({
	name: 'value',
	type: 'int',
	label: 'Value'
});

var exported_LogicNodeInt = LogicNodeInt;

/**
 * Logic node that provides an integer.
 * @private
 */
export { exported_LogicNodeInt as LogicNodeInt };