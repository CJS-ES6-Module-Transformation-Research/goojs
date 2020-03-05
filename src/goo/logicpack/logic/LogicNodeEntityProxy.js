import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeEntityProxy_editorName;
var LogicNodeEntityProxy_logicInterface;
function LogicNodeEntityProxy() {
	LogicNodejs.call(this);
	LogicNodeEntityProxy_logicInterface = LogicNodeEntityProxy_logicInterface;;
	this.type = 'LogicNodeEntityProxy';
}

LogicNodeEntityProxy.prototype = Object.create(LogicNodejs.prototype);
LogicNodeEntityProxy_editorName = "EntityProxy";;

LogicNodeEntityProxy.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Empty.
LogicNodeEntityProxy_logicInterface = new LogicInterfacejs('Component Proxy');
LogicNodeEntityProxy.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

LogicNodesjs.registerType('LogicNodeEntityProxy', LogicNodeEntityProxy);

var exported_LogicNodeEntityProxy = LogicNodeEntityProxy;

/**
 * Logic node that lets you access the logic layer of a different entity.
 * @private
 */
export { exported_LogicNodeEntityProxy as LogicNodeEntityProxy };