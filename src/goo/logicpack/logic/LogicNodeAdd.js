Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeAdd;

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
 * Logic node to add values.
 * @private
 */
function LogicNodeAdd() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeAdd.logicInterface;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeAdd.editorName = 'Add';

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = _LogicLayer2.default.readPort(instDesc, LogicNodeAdd.inportX) + _LogicLayer2.default.readPort(instDesc, LogicNodeAdd.inportY);

	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeAdd.outportSum, out);
};

LogicNodeAdd.logicInterface = new _LogicInterface2.default();
LogicNodeAdd.outportSum = LogicNodeAdd.logicInterface.addOutputProperty('sum', 'float');
LogicNodeAdd.inportX = LogicNodeAdd.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeAdd.inportY = LogicNodeAdd.logicInterface.addInputProperty('y', 'float', 0);

_LogicNodes2.default.registerType('LogicNodeAdd', LogicNodeAdd);
module.exports = exports.default;
