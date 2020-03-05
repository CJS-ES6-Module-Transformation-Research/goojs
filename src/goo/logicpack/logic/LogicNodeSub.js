"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeSub = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeSub_inportY;
var LogicNodeSub_inportX;
var LogicNodeSub_outportSum;
var LogicNodeSub_editorName;
var LogicNodeSub_logicInterface;
function LogicNodeSub() {
	_LogicNode.LogicNode.call(this);
	LogicNodeSub_logicInterface = LogicNodeSub_logicInterface;;
	this.type = 'LogicNodeSub';
}

LogicNodeSub.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeSub_editorName = "Sub";;

LogicNodeSub.prototype.onInputChanged = function (instDesc /*, portID, value */) {
	var out = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeSub_inportX) - _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeSub_inportY);

	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeSub_outportSum, out);
};

LogicNodeSub_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeSub_outportSum = LogicNodeSub_logicInterface.addOutputProperty("sum", "float");;
LogicNodeSub_inportX = LogicNodeSub_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeSub_inportY = LogicNodeSub_logicInterface.addInputProperty("y", "float", 0);;

_LogicNodes.LogicNodes.registerType('LogicNodeSub', LogicNodeSub);

var exported_LogicNodeSub = LogicNodeSub;

/**
 * Logic node that subtracts inputs.
 * @private
 */
exports.LogicNodeSub = exported_LogicNodeSub;
