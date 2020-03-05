"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicComponentHandler = undefined;

var _ComponentHandler = require("../loaders/handlers/ComponentHandler");

var _LogicComponent = require("./LogicComponent");

var _PromiseUtils = require("../util/PromiseUtils");

require("./logic/LogicNodeEntityProxy");

require("./logic/LogicNodeTransformComponent");

require("./logic/LogicNodeMeshRendererComponent");

require("./logic/LogicNodeLightComponent");

require("./logic/LogicNodeDebug");

require("./logic/LogicNodeRandom");

require("./logic/LogicNodeTime");

require("./logic/LogicNodeSine");

require("./logic/LogicNodeVec3");

require("./logic/LogicNodeMultiply");

require("./logic/LogicNodeWASD");

require("./logic/LogicNodeWASD2");

require("./logic/LogicNodeMouse");

require("./logic/LogicNodeAdd");

require("./logic/LogicNodeSub");

require("./logic/LogicNodeFloat");

require("./logic/LogicNodeApplyMatrix");

require("./logic/LogicNodeConstVec3");

require("./logic/LogicNodeVec3Add");

require("./logic/LogicNodeRotationMatrix");

require("./logic/LogicNodeMultiplyFloat");

require("./logic/LogicNodeMax");

require("./logic/LogicNodeInt");

require("./logic/LogicNodeInput");

require("./logic/LogicNodeOutput");

function LogicComponentHandler() {
	_ComponentHandler.ComponentHandler.apply(this, arguments);
}

LogicComponentHandler.prototype = Object.create(_ComponentHandler.ComponentHandler.prototype);
LogicComponentHandler.prototype.constructor = LogicComponentHandler;
_ComponentHandler.ComponentHandler._registerClass('logic', LogicComponentHandler);

LogicComponentHandler.prototype._create = function (entity, config) {
	var c = new _LogicComponent.LogicComponent(entity);
	c.configure(config);
	entity.setComponent(c);
	return c;
};

LogicComponentHandler.prototype.update = function (entity, config) {
	var component = _ComponentHandler.ComponentHandler.prototype.update.call(this, entity, config);
	component.configure(config);
	return _PromiseUtils.PromiseUtils.resolve(component);
};

var exported_LogicComponentHandler = LogicComponentHandler;

/**
* 	* @private
*/
exports.LogicComponentHandler = exported_LogicComponentHandler;
