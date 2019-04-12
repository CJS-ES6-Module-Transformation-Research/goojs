Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeInput;

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
 * Logic node to be used as Layer input.
 * @private
 */
function LogicNodeInput() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeInput.logicInterface;
	this.type = 'LogicNodeInput';
	this.dummyInport = null;
}

LogicNodeInput.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeInput.editorName = 'Input';

// Configure new input.
LogicNodeInput.prototype.onConfigure = function (newConfig) {
	this.dummyInport = _LogicInterface2.default.createDynamicInput(newConfig.Name);
};

LogicNodeInput.prototype.onInputChanged = function (instDesc, portID, value) {
	// this will be the dummy inport getting values written.
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeInput.outportInput, value);
};

_LogicNodes2.default.registerType('LogicNodeInput', LogicNodeInput);

LogicNodeInput.logicInterface = new _LogicInterface2.default();

// TODO: This should be a both, not property/event.
LogicNodeInput.outportInput = LogicNodeInput.logicInterface.addOutputProperty('Input', 'any');

LogicNodeInput.logicInterface.addConfigEntry({
	name: 'Name',
	type: 'string',
	label: 'Name'
});
module.exports = exports.default;
