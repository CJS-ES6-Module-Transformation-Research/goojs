Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeOutput;

var _LogicLayer = require("./LogicLayer");

var _LogicLayer2 = _interopRequireDefault(_LogicLayer);

var _LogicNode = require("./LogicNode");

var _LogicNode2 = _interopRequireDefault(_LogicNode);

var _LogicNodes = require("./LogicNodes");

var _LogicNodes2 = _interopRequireDefault(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

var _LogicInterface2 = _interopRequireDefault(_LogicInterface);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Logic node to be used as layer output.
 * @private
 */
function LogicNodeOutput() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeOutput.logicInterface;
	this.type = 'LogicNodeOutput';
	this.realOutport = null;
}

LogicNodeOutput.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeOutput.editorName = 'Output';

LogicNodeOutput.prototype.onInputChanged = function (instDesc, portID, value) {
	_LogicLayer2.default.writeValueToLayerOutput(instDesc, this.realOutport, value);
};

LogicNodeOutput.prototype.onEvent = function () {};

// Configure new output.
_LogicNode2.default.prototype.onConfigure = function (newConfig) {
	this.realOutport = _LogicInterface2.default.createDynamicOutput(newConfig.Name);
};

_LogicNodes2.default.registerType('LogicNodeOutput', LogicNodeOutput);

LogicNodeOutput.logicInterface = new _LogicInterface2.default();
LogicNodeOutput.inportOutput = LogicNodeOutput.logicInterface.addInputProperty('Output', 'any');
LogicNodeOutput.logicInterface.addConfigEntry({ name: 'Name', type: 'string', label: 'Name' });
module.exports = exports.default;
