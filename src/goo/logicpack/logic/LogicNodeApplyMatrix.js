"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeApplyMatrix = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var _Matrix = require("../../math/Matrix3");

function LogicNodeApplyMatrix() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeApplyMatrix.logicInterface;
	this.type = 'LogicNodeApplyMatrix';
	this.vec = new _Vector.Vector3();
}

LogicNodeApplyMatrix.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeApplyMatrix.editorName = 'ApplyMatrix';

LogicNodeApplyMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeApplyMatrix.inportX);
	var mat = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeApplyMatrix.inportY);
	this.vec.copy(vec);
	mat.applyPost(this.vec);
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeApplyMatrix.outportProduct, this.vec);
};

LogicNodeApplyMatrix.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeApplyMatrix.outportProduct = LogicNodeApplyMatrix.logicInterface.addOutputProperty('product', 'Vector3');
LogicNodeApplyMatrix.inportX = LogicNodeApplyMatrix.logicInterface.addInputProperty('vec', 'Vector3', new _Vector.Vector3());
LogicNodeApplyMatrix.inportY = LogicNodeApplyMatrix.logicInterface.addInputProperty('mat', 'Matrix3', new _Matrix.Matrix3());

_LogicNodes.LogicNodes.registerType('LogicNodeApplyMatrix', LogicNodeApplyMatrix);

var exported_LogicNodeApplyMatrix = LogicNodeApplyMatrix;

/**
 * Logic node for vector < matrix computation
 * @private
 */
exports.LogicNodeApplyMatrix = exported_LogicNodeApplyMatrix;
