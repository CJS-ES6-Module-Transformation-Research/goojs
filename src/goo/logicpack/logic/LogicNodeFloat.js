"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeFloat = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var mod_LogicNodeFloat = LogicNodeFloat;

/**
 * Logic node that provides a float value.
 * @private
 */
function LogicNodeFloat() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeFloat.logicInterface;
	this.type = 'LogicNodeFloat';
}

LogicNodeFloat.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeFloat.editorName = 'Float';

LogicNodeFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeFloat.outportFloat, this.value);
	}
};

LogicNodeFloat.prototype.onSystemStarted = function () {
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeFloat.outportFloat, this.value);
};

_LogicNodes.LogicNodes.registerType('LogicNodeFloat', LogicNodeFloat);

LogicNodeFloat.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeFloat.outportFloat = LogicNodeFloat.logicInterface.addOutputProperty('value', 'float');
LogicNodeFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

/**
 * Logic node that provides a float value.
 * @private
 */
exports.LogicNodeFloat = mod_LogicNodeFloat;