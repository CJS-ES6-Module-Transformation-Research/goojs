import {
    Spline as Spline_Splinejs,
    quadraticInterpolation as Splinejs_quadraticInterpolation,
    cubicInterpolation as Splinejs_cubicInterpolation,
} from "../../../src/goo/math/splines/Spline";

import { Vector2 as Vector2js } from "../../../src/goo/math/Vector2";
import { Vector3 as Vector3js } from "../../../src/goo/math/Vector3";
import { Vector4 as Vector4js } from "../../../src/goo/math/Vector4";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";

describe('Spline', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	describe('quadraticInterpolation', function () {
		it('retrieves a point for t = 0', function () {
			var point = new Vector2js();
			var start = new Vector2js(2, 4);
			var mid = new Vector2js(10, 20);
			var end = new Vector2js(8, 6);
			Splinejs_quadraticInterpolation(start, mid, end, 0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new Vector2js();
			var start = new Vector2js(2, 4);
			var mid = new Vector2js(10, 20);
			var end = new Vector2js(8, 6);
			Splinejs_quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('works with Vector3', function () {
			var point = new Vector3js();
			var start = new Vector3js(1,2,3);
			var mid = new Vector3js(1,2,3);
			var end = new Vector3js(1,2,3);
			Splinejs_quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('works with Vector4', function () {
			var point = new Vector4js();
			var start = new Vector4js(1,2,3,4);
			var mid = new Vector4js(1,2,3,4);
			var end = new Vector4js(1,2,3,4);
			Splinejs_quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});
	});

	describe('cubicInterpolation', function () {
		it('retrieves a point for t = 0', function () {
			var point = new Vector2js();
			var start = new Vector2js(2, 4);
			var mid1 = new Vector2js(10, 20);
			var mid2 = new Vector2js(30, 40);
			var end = new Vector2js(8, 6);
			Splinejs_cubicInterpolation(start, mid1, mid2, end, 0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new Vector2js();
			var start = new Vector2js(2, 4);
			var mid1 = new Vector2js(10, 20);
			var mid2 = new Vector2js(30, 40);
			var end = new Vector2js(8, 6);
			Splinejs_cubicInterpolation(start, mid1, mid2, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});
	});

	describe('getPoint', function () {
		it('retrieves a point for t = 0', function () {
			var point = new Vector2js();
			var start = new Vector2js(123, 456);
			var mid1 = new Vector2js(1, 2);
			var mid2 = new Vector2js(3, 4);
			var mid3 = new Vector2js(5, 6);
			var mid4 = new Vector2js(7, 8);
			var mid5 = new Vector2js(9, 10);
			var end = new Vector2js(321, 654);
			new Spline_Splinejs([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new Vector2js();
			var start = new Vector2js(123, 456);
			var mid1 = new Vector2js(1, 2);
			var mid2 = new Vector2js(3, 4);
			var mid3 = new Vector2js(5, 6);
			var mid4 = new Vector2js(7, 8);
			var mid5 = new Vector2js(9, 10);
			var end = new Vector2js(321, 654);
			new Spline_Splinejs([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('retrieves a point for t = 0.5', function () {
			var point = new Vector2js();
			var start = new Vector2js(123, 456);
			var mid1 = new Vector2js(1, 2);
			var mid2 = new Vector2js(3, 4);
			var mid3 = new Vector2js(5, 6);
			var mid4 = new Vector2js(7, 8);
			var mid5 = new Vector2js(9, 10);
			var end = new Vector2js(321, 654);
			new Spline_Splinejs([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(0.5, point);
			expect(point).toBeCloseToVector(mid3);
		});
	});
});
