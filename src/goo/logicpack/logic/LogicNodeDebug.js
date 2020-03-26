"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeDebug = undefined;

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

function LogicNodeDebug() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeDebug.logicInterface;
	this.type = 'LogicNodeDebug';
	this._time = 0;
}

LogicNodeDebug.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeDebug.editorName = 'Debug';

LogicNodeDebug.prototype.onInputChanged = function (instDesc, portID, value) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') value port ' + portID + ' = [' + value + ']');
};

LogicNodeDebug.prototype.onEvent = function (instDesc, portID) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') event on port ' + portID);
};

LogicNodeDebug.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeDebug.inportEvent = LogicNodeDebug.logicInterface.addInputEvent('Event');
LogicNodeDebug.inportFloat = LogicNodeDebug.logicInterface.addInputProperty('FloatValue', 'float', 0);

_LogicNodes.LogicNodes.registerType('LogicNodeDebug', LogicNodeDebug);

var exported_LogicNodeDebug = LogicNodeDebug;

/**
 * Logic node that writes output to the console.
 * @private
 */
exports.LogicNodeDebug = exported_LogicNodeDebug;
