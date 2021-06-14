var mod_LogicNodeEntityProxy = LogicNodeEntityProxy;
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that lets you access the logic layer of a different entity.
 * @private
 */
function LogicNodeEntityProxy() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeEntityProxy.logicInterface;
	this.type = 'LogicNodeEntityProxy';
}

LogicNodeEntityProxy.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeEntityProxy.editorName = 'EntityProxy';

LogicNodeEntityProxy.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Empty.
LogicNodeEntityProxy.logicInterface = new LogicInterface_LogicInterface('Component Proxy');
LogicNodeEntityProxy.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

LogicNodes_LogicNodes.registerType('LogicNodeEntityProxy', LogicNodeEntityProxy);

/**
 * Logic node that lets you access the logic layer of a different entity.
 * @private
 */
export { mod_LogicNodeEntityProxy as LogicNodeEntityProxy };