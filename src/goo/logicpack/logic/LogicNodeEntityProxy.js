Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeEntityProxy = undefined;

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeEntityProxy_editorName;
var LogicNodeEntityProxy_logicInterface;
function LogicNodeEntityProxy() {
	_LogicNode.LogicNode.call(this);
	LogicNodeEntityProxy_logicInterface = LogicNodeEntityProxy_logicInterface;;
	this.type = 'LogicNodeEntityProxy';
}

LogicNodeEntityProxy.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeEntityProxy_editorName = "EntityProxy";;

LogicNodeEntityProxy.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Empty.
LogicNodeEntityProxy_logicInterface = new _LogicInterface.LogicInterface('Component Proxy');
LogicNodeEntityProxy.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

(0, _LogicNodes.registerType)('LogicNodeEntityProxy', LogicNodeEntityProxy);

var exported_LogicNodeEntityProxy = LogicNodeEntityProxy;

/**
 * Logic node that lets you access the logic layer of a different entity.
 * @private
 */
exports.LogicNodeEntityProxy = exported_LogicNodeEntityProxy;
