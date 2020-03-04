import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeEntityProxy_editorName;
var LogicNodeEntityProxy_logicInterface;
function LogicNodeEntityProxy() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeEntityProxy_logicInterface = LogicNodeEntityProxy_logicInterface;;
	this.type = 'LogicNodeEntityProxy';
}

LogicNodeEntityProxy.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeEntityProxy_editorName = "EntityProxy";;

LogicNodeEntityProxy.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Empty.
LogicNodeEntityProxy_logicInterface = new LogicInterface_LogicInterfacejs('Component Proxy');
LogicNodeEntityProxy.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

LogicNodesjs_registerType('LogicNodeEntityProxy', LogicNodeEntityProxy);

var exported_LogicNodeEntityProxy = LogicNodeEntityProxy;

/**
 * Logic node that lets you access the logic layer of a different entity.
 * @private
 */
export { exported_LogicNodeEntityProxy as LogicNodeEntityProxy };