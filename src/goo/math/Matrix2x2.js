"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Matrix2x2 = undefined;

var _Matrix = require("./Matrix2");

var _ObjectUtils = require("../util/ObjectUtils");

var x;


var Matrix2x2 = _ObjectUtils.ObjectUtils.warnOnce('Matrix2x2 has been renamed to Matrix2.', function () {
	_Matrix.Matrix2.apply(this, arguments);
});

Matrix2x2.prototype = Object.create(_Matrix.Matrix2.prototype);
Matrix2x2.prototype.constructor = Matrix2x2;
for (var x in _Matrix.Matrix2) {
	x = _Matrix.Matrix2[x];
}

exports.Matrix2x2 = mod_Matrix2x2;