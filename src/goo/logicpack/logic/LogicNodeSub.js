Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeSub;

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
 * Logic node that subtracts inputs.
 * @private
 */
function LogicNodeSub() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeSub.logicInterface;
	this.type = 'LogicNodeSub';
}

LogicNodeSub.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeSub.editorName = 'Sub';

LogicNodeSub.prototype.onInputChanged = function (instDesc /*, portID, value */) {
	var out = _LogicLayer2.default.readPort(instDesc, LogicNodeSub.inportX) - _LogicLayer2.default.readPort(instDesc, LogicNodeSub.inportY);

	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeSub.outportSum, out);
};

LogicNodeSub.logicInterface = new _LogicInterface2.default();
LogicNodeSub.outportSum = LogicNodeSub.logicInterface.addOutputProperty('sum', 'float');
LogicNodeSub.inportX = LogicNodeSub.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeSub.inportY = LogicNodeSub.logicInterface.addInputProperty('y', 'float', 0);

_LogicNodes2.default.registerType('LogicNodeSub', LogicNodeSub);
module.exports = exports.default;
