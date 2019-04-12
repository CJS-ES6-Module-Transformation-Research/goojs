Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeMultiplyFloat;

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
 * Logic node that multiplies two floats.
 * @private
 */
function LogicNodeMultiplyFloat() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeMultiplyFloat.logicInterface;
	this.type = 'LogicNodeMultiplyFloat';
	this._x = this._y = 0; // REVIEW: unused?
}

LogicNodeMultiplyFloat.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeMultiplyFloat.editorName = 'MultiplyFloat';

LogicNodeMultiplyFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
	}
};

LogicNodeMultiplyFloat.prototype.onInputChanged = function (instDesc) {
	var x = _LogicLayer2.default.readPort(instDesc, LogicNodeMultiplyFloat.inportX);
	var y = this.value;
	_LogicLayer2.default.writeValue(instDesc, LogicNodeMultiplyFloat.outportProduct, x * y);
};

LogicNodeMultiplyFloat.logicInterface = new _LogicInterface2.default();
LogicNodeMultiplyFloat.outportProduct = LogicNodeMultiplyFloat.logicInterface.addOutputProperty('product', 'float');
LogicNodeMultiplyFloat.inportX = LogicNodeMultiplyFloat.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMultiplyFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

_LogicNodes2.default.registerType('LogicNodeMultiplyFloat', LogicNodeMultiplyFloat);
module.exports = exports.default;
