import { LogicNode } from "./LogicNode";
import * as LogicNodes from "./LogicNodes";
import { LogicInterface } from "./LogicInterface";
var exported_LogicNodeEntityProxy = LogicNodeEntityProxy;
function LogicNodeEntityProxy() {
	LogicNode.call(this);
	this.logicInterface = LogicNodeEntityProxy.logicInterface;
	this.type = 'LogicNodeEntityProxy';
}

LogicNodeEntityProxy.prototype = Object.create(LogicNode.prototype);
LogicNodeEntityProxy.editorName = 'EntityProxy';

LogicNodeEntityProxy.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Empty.
LogicNodeEntityProxy.logicInterface = new LogicInterface('Component Proxy');
LogicNodeEntityProxy.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

LogicNodes.registerType('LogicNodeEntityProxy', LogicNodeEntityProxy);

/**
 * Logic node that lets you access the logic layer of a different entity.
 * @private
 */
export { exported_LogicNodeEntityProxy as LogicNodeEntityProxy };