import { ComponentHandler as ComponentHandler_ComponentHandlerjs } from "../loaders/handlers/ComponentHandler";
import { LogicComponent as LogicComponent_LogicComponentjs } from "./LogicComponent";
import { PromiseUtils as PromiseUtils_PromiseUtilsjs } from "../util/PromiseUtils";
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
	ComponentHandler_ComponentHandlerjs.apply(this, arguments);
}

LogicComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandlerjs.prototype);
LogicComponentHandler.prototype.constructor = LogicComponentHandler;
ComponentHandler_ComponentHandlerjs._registerClass('logic', LogicComponentHandler);

LogicComponentHandler.prototype._create = function (entity, config) {
	var c = new LogicComponent_LogicComponentjs(entity);
	c.configure(config);
	entity.setComponent(c);
	return c;
};

LogicComponentHandler.prototype.update = function (entity, config) {
	var component = ComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config);
	component.configure(config);
	return PromiseUtils_PromiseUtilsjs.resolve(component);
};

var exported_LogicComponentHandler = LogicComponentHandler;

/**
* 	* @private
*/
export { exported_LogicComponentHandler as LogicComponentHandler };
