"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeMax = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeMax_LogicNodeMax = LogicNodeMax;

function LogicNodeMax() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeMax.logicInterface;
	this.type = 'LogicNodeMax';
}

LogicNodeMax.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeMax.editorName = 'Max';

LogicNodeMax.prototype.onInputChanged = function (instDesc) {
	var val1 = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeMax.inportX);
	var val2 = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeMax.inportY);
	var out = Math.max(val1, val2);

	_LogicLayer.LogicLayer.writeValue(instDesc, LogicNodeMax.outportSum, out);
};

LogicNodeMax.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeMax.outportSum = LogicNodeMax.logicInterface.addOutputProperty('max', 'float');
LogicNodeMax.inportX = LogicNodeMax.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMax.inportY = LogicNodeMax.logicInterface.addInputProperty('y', 'float', 0);

_LogicNodes.LogicNodes.registerType('LogicNodeMax', LogicNodeMax);

/**
 * Logic node that computes the max of two inputs.
 * @private
 */
exports.LogicNodeMax = LogicNodeMax_LogicNodeMax;