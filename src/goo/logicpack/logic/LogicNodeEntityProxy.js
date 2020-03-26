"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeEntityProxy = undefined;

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

function LogicNodeEntityProxy() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeEntityProxy.logicInterface;
	this.type = 'LogicNodeEntityProxy';
}

LogicNodeEntityProxy.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeEntityProxy.editorName = 'EntityProxy';

LogicNodeEntityProxy.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Empty.
LogicNodeEntityProxy.logicInterface = new _LogicInterface.LogicInterface('Component Proxy');
LogicNodeEntityProxy.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

_LogicNodes.LogicNodes.registerType('LogicNodeEntityProxy', LogicNodeEntityProxy);

var exported_LogicNodeEntityProxy = LogicNodeEntityProxy;

/**
 * Logic node that lets you access the logic layer of a different entity.
 * @private
 */
exports.LogicNodeEntityProxy = exported_LogicNodeEntityProxy;
