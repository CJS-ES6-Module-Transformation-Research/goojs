var LogicNodeEntityProxy_LogicNodeEntityProxy = LogicNodeEntityProxy;
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeEntityProxy() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeEntityProxy.logicInterface;
	this.type = 'LogicNodeEntityProxy';
}

LogicNodeEntityProxy.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeEntityProxy.editorName = 'EntityProxy';

LogicNodeEntityProxy.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Empty.
LogicNodeEntityProxy.logicInterface = new LogicInterface_LogicInterfacejs('Component Proxy');
LogicNodeEntityProxy.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

LogicNodes_LogicNodesjs.registerType('LogicNodeEntityProxy', LogicNodeEntityProxy);

/**
 * Logic node that lets you access the logic layer of a different entity.
 * @private
 */
export { LogicNodeEntityProxy_LogicNodeEntityProxy as LogicNodeEntityProxy };