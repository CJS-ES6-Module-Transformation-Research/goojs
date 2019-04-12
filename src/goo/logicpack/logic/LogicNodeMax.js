Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeMax;

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
 * Logic node that computes the max of two inputs.
 * @private
 */
function LogicNodeMax() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeMax.logicInterface;
	this.type = 'LogicNodeMax';
}

LogicNodeMax.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeMax.editorName = 'Max';

LogicNodeMax.prototype.onInputChanged = function (instDesc) {
	var val1 = _LogicLayer2.default.readPort(instDesc, LogicNodeMax.inportX);
	var val2 = _LogicLayer2.default.readPort(instDesc, LogicNodeMax.inportY);
	var out = Math.max(val1, val2);

	_LogicLayer2.default.writeValue(instDesc, LogicNodeMax.outportSum, out);
};

LogicNodeMax.logicInterface = new _LogicInterface2.default();
LogicNodeMax.outportSum = LogicNodeMax.logicInterface.addOutputProperty('max', 'float');
LogicNodeMax.inportX = LogicNodeMax.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMax.inportY = LogicNodeMax.logicInterface.addInputProperty('y', 'float', 0);

_LogicNodes2.default.registerType('LogicNodeMax', LogicNodeMax);
module.exports = exports.default;
