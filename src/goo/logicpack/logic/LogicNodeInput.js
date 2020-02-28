Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeInput = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeInput_outportInput;
var LogicNodeInput_editorName;
var LogicNodeInput_logicInterface;
function LogicNodeInput() {
	_LogicNode.LogicNode.call(this);
	LogicNodeInput_logicInterface = LogicNodeInput_logicInterface;;
	this.type = 'LogicNodeInput';
	this.dummyInport = null;
}

LogicNodeInput.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeInput_editorName = "Input";;

// Configure new input.
LogicNodeInput.prototype.onConfigure = function (newConfig) {
	this.dummyInport = (0, _LogicInterface.createDynamicInput)(newConfig.Name);
};

LogicNodeInput.prototype.onInputChanged = function (instDesc, portID, value) {
	// this will be the dummy inport getting values written.
	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeInput_outportInput, value);
};

(0, _LogicNodes.registerType)('LogicNodeInput', LogicNodeInput);

LogicNodeInput_logicInterface = new _LogicInterface.LogicInterface();

// TODO: This should be a both, not property/event.
LogicNodeInput_outportInput = LogicNodeInput_logicInterface.addOutputProperty("Input", "any");;

LogicNodeInput.logicInterface.addConfigEntry({
	name: 'Name',
	type: 'string',
	label: 'Name'
});

var exported_LogicNodeInput = LogicNodeInput;

/**
 * Logic node to be used as Layer input.
 * @private
 */
exports.LogicNodeInput = exported_LogicNodeInput;
