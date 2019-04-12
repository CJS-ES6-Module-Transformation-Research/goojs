Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeRotationMatrix;

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

var _Matrix = require("../../math/Matrix3");

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
function LogicNodeRotationMatrix() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeRotationMatrix.logicInterface;
	this.type = 'LogicNodeRotationMatrix';
	this.vec = new _Vector2.default();
}

LogicNodeRotationMatrix.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeRotationMatrix.editorName = 'RotationMatrix';

LogicNodeRotationMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = _LogicLayer2.default.readPort(instDesc, LogicNodeRotationMatrix.inportX);
	var mat = new _Matrix2.default();
	mat.fromAngles(vec.x, vec.y, vec.z);
	_LogicLayer2.default.writeValue(instDesc, LogicNodeRotationMatrix.outportProduct, mat);
};

LogicNodeRotationMatrix.logicInterface = new _LogicInterface2.default();
LogicNodeRotationMatrix.inportX = LogicNodeRotationMatrix.logicInterface.addInputProperty('vec', 'Vector3', new _Vector2.default());
LogicNodeRotationMatrix.outportProduct = LogicNodeRotationMatrix.logicInterface.addOutputProperty('mat', 'Matrix3', new _Matrix2.default());

_LogicNodes2.default.registerType('LogicNodeRotationMatrix', LogicNodeRotationMatrix);
module.exports = exports.default;
