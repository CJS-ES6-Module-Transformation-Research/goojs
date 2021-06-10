var mod_LogicNodeInt = LogicNodeInt;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that provides an integer.
 * @private
 */
function LogicNodeInt() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeInt.logicInterface;
	this.type = 'LogicNodeInt';
	this.defValue = 0;
	this.value = 0;
}

LogicNodeInt.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeInt.editorName = 'Int';

LogicNodeInt.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.defValue = newConfig.value;
	}

	this.value = this.defValue;
};

LogicNodeInt.prototype.onConnected = function (instDesc) {
	LogicLayer_LogicLayer.writeValue(instDesc, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onEvent = function (instDesc, evt) {
	if (evt === LogicNodeInt.ineventIncrease) {
		this.value = this.value + 1;
	} else if (evt === LogicNodeInt.ineventDecrease) {
		this.value = this.value - 1;
	} else {
		this.value = this.defValue;
	}

	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStarted = function () {
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStopped = function () {};

LogicNodes_LogicNodes.registerType('LogicNodeInt', LogicNodeInt);

LogicNodeInt.logicInterface = new LogicInterface_LogicInterface();
LogicNodeInt.ineventReset = LogicNodeInt.logicInterface.addInputEvent('reset');
LogicNodeInt.ineventIncrease = LogicNodeInt.logicInterface.addInputEvent('increase');
LogicNodeInt.ineventDecrease = LogicNodeInt.logicInterface.addInputEvent('decrease');
LogicNodeInt.outportInt = LogicNodeInt.logicInterface.addOutputProperty('value', 'int');
LogicNodeInt.logicInterface.addConfigEntry({
	name: 'value',
	type: 'int',
	label: 'Value'
});

/**
 * Logic node that provides an integer.
 * @private
 */
export { mod_LogicNodeInt as LogicNodeInt };