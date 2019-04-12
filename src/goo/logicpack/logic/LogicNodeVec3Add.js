Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeVec3Add;

var _LogicLayer = require("./LogicLayer");

var _LogicLayer2 = _interopRequireDefault(_LogicLayer);

var _LogicNode = require("./LogicNode");

var _LogicNode2 = _interopRequireDefault(_LogicNode);

var _LogicNodes = require("./LogicNodes");

var _LogicNodes2 = _interopRequireDefault(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

var _LogicInterface2 = _interopRequireDefault(_LogicInterface);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Logic node that adds Vec3 inputs.
 * @private
 */
function LogicNodeVec3Add() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeVec3Add.logicInterface;
	this.type = 'LogicNodeVec3Add';
}

LogicNodeVec3Add.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeVec3Add.editorName = 'AddVec3';

LogicNodeVec3Add.prototype.onInputChanged = function (instDesc) {
	var vec1 = _LogicLayer2.default.readPort(instDesc, LogicNodeVec3Add.inportX);
	var vec2 = _LogicLayer2.default.readPort(instDesc, LogicNodeVec3Add.inportY);

	var vec = new _Vector2.default();
	vec.copy(vec1).add(vec2);

	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeVec3Add.outportSum, vec);
};

LogicNodeVec3Add.logicInterface = new _LogicInterface2.default();
LogicNodeVec3Add.outportSum = LogicNodeVec3Add.logicInterface.addOutputProperty('sum', 'Vector3');
LogicNodeVec3Add.inportX = LogicNodeVec3Add.logicInterface.addInputProperty('vec1', 'Vector3', new _Vector2.default());
LogicNodeVec3Add.inportY = LogicNodeVec3Add.logicInterface.addInputProperty('vec2', 'Vector3', new _Vector2.default());

_LogicNodes2.default.registerType('LogicNodeVec3Add', LogicNodeVec3Add);
module.exports = exports.default;
