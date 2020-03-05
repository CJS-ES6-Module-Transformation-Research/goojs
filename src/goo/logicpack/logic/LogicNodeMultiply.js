"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeMultiply = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeMultiply_inportY;
var LogicNodeMultiply_inportX;
var LogicNodeMultiply_outportProduct;
var LogicNodeMultiply_editorName;
var LogicNodeMultiply_logicInterface;
function LogicNodeMultiply() {
	_LogicNode.LogicNode.call(this);
	LogicNodeMultiply_logicInterface = LogicNodeMultiply_logicInterface;;
	this.type = 'LogicNodeMultiply';
	this._x = this._y = 0; // REVIEW: unused ?
}

LogicNodeMultiply.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeMultiply_editorName = "Multiply";;

LogicNodeMultiply.prototype.onInputChanged = function (instDesc) {
	var x = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeMultiply_inportX);
	var y = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeMultiply_inportY);
	_LogicLayer.LogicLayer.writeValue(instDesc, LogicNodeMultiply_outportProduct, x * y);
};

LogicNodeMultiply_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeMultiply_outportProduct = LogicNodeMultiply_logicInterface.addOutputProperty("product", "float");;
LogicNodeMultiply_inportX = LogicNodeMultiply_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeMultiply_inportY = LogicNodeMultiply_logicInterface.addInputProperty("y", "float", 0);;

_LogicNodes.LogicNodes.registerType('LogicNodeMultiply', LogicNodeMultiply);

var exported_LogicNodeMultiply = LogicNodeMultiply;

/**
 * Logic node that multiplies two inputs.
 * @private
 */
exports.LogicNodeMultiply = exported_LogicNodeMultiply;
