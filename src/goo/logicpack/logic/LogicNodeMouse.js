"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeMouse = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeMouse_LogicNodeMouse = LogicNodeMouse;

function LogicNodeMouse() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeMouse.logicInterface;
	this.type = 'LogicNodeMouse';

	this.eventMouseMove = function (event) {
		var mx = event.clientX;
		var my = event.clientY;
		var dx = mx - this.x;
		var dy = my - this.y;
		_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeMouse.portX, mx);
		_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeMouse.portY, my);
		_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeMouse.portDX, dx);
		_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeMouse.portDY, dy);
	}.bind(this);

	this.eventMouseDown = function (event) {
		if (event.button === 0) {
			_LogicLayer.LogicLayer.fireEvent(this.logicInstance, LogicNodeMouse.outEventLmb);
		}
		if (event.button === 2) {
			_LogicLayer.LogicLayer.fireEvent(this.logicInstance, LogicNodeMouse.outEventRmb);
		}
	}.bind(this);
}

LogicNodeMouse.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeMouse.editorName = 'Mouse';

LogicNodeMouse.prototype.onSystemStarted = function () {
	this.x = 0;
	this.y = 0;
	document.addEventListener('mousemove', this.eventMouseMove, false);
	document.addEventListener('mousedown', this.eventMouseDown, false);
};

LogicNodeMouse.prototype.onSystemStopped = function () {
	document.removeEventListener('mousemove', this.eventMouseMove);
	document.removeEventListener('mousedown', this.eventMouseDown);
};

LogicNodeMouse.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeMouse.portX = LogicNodeMouse.logicInterface.addOutputProperty('x', 'float', 0);
LogicNodeMouse.portY = LogicNodeMouse.logicInterface.addOutputProperty('y', 'float', 0);
LogicNodeMouse.portDX = LogicNodeMouse.logicInterface.addOutputProperty('dx', 'float', 0);
LogicNodeMouse.portDY = LogicNodeMouse.logicInterface.addOutputProperty('dy', 'float', 0);
LogicNodeMouse.outEventLmb = LogicNodeMouse.logicInterface.addOutputEvent('lmb');
LogicNodeMouse.outEventRmb = LogicNodeMouse.logicInterface.addOutputEvent('rmb');

_LogicNodes.LogicNodes.registerType('LogicNodeMouse', LogicNodeMouse);

/**
 * Logic node that reads mouse input.
 * @private
 */
exports.LogicNodeMouse = LogicNodeMouse_LogicNodeMouse;