"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeInt = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeInt_outportInt;
var LogicNodeInt_ineventDecrease;
var LogicNodeInt_ineventIncrease;
var LogicNodeInt_ineventReset;
var LogicNodeInt_editorName;
var LogicNodeInt_logicInterface;
function LogicNodeInt() {
	_LogicNode.LogicNode.call(this);
	LogicNodeInt_logicInterface = LogicNodeInt_logicInterface;;
	this.type = 'LogicNodeInt';
	this.defValue = 0;
	this.value = 0;
}

LogicNodeInt.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeInt_editorName = "Int";;

LogicNodeInt.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.defValue = newConfig.value;
	}

	this.value = this.defValue;
};

LogicNodeInt.prototype.onConnected = function (instDesc) {
	_LogicLayer.LogicLayer.writeValue(instDesc, LogicNodeInt_outportInt, this.value);
};

LogicNodeInt.prototype.onEvent = function (instDesc, evt) {
	if (evt === LogicNodeInt_ineventIncrease) {
		this.value = this.value + 1;
	} else if (evt === LogicNodeInt_ineventDecrease) {
		this.value = this.value - 1;
	} else {
		this.value = this.defValue;
	}

	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeInt_outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStarted = function () {
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeInt_outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStopped = function () {};

_LogicNodes.LogicNodes.registerType('LogicNodeInt', LogicNodeInt);

LogicNodeInt_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeInt_ineventReset = LogicNodeInt_logicInterface.addInputEvent("reset");;
LogicNodeInt_ineventIncrease = LogicNodeInt_logicInterface.addInputEvent("increase");;
LogicNodeInt_ineventDecrease = LogicNodeInt_logicInterface.addInputEvent("decrease");;
LogicNodeInt_outportInt = LogicNodeInt_logicInterface.addOutputProperty("value", "int");;
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
exports.LogicNodeInt = exported_LogicNodeInt;
