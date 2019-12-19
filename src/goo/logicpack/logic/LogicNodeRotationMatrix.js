Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeRotationMatrix = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var LogicNodes = _interopRequireWildcard(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var _Matrix = require("../../math/Matrix3");

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function LogicNodeRotationMatrix() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeRotationMatrix.logicInterface;
	this.type = 'LogicNodeRotationMatrix';
	this.vec = new _Vector.Vector3();
}

LogicNodeRotationMatrix.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeRotationMatrix.editorName = 'RotationMatrix';

LogicNodeRotationMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeRotationMatrix.inportX);
	var mat = new _Matrix.Matrix3();
	mat.fromAngles(vec.x, vec.y, vec.z);
	_LogicLayer.LogicLayer.writeValue(instDesc, LogicNodeRotationMatrix.outportProduct, mat);
};

LogicNodeRotationMatrix.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeRotationMatrix.inportX = LogicNodeRotationMatrix.logicInterface.addInputProperty('vec', 'Vector3', new _Vector.Vector3());
LogicNodeRotationMatrix.outportProduct = LogicNodeRotationMatrix.logicInterface.addOutputProperty('mat', 'Matrix3', new _Matrix.Matrix3());

LogicNodes.registerType('LogicNodeRotationMatrix', LogicNodeRotationMatrix);

var exported_LogicNodeRotationMatrix = LogicNodeRotationMatrix;

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
exports.LogicNodeRotationMatrix = exported_LogicNodeRotationMatrix;
