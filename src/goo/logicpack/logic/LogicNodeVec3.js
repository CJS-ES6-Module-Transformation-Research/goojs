Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeVec3 = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var LogicNodes = _interopRequireWildcard(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

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

function LogicNodeVec3() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeVec3.logicInterface;
	this.type = 'LogicNodeVec3';
	this._x = this._y = this._z = 0; // REVIEW: unused?
}

LogicNodeVec3.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeVec3.editorName = 'Vec3';

LogicNodeVec3.prototype.onInputChanged = function (instDesc) {
	var x = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3.inportX);
	var y = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3.inportY);
	var z = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3.inportZ);
	var xyz = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3.inportVec3);
	if (xyz !== null) {
		x = xyz.x;
		y = xyz.y;
		z = xyz.z;
	}

	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3.outportVec3, new _Vector.Vector3(x, y, z));
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3.outportX, x);
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3.outportY, y);
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3.outportZ, z);
};

LogicNodeVec3.logicInterface = new _LogicInterface.LogicInterface();

LogicNodeVec3.outportVec3 = LogicNodeVec3.logicInterface.addOutputProperty('xyz', 'Vector3');
LogicNodeVec3.inportVec3 = LogicNodeVec3.logicInterface.addInputProperty('xyz', 'Vector3', null);
LogicNodeVec3.inportX = LogicNodeVec3.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeVec3.inportY = LogicNodeVec3.logicInterface.addInputProperty('y', 'float', 0);
LogicNodeVec3.inportZ = LogicNodeVec3.logicInterface.addInputProperty('z', 'float', 0);
LogicNodeVec3.outportX = LogicNodeVec3.logicInterface.addOutputProperty('x', 'float', 0);
LogicNodeVec3.outportY = LogicNodeVec3.logicInterface.addOutputProperty('y', 'float', 0);
LogicNodeVec3.outportZ = LogicNodeVec3.logicInterface.addOutputProperty('z', 'float', 0);

LogicNodes.registerType('LogicNodeVec3', LogicNodeVec3);

var exported_LogicNodeVec3 = LogicNodeVec3;

/**
 * Logic node that provides a Vec3.
 * @private
 */
exports.LogicNodeVec3 = exported_LogicNodeVec3;
