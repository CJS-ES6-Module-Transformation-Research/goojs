Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeVec3Add = undefined;

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

var exported_LogicNodeVec3Add = LogicNodeVec3Add;
function LogicNodeVec3Add() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeVec3Add.logicInterface;
	this.type = 'LogicNodeVec3Add';
}

LogicNodeVec3Add.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeVec3Add.editorName = 'AddVec3';

LogicNodeVec3Add.prototype.onInputChanged = function (instDesc) {
	var vec1 = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3Add.inportX);
	var vec2 = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3Add.inportY);

	var vec = new _Vector.Vector3();
	vec.copy(vec1).add(vec2);

	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3Add.outportSum, vec);
};

LogicNodeVec3Add.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeVec3Add.outportSum = LogicNodeVec3Add.logicInterface.addOutputProperty('sum', 'Vector3');
LogicNodeVec3Add.inportX = LogicNodeVec3Add.logicInterface.addInputProperty('vec1', 'Vector3', new _Vector.Vector3());
LogicNodeVec3Add.inportY = LogicNodeVec3Add.logicInterface.addInputProperty('vec2', 'Vector3', new _Vector.Vector3());

LogicNodes.registerType('LogicNodeVec3Add', LogicNodeVec3Add);

/**
 * Logic node that adds Vec3 inputs.
 * @private
 */
exports.LogicNodeVec3Add = exported_LogicNodeVec3Add;
