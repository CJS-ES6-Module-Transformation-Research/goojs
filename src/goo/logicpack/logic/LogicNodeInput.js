Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeInput = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var LogicNodes = _interopRequireWildcard(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function LogicNodeInput() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeInput.logicInterface;
	this.type = 'LogicNodeInput';
	this.dummyInport = null;
}

LogicNodeInput.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeInput.editorName = 'Input';

// Configure new input.
LogicNodeInput.prototype.onConfigure = function (newConfig) {
	this.dummyInport = _LogicInterface.LogicInterface.createDynamicInput(newConfig.Name);
};

LogicNodeInput.prototype.onInputChanged = function (instDesc, portID, value) {
	// this will be the dummy inport getting values written.
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeInput.outportInput, value);
};

LogicNodes.registerType('LogicNodeInput', LogicNodeInput);

LogicNodeInput.logicInterface = new _LogicInterface.LogicInterface();

// TODO: This should be a both, not property/event.
LogicNodeInput.outportInput = LogicNodeInput.logicInterface.addOutputProperty('Input', 'any');

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
