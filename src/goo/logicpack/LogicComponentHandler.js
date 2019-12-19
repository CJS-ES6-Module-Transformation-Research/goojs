import { ComponentHandler } from "../loaders/handlers/ComponentHandler";
import { LogicComponent } from "./LogicComponent";
import * as PromiseUtils from "../util/PromiseUtils";
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
	ComponentHandler.apply(this, arguments);
}

LogicComponentHandler.prototype = Object.create(ComponentHandler.prototype);
LogicComponentHandler.prototype.constructor = LogicComponentHandler;
ComponentHandler._registerClass('logic', LogicComponentHandler);

LogicComponentHandler.prototype._create = function (entity, config) {
	var c = new LogicComponent(entity);
	c.configure(config);
	entity.setComponent(c);
	return c;
};

LogicComponentHandler.prototype.update = function (entity, config) {
	var component = ComponentHandler.prototype.update.call(this, entity, config);
	component.configure(config);
	return PromiseUtils.resolve(component);
};

var exported_LogicComponentHandler = LogicComponentHandler;

/**
* 	* @private
*/
export { exported_LogicComponentHandler as LogicComponentHandler };
