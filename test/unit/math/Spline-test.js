"use strict";

var _Spline = require("../../../src/goo/math/splines/Spline");

var _Vector = require("../../../src/goo/math/Vector2");

var _Vector2 = require("../../../src/goo/math/Vector3");

var _Vector3 = require("../../../src/goo/math/Vector4");

var _CustomMatchers = require("../../../test/unit/CustomMatchers");

describe('Spline', function () {
	beforeEach(function () {
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
	});

	describe('quadraticInterpolation', function () {
		it('retrieves a point for t = 0', function () {
			var point = new _Vector.Vector2();
			var start = new _Vector.Vector2(2, 4);
			var mid = new _Vector.Vector2(10, 20);
			var end = new _Vector.Vector2(8, 6);
			_Spline.Spline.quadraticInterpolation(start, mid, end, 0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new _Vector.Vector2();
			var start = new _Vector.Vector2(2, 4);
			var mid = new _Vector.Vector2(10, 20);
			var end = new _Vector.Vector2(8, 6);
			_Spline.Spline.quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('works with Vector3', function () {
			var point = new _Vector2.Vector3();
			var start = new _Vector2.Vector3(1, 2, 3);
			var mid = new _Vector2.Vector3(1, 2, 3);
			var end = new _Vector2.Vector3(1, 2, 3);
			_Spline.Spline.quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('works with Vector4', function () {
			var point = new _Vector3.Vector4();
			var start = new _Vector3.Vector4(1, 2, 3, 4);
			var mid = new _Vector3.Vector4(1, 2, 3, 4);
			var end = new _Vector3.Vector4(1, 2, 3, 4);
			_Spline.Spline.quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});
	});

	describe('cubicInterpolation', function () {
		it('retrieves a point for t = 0', function () {
			var point = new _Vector.Vector2();
			var start = new _Vector.Vector2(2, 4);
			var mid1 = new _Vector.Vector2(10, 20);
			var mid2 = new _Vector.Vector2(30, 40);
			var end = new _Vector.Vector2(8, 6);
			_Spline.Spline.cubicInterpolation(start, mid1, mid2, end, 0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new _Vector.Vector2();
			var start = new _Vector.Vector2(2, 4);
			var mid1 = new _Vector.Vector2(10, 20);
			var mid2 = new _Vector.Vector2(30, 40);
			var end = new _Vector.Vector2(8, 6);
			_Spline.Spline.cubicInterpolation(start, mid1, mid2, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});
	});

	describe('getPoint', function () {
		it('retrieves a point for t = 0', function () {
			var point = new _Vector.Vector2();
			var start = new _Vector.Vector2(123, 456);
			var mid1 = new _Vector.Vector2(1, 2);
			var mid2 = new _Vector.Vector2(3, 4);
			var mid3 = new _Vector.Vector2(5, 6);
			var mid4 = new _Vector.Vector2(7, 8);
			var mid5 = new _Vector.Vector2(9, 10);
			var end = new _Vector.Vector2(321, 654);
			new _Spline.Spline([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new _Vector.Vector2();
			var start = new _Vector.Vector2(123, 456);
			var mid1 = new _Vector.Vector2(1, 2);
			var mid2 = new _Vector.Vector2(3, 4);
			var mid3 = new _Vector.Vector2(5, 6);
			var mid4 = new _Vector.Vector2(7, 8);
			var mid5 = new _Vector.Vector2(9, 10);
			var end = new _Vector.Vector2(321, 654);
			new _Spline.Spline([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('retrieves a point for t = 0.5', function () {
			var point = new _Vector.Vector2();
			var start = new _Vector.Vector2(123, 456);
			var mid1 = new _Vector.Vector2(1, 2);
			var mid2 = new _Vector.Vector2(3, 4);
			var mid3 = new _Vector.Vector2(5, 6);
			var mid4 = new _Vector.Vector2(7, 8);
			var mid5 = new _Vector.Vector2(9, 10);
			var end = new _Vector.Vector2(321, 654);
			new _Spline.Spline([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(0.5, point);
			expect(point).toBeCloseToVector(mid3);
		});
	});
});