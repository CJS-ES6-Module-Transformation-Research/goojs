"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeMultiply = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

function LogicNodeMultiply() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeMultiply.logicInterface;
	this.type = 'LogicNodeMultiply';
	this._x = this._y = 0; // REVIEW: unused ?
}

LogicNodeMultiply.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeMultiply.editorName = 'Multiply';

LogicNodeMultiply.prototype.onInputChanged = function (instDesc) {
	var x = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeMultiply.inportX);
	var y = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeMultiply.inportY);
	_LogicLayer.LogicLayer.writeValue(instDesc, LogicNodeMultiply.outportProduct, x * y);
};

LogicNodeMultiply.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeMultiply.outportProduct = LogicNodeMultiply.logicInterface.addOutputProperty('product', 'float');
LogicNodeMultiply.inportX = LogicNodeMultiply.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMultiply.inportY = LogicNodeMultiply.logicInterface.addInputProperty('y', 'float', 0);

_LogicNodes.LogicNodes.registerType('LogicNodeMultiply', LogicNodeMultiply);

var exported_LogicNodeMultiply = LogicNodeMultiply;

/**
 * Logic node that multiplies two inputs.
 * @private
 */
exports.LogicNodeMultiply = exported_LogicNodeMultiply;
