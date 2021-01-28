"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeInt = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var mod_LogicNodeInt = LogicNodeInt;

/**
 * Logic node that provides an integer.
 * @private
 */
function LogicNodeInt() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeInt.logicInterface;
	this.type = 'LogicNodeInt';
	this.defValue = 0;
	this.value = 0;
}

LogicNodeInt.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeInt.editorName = 'Int';

LogicNodeInt.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.defValue = newConfig.value;
	}

	this.value = this.defValue;
};

LogicNodeInt.prototype.onConnected = function (instDesc) {
	_LogicLayer.LogicLayer.writeValue(instDesc, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onEvent = function (instDesc, evt) {
	if (evt === LogicNodeInt.ineventIncrease) {
		this.value = this.value + 1;
	} else if (evt === LogicNodeInt.ineventDecrease) {
		this.value = this.value - 1;
	} else {
		this.value = this.defValue;
	}

	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStarted = function () {
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStopped = function () {};

_LogicNodes.LogicNodes.registerType('LogicNodeInt', LogicNodeInt);

LogicNodeInt.logicInterface = new _LogicInterface.LogicInterface();
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
exports.LogicNodeInt = mod_LogicNodeInt;