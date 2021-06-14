"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Matrix4x4 = undefined;

var _Matrix = require("./Matrix4");

var _ObjectUtils = require("../util/ObjectUtils");

var Matrix4x4 = _ObjectUtils.ObjectUtils.warnOnce('Matrix4x4 has been renamed to Matrix4.', function () {
	_Matrix.Matrix4.apply(this, arguments);
});

Matrix4x4.prototype = Object.create(_Matrix.Matrix4.prototype);
Matrix4x4.prototype.constructor = Matrix4x4;
for (var x in _Matrix.Matrix4) {
	Matrix4x4[x] = _Matrix.Matrix4[x];
}

var mod_Matrix4x4;

exports.Matrix4x4 = mod_Matrix4x4 = Matrix4x4;
exports.Matrix4x4 = mod_Matrix4x4;