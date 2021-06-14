import {
    radFromDeg as MathUtilsjs_radFromDeg,
    degFromRad as MathUtilsjs_degFromRad,
    lerp as MathUtilsjs_lerp,
    clamp as MathUtilsjs_clamp,
    radialClamp as MathUtilsjs_radialClamp,
    moduloPositive as MathUtilsjs_moduloPositive,
    scurve3 as MathUtilsjs_scurve3,
    scurve5 as MathUtilsjs_scurve5,
    sphericalToCartesian as MathUtilsjs_sphericalToCartesian,
    getTriangleNormal as MathUtilsjs_getTriangleNormal,
    isPowerOfTwo as MathUtilsjs_isPowerOfTwo,
    nearestPowerOfTwo as MathUtilsjs_nearestPowerOfTwo,
    closeTo as MathUtilsjs_closeTo,
    sign as MathUtilsjs_sign,
    triangleArea as MathUtilsjs_triangleArea,
    barycentricInterpolation as MathUtilsjs_barycentricInterpolation,
} from "../../../src/goo/math/MathUtils";

import { Vector3 as Vector3_Vector3 } from "../../../src/goo/math/Vector3";
import { Vector2 as Vector2_Vector2 } from "../../../src/goo/math/Vector2";

describe('MathUtils', function () {
	it('can convert to radians from degrees', function () {
		expect(MathUtilsjs_radFromDeg(90)).toEqual(Math.PI * 0.5);
	});

	it('can convert to degrees from radians', function () {
		expect(MathUtilsjs_degFromRad(Math.PI * 0.5)).toEqual(90);
	});

	it('can perform linear interpolation', function () {
		expect(MathUtilsjs_lerp(-1.0, 10.0, 20.0)).toEqual( 0.0);
		expect(MathUtilsjs_lerp(0.0, 10.0, 20.0)).toEqual(10.0);
		expect(MathUtilsjs_lerp(0.5, 10.0, 20.0)).toEqual(15.0);
		expect(MathUtilsjs_lerp(1.0, 10.0, 20.0)).toEqual(20.0);
		expect(MathUtilsjs_lerp(2.0, 10.0, 20.0)).toEqual(30.0);
		expect(MathUtilsjs_lerp(1.0, 5.0, 5.0)).toEqual(5.0);
	});

	it('can clamp a value to a given interval', function () {
		expect(MathUtilsjs_clamp(1.0, 2.0, 3.0)).toEqual(2.0);
		expect(MathUtilsjs_clamp(1.0, 3.0, 2.0)).toEqual(2.0);
		expect(MathUtilsjs_clamp(4.0, 2.0, 3.0)).toEqual(3.0);
		expect(MathUtilsjs_clamp(4.0, 3.0, 2.0)).toEqual(3.0);
		expect(MathUtilsjs_clamp(2.5, 2.0, 3.0)).toEqual(2.5);
	});

	it('can compute values on cubic s-curves', function () {
		expect(MathUtilsjs_scurve3(0.00)).toEqual(0.0);
		expect(MathUtilsjs_scurve3(0.25)).toEqual((-2.0 * 0.25 + 3.0) * 0.25 * 0.25);
		expect(MathUtilsjs_scurve3(0.50)).toEqual(0.5);
		expect(MathUtilsjs_scurve3(0.75)).toEqual((-2.0 * 0.75 + 3.0) * 0.75 * 0.75);
		expect(MathUtilsjs_scurve3(1.00)).toEqual(1.0);
	});

	it('can compute values on quintic s-curves', function () {
		expect(MathUtilsjs_scurve5(0.00)).toEqual(0.0);
		expect(MathUtilsjs_scurve5(0.25)).toEqual(((6.0 * 0.25 - 15.0) * 0.25 + 10.0) * 0.25 * 0.25 * 0.25);
		expect(MathUtilsjs_scurve5(0.50)).toEqual(0.5);
		expect(MathUtilsjs_scurve5(0.75)).toEqual(((6.0 * 0.75 - 15.0) * 0.75 + 10.0) * 0.75 * 0.75 * 0.75);
		expect(MathUtilsjs_scurve5(1.00)).toEqual(1.0);
	});

	it('can convert to cartesian coordinates from spherical coordinates', function (){
		var c = new Vector3_Vector3();

		MathUtilsjs_sphericalToCartesian(16, 0, 0, c);
		expect(c.x).toBeCloseTo(16);
		expect(c.y).toBeCloseTo(0);
		expect(c.z).toBeCloseTo(0);

		MathUtilsjs_sphericalToCartesian(16, Math.PI / 2, 0, c);
		expect(c.x).toBeCloseTo(0);
		expect(c.y).toBeCloseTo(0);
		expect(c.z).toBeCloseTo(16);

		MathUtilsjs_sphericalToCartesian(4, Math.PI / 2, Math.PI / 4, c);
		expect(c.x).toBeCloseTo(0);
		expect(c.y).toBeCloseTo(Math.sqrt(8));
		expect(c.z).toBeCloseTo(Math.sqrt(8));
	});

	describe('isPowerOfTwo', function () {
		[
			[0, true],
			[1, true],
			[2, true],
			[3, false],
			[8, true],
			[13, false],
			[255, false],
			[256, true],
			[257, false]
		].forEach(function (pair) {
			it(pair[0] + ' is ' + (pair[1] ? '' : 'not ') + 'a power of two', function () {
				expect(MathUtilsjs_isPowerOfTwo(pair[0])).toEqual(pair[1]);
			});
		});
	});

	describe('nearestPowerOfTwo', function () {
		[
			[0, 0],
			[1, 1],
			[2, 2],
			[3, 4],
			[8, 8],
			[13, 16],
			[255, 256],
			[256, 256],
			[257, 512]
		].forEach(function (pair) {
			it('the nearest power of two of ' + pair[0] + ' is ' + pair[1], function () {
				expect(MathUtilsjs_nearestPowerOfTwo(pair[0])).toEqual(pair[1]);
			});
		});
	});

	it('can compute the area of a triangle', function () {
		expect(MathUtilsjs_triangleArea(new Vector2_Vector2(5, 5), new Vector2_Vector2(5, 6), new Vector2_Vector2(7, 5))).toBeCloseTo(1.0);
	});

	it('can do barycentric interpolation', function () {
		var t1 = new Vector3_Vector3(2, 2, 30);
		var t2 = new Vector3_Vector3(4, 2, 40);
		var t3 = new Vector3_Vector3(2, 6, 50);

		expect(MathUtilsjs_barycentricInterpolation(t1, t2, t3, new Vector3_Vector3(2, 4, 123)).z).toBeCloseTo(40);
		expect(MathUtilsjs_barycentricInterpolation(t1, t2, t3, new Vector3_Vector3(3, 2, 123)).z).toBeCloseTo(35);
		expect(MathUtilsjs_barycentricInterpolation(
			t1, t2, t3, new Vector3_Vector3((t1.x + t2.x + t3.x) / 3, (t1.y + t2.y + t3.y) / 3, 123)).z
		).toBeCloseTo(40);
	});

	it('gets the correct triangle normal', function () {
		var p1 = [0, 0, 0];
		var p2 = [0, 1, 0];
		var p3 = [1, 1, 0];
		expect(MathUtilsjs_getTriangleNormal(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2]))
			.toEqual([0, 0, -1]);

		p1 = [0, 0, 0];
		p2 = [0, 0, 1];
		p3 = [1, 0, 1];
		expect(MathUtilsjs_getTriangleNormal(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2]))
			.toEqual([0, 1, 0]);

		p1 = [1, 0, 0];
		p2 = [0, 1, 0];
		p3 = [0, 0, 1];
		expect(MathUtilsjs_getTriangleNormal(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2]))
			.toEqual([1, 1, 1]);
	});

	it('can do positive modulo', function () {
		expect(MathUtilsjs_moduloPositive(-Math.PI / 2, 2 * Math.PI)).toBeCloseTo(3 * Math.PI / 2);
	});

	it('can check if a value is close to another', function () {
		expect(MathUtilsjs_closeTo(1, 1)).toBeTruthy();
		expect(MathUtilsjs_closeTo(1, 2)).toBeFalsy();
		expect(MathUtilsjs_closeTo(1, 1.01, 0.02)).toBeTruthy();
		expect(MathUtilsjs_closeTo(1, 1.02, 0.01)).toBeFalsy();
	});

	it('can get the sign of a number', function () {
		expect(MathUtilsjs_sign(1)).toBe(1);
		expect(MathUtilsjs_sign(-1)).toBe(-1);
		expect(MathUtilsjs_sign(1.4)).toBe(1);
		expect(MathUtilsjs_sign(-1.4)).toBe(-1);
		expect(MathUtilsjs_sign(0)).toBe(0);
	});

	it('can do radial clamping', function () {
		var a = -1;
		a = MathUtilsjs_radialClamp(a, 0, 9);
		expect(a).toBe(0);
	});
});
