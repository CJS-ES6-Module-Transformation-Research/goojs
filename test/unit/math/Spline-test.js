import { Spline as srcgoomathsplinesSpline_Splinejs } from "../../../src/goo/math/splines/Spline";
import { Vector2 as srcgoomathVector2_Vector2js } from "../../../src/goo/math/Vector2";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../src/goo/math/Vector3";
import { Vector4 as srcgoomathVector4_Vector4js } from "../../../src/goo/math/Vector4";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";

describe('Spline', function () {
	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	describe('quadraticInterpolation', function () {
		it('retrieves a point for t = 0', function () {
			var point = new srcgoomathVector2_Vector2js();
			var start = new srcgoomathVector2_Vector2js(2, 4);
			var mid = new srcgoomathVector2_Vector2js(10, 20);
			var end = new srcgoomathVector2_Vector2js(8, 6);
			srcgoomathsplinesSpline_Splinejs.quadraticInterpolation(start, mid, end, 0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new srcgoomathVector2_Vector2js();
			var start = new srcgoomathVector2_Vector2js(2, 4);
			var mid = new srcgoomathVector2_Vector2js(10, 20);
			var end = new srcgoomathVector2_Vector2js(8, 6);
			srcgoomathsplinesSpline_Splinejs.quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('works with Vector3', function () {
			var point = new srcgoomathVector3_Vector3js();
			var start = new srcgoomathVector3_Vector3js(1,2,3);
			var mid = new srcgoomathVector3_Vector3js(1,2,3);
			var end = new srcgoomathVector3_Vector3js(1,2,3);
			srcgoomathsplinesSpline_Splinejs.quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('works with Vector4', function () {
			var point = new srcgoomathVector4_Vector4js();
			var start = new srcgoomathVector4_Vector4js(1,2,3,4);
			var mid = new srcgoomathVector4_Vector4js(1,2,3,4);
			var end = new srcgoomathVector2_Vector2js(1,2,3,4);
			srcgoomathsplinesSpline_Splinejs.quadraticInterpolation(start, mid, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});
	});

	describe('cubicInterpolation', function () {
		it('retrieves a point for t = 0', function () {
			var point = new srcgoomathVector2_Vector2js();
			var start = new srcgoomathVector2_Vector2js(2, 4);
			var mid1 = new srcgoomathVector2_Vector2js(10, 20);
			var mid2 = new srcgoomathVector2_Vector2js(30, 40);
			var end = new srcgoomathVector2_Vector2js(8, 6);
			srcgoomathsplinesSpline_Splinejs.cubicInterpolation(start, mid1, mid2, end, 0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new srcgoomathVector2_Vector2js();
			var start = new srcgoomathVector2_Vector2js(2, 4);
			var mid1 = new srcgoomathVector2_Vector2js(10, 20);
			var mid2 = new srcgoomathVector2_Vector2js(30, 40);
			var end = new srcgoomathVector2_Vector2js(8, 6);
			srcgoomathsplinesSpline_Splinejs.cubicInterpolation(start, mid1, mid2, end, 1, point);
			expect(point).toBeCloseToVector(end);
		});
	});

	describe('getPoint', function () {
		it('retrieves a point for t = 0', function () {
			var point = new srcgoomathVector2_Vector2js();
			var start = new srcgoomathVector2_Vector2js(123, 456);
			var mid1 = new srcgoomathVector2_Vector2js(1, 2);
			var mid2 = new srcgoomathVector2_Vector2js(3, 4);
			var mid3 = new srcgoomathVector2_Vector2js(5, 6);
			var mid4 = new srcgoomathVector2_Vector2js(7, 8);
			var mid5 = new srcgoomathVector2_Vector2js(9, 10);
			var end = new srcgoomathVector2_Vector2js(321, 654);
			new srcgoomathsplinesSpline_Splinejs([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(0, point);
			expect(point).toBeCloseToVector(start);
		});

		it('retrieves a point for t = 1', function () {
			var point = new srcgoomathVector2_Vector2js();
			var start = new srcgoomathVector2_Vector2js(123, 456);
			var mid1 = new srcgoomathVector2_Vector2js(1, 2);
			var mid2 = new srcgoomathVector2_Vector2js(3, 4);
			var mid3 = new srcgoomathVector2_Vector2js(5, 6);
			var mid4 = new srcgoomathVector2_Vector2js(7, 8);
			var mid5 = new srcgoomathVector2_Vector2js(9, 10);
			var end = new srcgoomathVector2_Vector2js(321, 654);
			new srcgoomathsplinesSpline_Splinejs([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(1, point);
			expect(point).toBeCloseToVector(end);
		});

		it('retrieves a point for t = 0.5', function () {
			var point = new srcgoomathVector2_Vector2js();
			var start = new srcgoomathVector2_Vector2js(123, 456);
			var mid1 = new srcgoomathVector2_Vector2js(1, 2);
			var mid2 = new srcgoomathVector2_Vector2js(3, 4);
			var mid3 = new srcgoomathVector2_Vector2js(5, 6);
			var mid4 = new srcgoomathVector2_Vector2js(7, 8);
			var mid5 = new srcgoomathVector2_Vector2js(9, 10);
			var end = new srcgoomathVector2_Vector2js(321, 654);
			new srcgoomathsplinesSpline_Splinejs([start, mid1, mid2, mid3, mid4, mid5, end]).getPoint(0.5, point);
			expect(point).toBeCloseToVector(mid3);
		});
	});
});
