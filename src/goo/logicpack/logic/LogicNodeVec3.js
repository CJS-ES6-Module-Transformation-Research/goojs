"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeVec3 = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var LogicNodeVec3_outportZ;
var LogicNodeVec3_outportY;
var LogicNodeVec3_outportX;
var LogicNodeVec3_inportZ;
var LogicNodeVec3_inportY;
var LogicNodeVec3_inportX;
var LogicNodeVec3_inportVec3;
var LogicNodeVec3_outportVec3;
var LogicNodeVec3_editorName;
var LogicNodeVec3_logicInterface;
function LogicNodeVec3() {
	_LogicNode.LogicNode.call(this);
	LogicNodeVec3_logicInterface = LogicNodeVec3_logicInterface;;
	this.type = 'LogicNodeVec3';
	this._x = this._y = this._z = 0; // REVIEW: unused?
}

LogicNodeVec3.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeVec3_editorName = "Vec3";;

LogicNodeVec3.prototype.onInputChanged = function (instDesc) {
	var x = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3_inportX);
	var y = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3_inportY);
	var z = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3_inportZ);
	var xyz = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeVec3_inportVec3);
	if (xyz !== null) {
		x = xyz.x;
		y = xyz.y;
		z = xyz.z;
	}

	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3_outportVec3, new _Vector.Vector3(x, y, z));
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3_outportX, x);
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3_outportY, y);
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeVec3_outportZ, z);
};

LogicNodeVec3_logicInterface = new _LogicInterface.LogicInterface();

LogicNodeVec3_outportVec3 = LogicNodeVec3_logicInterface.addOutputProperty("xyz", "Vector3");;
LogicNodeVec3_inportVec3 = LogicNodeVec3_logicInterface.addInputProperty("xyz", "Vector3", null);;
LogicNodeVec3_inportX = LogicNodeVec3_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeVec3_inportY = LogicNodeVec3_logicInterface.addInputProperty("y", "float", 0);;
LogicNodeVec3_inportZ = LogicNodeVec3_logicInterface.addInputProperty("z", "float", 0);;
LogicNodeVec3_outportX = LogicNodeVec3_logicInterface.addOutputProperty("x", "float", 0);;
LogicNodeVec3_outportY = LogicNodeVec3_logicInterface.addOutputProperty("y", "float", 0);;
LogicNodeVec3_outportZ = LogicNodeVec3_logicInterface.addOutputProperty("z", "float", 0);;

_LogicNodes.LogicNodes.registerType('LogicNodeVec3', LogicNodeVec3);

var exported_LogicNodeVec3 = LogicNodeVec3;

/**
 * Logic node that provides a Vec3.
 * @private
 */
exports.LogicNodeVec3 = exported_LogicNodeVec3;
