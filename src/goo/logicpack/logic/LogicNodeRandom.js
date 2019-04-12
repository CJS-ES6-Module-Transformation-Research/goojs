Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeRandom;

var _LogicLayer = require("./LogicLayer");

var _LogicLayer2 = _interopRequireDefault(_LogicLayer);

var _LogicNode = require("./LogicNode");

var _LogicNode2 = _interopRequireDefault(_LogicNode);

var _LogicInterface = require("./LogicInterface");

var _LogicInterface2 = _interopRequireDefault(_LogicInterface);

var _LogicNodes = require("./LogicNodes");

var _LogicNodes2 = _interopRequireDefault(_LogicNodes);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Logic node implementing a random value. Every frame a new random value is written
 * to its output.
 * @private
 */
function LogicNodeRandom() {
	_LogicNode2.default.call(this);
	this.wantsProcessCall = true;
	this.logicInterface = LogicNodeRandom.logicInterface;
	this.type = 'LogicNodeRandom';
}

// Logic interface set-up
LogicNodeRandom.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeRandom.editorName = 'Random';
LogicNodeRandom.logicInterface = new _LogicInterface2.default();

// ports
LogicNodeRandom.outPropRandom = LogicNodeRandom.logicInterface.addOutputProperty('Random0_1', 'float');

// Process
LogicNodeRandom.prototype.processLogic = function () {
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeRandom.outPropRandom, Math.random());
};

_LogicNodes2.default.registerType('LogicNodeRandom', LogicNodeRandom);
module.exports = exports.default;
