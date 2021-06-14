"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicComponent = undefined;

var _LogicLayer = require("./logic/LogicLayer");

var _LogicNodes = require("./logic/LogicNodes");

var _Component = require("../entities/components/Component");

var mod_LogicComponent = LogicComponent;


/**
 * A component that embeds a LogicLayer and processes it every frame.
 * @private
 */
function LogicComponent(entity) {
	_Component.Component.call(this);

	this.type = 'LogicComponent';
	this.parent = null;
	this.logicInstance = null;

	// these used to be global but aren't any longer.
	this.logicLayer = null;
	this.nodes = {};

	this._entity = entity;
}

LogicComponent.prototype = Object.create(_Component.Component.prototype);

LogicComponent.prototype.configure = function (conf) {
	// cleanup.
	for (var x in this.nodes) {
		if (this.nodes[x].onSystemStopped !== undefined) {
			this.nodes[x].onSystemStopped(false);
		}
	}

	this.logicLayer = new _LogicLayer.LogicLayer(this._entity);

	this.nodes = {};

	for (var k in conf.logicNodes) {
		var ln = conf.logicNodes[k];
		var Fn = _LogicNodes.LogicNodes.getClass(ln.type);
		var obj = new Fn();

		obj.configure(ln);
		obj.addToLogicLayer(this.logicLayer, ln.id);

		this.nodes[k] = obj;
	}
};

LogicComponent.prototype.process = function (tpf) {
	if (this.logicLayer !== null) {
		this.logicLayer.process(tpf);
	}
};

/**
 * A component that embeds a LogicLayer and processes it every frame.
 * @private
 */
exports.LogicComponent = mod_LogicComponent;