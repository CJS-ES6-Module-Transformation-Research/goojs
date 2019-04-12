Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeApplyMatrix;

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
 * Logic node for vector < matrix computation
 * @private
 */
function LogicNodeApplyMatrix() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeApplyMatrix.logicInterface;
	this.type = 'LogicNodeApplyMatrix';
	this.vec = new _Vector2.default();
}

LogicNodeApplyMatrix.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeApplyMatrix.editorName = 'ApplyMatrix';

LogicNodeApplyMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = _LogicLayer2.default.readPort(instDesc, LogicNodeApplyMatrix.inportX);
	var mat = _LogicLayer2.default.readPort(instDesc, LogicNodeApplyMatrix.inportY);
	this.vec.copy(vec);
	mat.applyPost(this.vec);
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeApplyMatrix.outportProduct, this.vec);
};

LogicNodeApplyMatrix.logicInterface = new _LogicInterface2.default();
LogicNodeApplyMatrix.outportProduct = LogicNodeApplyMatrix.logicInterface.addOutputProperty('product', 'Vector3');
LogicNodeApplyMatrix.inportX = LogicNodeApplyMatrix.logicInterface.addInputProperty('vec', 'Vector3', new _Vector2.default());
LogicNodeApplyMatrix.inportY = LogicNodeApplyMatrix.logicInterface.addInputProperty('mat', 'Matrix3', new _Matrix2.default());

_LogicNodes2.default.registerType('LogicNodeApplyMatrix', LogicNodeApplyMatrix);
module.exports = exports.default;
