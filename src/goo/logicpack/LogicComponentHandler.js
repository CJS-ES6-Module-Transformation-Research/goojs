var LogicComponentHandler_LogicComponentHandler = LogicComponentHandler;
import { ComponentHandler as loadershandlersComponentHandler_ComponentHandlerjs } from "../loaders/handlers/ComponentHandler";
import { LogicComponent as LogicComponent_LogicComponentjs } from "./LogicComponent";
import { PromiseUtils as utilPromiseUtils_PromiseUtilsjs } from "../util/PromiseUtils";
import "./logic/LogicNodeEntityProxy";
import "./logic/LogicNodeTransformComponent";
import "./logic/LogicNodeMeshRendererComponent";
import "./logic/LogicNodeLightComponent";
import "./logic/LogicNodeDebug";
import "./logic/LogicNodeRandom";
import "./logic/LogicNodeTime";
import "./logic/LogicNodeSine";
import "./logic/LogicNodeVec3";
import "./logic/LogicNodeMultiply";
import "./logic/LogicNodeWASD";
import "./logic/LogicNodeWASD2";
import "./logic/LogicNodeMouse";
import "./logic/LogicNodeAdd";
import "./logic/LogicNodeSub";
import "./logic/LogicNodeFloat";
import "./logic/LogicNodeApplyMatrix";
import "./logic/LogicNodeConstVec3";
import "./logic/LogicNodeVec3Add";
import "./logic/LogicNodeRotationMatrix";
import "./logic/LogicNodeMultiplyFloat";
import "./logic/LogicNodeMax";
import "./logic/LogicNodeInt";
import "./logic/LogicNodeInput";
import "./logic/LogicNodeOutput";
function LogicComponentHandler() {
	loadershandlersComponentHandler_ComponentHandlerjs.apply(this, arguments);
}

LogicComponentHandler.prototype = Object.create(loadershandlersComponentHandler_ComponentHandlerjs.prototype);
LogicComponentHandler.prototype.constructor = LogicComponentHandler;
loadershandlersComponentHandler_ComponentHandlerjs._registerClass('logic', LogicComponentHandler);

LogicComponentHandler.prototype._create = function (entity, config) {
	var c = new LogicComponent_LogicComponentjs(entity);
	c.configure(config);
	entity.setComponent(c);
	return c;
};

LogicComponentHandler.prototype.update = function (entity, config) {
	var component = loadershandlersComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config);
	component.configure(config);
	return utilPromiseUtils_PromiseUtilsjs.resolve(component);
};

/**
* 	* @private
*/
export { LogicComponentHandler_LogicComponentHandler as LogicComponentHandler };
