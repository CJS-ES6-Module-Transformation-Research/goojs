Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeInt;

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
 * Logic node that provides an integer.
 * @private
 */
function LogicNodeInt() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeInt.logicInterface;
	this.type = 'LogicNodeInt';
	this.defValue = 0;
	this.value = 0;
}

LogicNodeInt.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeInt.editorName = 'Int';

LogicNodeInt.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.defValue = newConfig.value;
	}

	this.value = this.defValue;
};

LogicNodeInt.prototype.onConnected = function (instDesc) {
	_LogicLayer2.default.writeValue(instDesc, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onEvent = function (instDesc, evt) {
	if (evt === LogicNodeInt.ineventIncrease) {
		this.value = this.value + 1;
	} else if (evt === LogicNodeInt.ineventDecrease) {
		this.value = this.value - 1;
	} else {
		this.value = this.defValue;
	}

	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStarted = function () {
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeInt.outportInt, this.value);
};

LogicNodeInt.prototype.onSystemStopped = function () {};

_LogicNodes2.default.registerType('LogicNodeInt', LogicNodeInt);

LogicNodeInt.logicInterface = new _LogicInterface2.default();
LogicNodeInt.ineventReset = LogicNodeInt.logicInterface.addInputEvent('reset');
LogicNodeInt.ineventIncrease = LogicNodeInt.logicInterface.addInputEvent('increase');
LogicNodeInt.ineventDecrease = LogicNodeInt.logicInterface.addInputEvent('decrease');
LogicNodeInt.outportInt = LogicNodeInt.logicInterface.addOutputProperty('value', 'int');
LogicNodeInt.logicInterface.addConfigEntry({
	name: 'value',
	type: 'int',
	label: 'Value'
});
module.exports = exports.default;
