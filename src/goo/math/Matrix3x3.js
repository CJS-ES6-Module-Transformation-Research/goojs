"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Matrix3x3 = undefined;

var _Matrix = require("./Matrix3");

var _ObjectUtils = require("../util/ObjectUtils");

var Matrix3x3 = _ObjectUtils.ObjectUtils.warnOnce('Matrix3x3 has been renamed to Matrix3.', function () {
	_Matrix.Matrix3.apply(this, arguments);
});

Matrix3x3.prototype = Object.create(_Matrix.Matrix3.prototype);
Matrix3x3.prototype.constructor = Matrix3x3;
for (var x in _Matrix.Matrix3) {
	Matrix3x3[x] = _Matrix.Matrix3[x];
}

var mod_Matrix3x3;

exports.Matrix3x3 = mod_Matrix3x3 = Matrix3x3;
exports.Matrix3x3 = mod_Matrix3x3;