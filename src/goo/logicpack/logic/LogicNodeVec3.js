Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeVec3;

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
 * Logic node that provides a Vec3.
 * @private
 */
function LogicNodeVec3() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeVec3.logicInterface;
	this.type = 'LogicNodeVec3';
	this._x = this._y = this._z = 0; // REVIEW: unused?
}

LogicNodeVec3.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeVec3.editorName = 'Vec3';

LogicNodeVec3.prototype.onInputChanged = function (instDesc) {
	var x = _LogicLayer2.default.readPort(instDesc, LogicNodeVec3.inportX);
	var y = _LogicLayer2.default.readPort(instDesc, LogicNodeVec3.inportY);
	var z = _LogicLayer2.default.readPort(instDesc, LogicNodeVec3.inportZ);
	var xyz = _LogicLayer2.default.readPort(instDesc, LogicNodeVec3.inportVec3);
	if (xyz !== null) {
		x = xyz.x;
		y = xyz.y;
		z = xyz.z;
	}

	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeVec3.outportVec3, new _Vector2.default(x, y, z));
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeVec3.outportX, x);
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeVec3.outportY, y);
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeVec3.outportZ, z);
};

LogicNodeVec3.logicInterface = new _LogicInterface2.default();

LogicNodeVec3.outportVec3 = LogicNodeVec3.logicInterface.addOutputProperty('xyz', 'Vector3');
LogicNodeVec3.inportVec3 = LogicNodeVec3.logicInterface.addInputProperty('xyz', 'Vector3', null);
LogicNodeVec3.inportX = LogicNodeVec3.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeVec3.inportY = LogicNodeVec3.logicInterface.addInputProperty('y', 'float', 0);
LogicNodeVec3.inportZ = LogicNodeVec3.logicInterface.addInputProperty('z', 'float', 0);
LogicNodeVec3.outportX = LogicNodeVec3.logicInterface.addOutputProperty('x', 'float', 0);
LogicNodeVec3.outportY = LogicNodeVec3.logicInterface.addOutputProperty('y', 'float', 0);
LogicNodeVec3.outportZ = LogicNodeVec3.logicInterface.addOutputProperty('z', 'float', 0);

_LogicNodes2.default.registerType('LogicNodeVec3', LogicNodeVec3);
module.exports = exports.default;
