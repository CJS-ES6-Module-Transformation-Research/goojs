"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeRotationMatrix = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var _Matrix = require("../../math/Matrix3");

var mod_LogicNodeRotationMatrix = LogicNodeRotationMatrix;

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
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

_LogicNodes.LogicNodes.registerType('LogicNodeRotationMatrix', LogicNodeRotationMatrix);

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
exports.LogicNodeRotationMatrix = mod_LogicNodeRotationMatrix;