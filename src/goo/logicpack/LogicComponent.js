import { LogicLayer as LogicLayer_LogicLayerjs } from "./logic/LogicLayer";
import { getClass as LogicNodesjs_getClass } from "./logic/LogicNodes";
import { Component as Component_Componentjs } from "../entities/components/Component";
function LogicComponent(entity) {
	Component_Componentjs.call(this);

	this.type = 'LogicComponent';
	this.parent = null;
	this.logicInstance = null;

	// these used to be global but aren't any longer.
	this.logicLayer = null;
	this.nodes = {};

	this._entity = entity;
}

LogicComponent.prototype = Object.create(Component_Componentjs.prototype);

LogicComponent.prototype.configure = function (conf) {
	// cleanup.
	for (var x in this.nodes) {
		if (this.nodes[x].onSystemStopped !== undefined) {
			this.nodes[x].onSystemStopped(false);
		}
	}

	this.logicLayer = new LogicLayer_LogicLayerjs(this._entity);

	this.nodes = {};

	for (var k in conf.logicNodes) {
		var ln = conf.logicNodes[k];
		var Fn = LogicNodesjs_getClass(ln.type);
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

var exported_LogicComponent = LogicComponent;

/**
 * A component that embeds a LogicLayer and processes it every frame.
 * @private
 */
export { exported_LogicComponent as LogicComponent };