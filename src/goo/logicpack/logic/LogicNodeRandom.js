"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeRandom = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicInterface = require("./LogicInterface");

var _LogicNodes = require("./LogicNodes");

var LogicNodeRandom_outPropRandom;
var LogicNodeRandom_editorName;
var LogicNodeRandom_logicInterface;
function LogicNodeRandom() {
	_LogicNode.LogicNode.call(this);
	this.wantsProcessCall = true;
	LogicNodeRandom_logicInterface = LogicNodeRandom_logicInterface;;
	this.type = 'LogicNodeRandom';
}

// Logic interface set-up
LogicNodeRandom.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeRandom_editorName = "Random";;
LogicNodeRandom_logicInterface = new _LogicInterface.LogicInterface();

// ports
LogicNodeRandom_outPropRandom = LogicNodeRandom_logicInterface.addOutputProperty("Random0_1", "float");;

// Process
LogicNodeRandom.prototype.processLogic = function () {
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeRandom_outPropRandom, Math.random());
};

_LogicNodes.LogicNodes.registerType('LogicNodeRandom', LogicNodeRandom);

var exported_LogicNodeRandom = LogicNodeRandom;

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
exports.LogicNodeRandom = exported_LogicNodeRandom;
