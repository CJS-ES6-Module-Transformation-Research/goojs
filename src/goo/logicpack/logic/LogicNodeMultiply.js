Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeMultiply;

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
 * Logic node that multiplies two inputs.
 * @private
 */
function LogicNodeMultiply() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeMultiply.logicInterface;
	this.type = 'LogicNodeMultiply';
	this._x = this._y = 0; // REVIEW: unused ?
}

LogicNodeMultiply.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeMultiply.editorName = 'Multiply';

LogicNodeMultiply.prototype.onInputChanged = function (instDesc) {
	var x = _LogicLayer2.default.readPort(instDesc, LogicNodeMultiply.inportX);
	var y = _LogicLayer2.default.readPort(instDesc, LogicNodeMultiply.inportY);
	_LogicLayer2.default.writeValue(instDesc, LogicNodeMultiply.outportProduct, x * y);
};

LogicNodeMultiply.logicInterface = new _LogicInterface2.default();
LogicNodeMultiply.outportProduct = LogicNodeMultiply.logicInterface.addOutputProperty('product', 'float');
LogicNodeMultiply.inportX = LogicNodeMultiply.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMultiply.inportY = LogicNodeMultiply.logicInterface.addInputProperty('y', 'float', 0);

_LogicNodes2.default.registerType('LogicNodeMultiply', LogicNodeMultiply);
module.exports = exports.default;
