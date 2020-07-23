"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeRandom = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicInterface = require("./LogicInterface");

var _LogicNodes = require("./LogicNodes");

var LogicNodeRandom_LogicNodeRandom = LogicNodeRandom;

function LogicNodeRandom() {
	_LogicNode.LogicNode.call(this);
	this.wantsProcessCall = true;
	this.logicInterface = LogicNodeRandom.logicInterface;
	this.type = 'LogicNodeRandom';
}

// Logic interface set-up
LogicNodeRandom.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeRandom.editorName = 'Random';
LogicNodeRandom.logicInterface = new _LogicInterface.LogicInterface();

// ports
LogicNodeRandom.outPropRandom = LogicNodeRandom.logicInterface.addOutputProperty('Random0_1', 'float');

// Process
LogicNodeRandom.prototype.processLogic = function () {
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeRandom.outPropRandom, Math.random());
};

_LogicNodes.LogicNodes.registerType('LogicNodeRandom', LogicNodeRandom);

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
exports.LogicNodeRandom = LogicNodeRandom_LogicNodeRandom;