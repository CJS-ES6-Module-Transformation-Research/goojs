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

var LogicNodeRotationMatrix_outportProduct;
var LogicNodeRotationMatrix_inportX;
var LogicNodeRotationMatrix_editorName;
var LogicNodeRotationMatrix_logicInterface;
function LogicNodeRotationMatrix() {
	_LogicNode.LogicNode.call(this);
	LogicNodeRotationMatrix_logicInterface = LogicNodeRotationMatrix_logicInterface;;
	this.type = 'LogicNodeRotationMatrix';
	this.vec = new _Vector.Vector3();
}

LogicNodeRotationMatrix.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeRotationMatrix_editorName = "RotationMatrix";;

LogicNodeRotationMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeRotationMatrix_inportX);
	var mat = new _Matrix.Matrix3();
	mat.fromAngles(vec.x, vec.y, vec.z);
	_LogicLayer.LogicLayer.writeValue(instDesc, LogicNodeRotationMatrix_outportProduct, mat);
};

LogicNodeRotationMatrix_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeRotationMatrix_inportX = LogicNodeRotationMatrix_logicInterface.addInputProperty("vec", "Vector3", new _Vector.Vector3());;
LogicNodeRotationMatrix_outportProduct = LogicNodeRotationMatrix_logicInterface.addOutputProperty("mat", "Matrix3", new _Matrix.Matrix3());;

_LogicNodes.LogicNodes.registerType('LogicNodeRotationMatrix', LogicNodeRotationMatrix);

var exported_LogicNodeRotationMatrix = LogicNodeRotationMatrix;

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
exports.LogicNodeRotationMatrix = exported_LogicNodeRotationMatrix;
