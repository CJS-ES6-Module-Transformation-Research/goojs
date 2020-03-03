Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeFloat = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeFloat_outportFloat;
var LogicNodeFloat_editorName;
var LogicNodeFloat_logicInterface;
function LogicNodeFloat() {
	_LogicNode.LogicNode.call(this);
	LogicNodeFloat_logicInterface = LogicNodeFloat_logicInterface;;
	this.type = 'LogicNodeFloat';
}

LogicNodeFloat.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeFloat_editorName = "Float";;

LogicNodeFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeFloat_outportFloat, this.value);
	}
};

LogicNodeFloat.prototype.onSystemStarted = function () {
	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeFloat_outportFloat, this.value);
};

(0, _LogicNodes.registerType)('LogicNodeFloat', LogicNodeFloat);

LogicNodeFloat_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeFloat_outportFloat = LogicNodeFloat_logicInterface.addOutputProperty("value", "float");;
LogicNodeFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

var exported_LogicNodeFloat = LogicNodeFloat;

/**
 * Logic node that provides a float value.
 * @private
 */
exports.LogicNodeFloat = exported_LogicNodeFloat;
