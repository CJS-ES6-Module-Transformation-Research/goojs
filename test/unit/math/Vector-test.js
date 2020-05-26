import { Vector as srcgoomathVector_Vectorjs } from "../../../src/goo/math/Vector";
import { Matrix as srcgoomathMatrix_Matrixjs } from "../../../src/goo/math/Matrix";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";

describe('Vector', function () {
	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	describe('add', function () {
		it('can perform addition', function () {
			var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
			var b = new srcgoomathVector_Vectorjs(2).set(1, 2);
			a.add(a);

			expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(2, 4));
			expect(srcgoomathVector_Vectorjs.add(b, b)).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(2, 4));
		});
	});

	describe('sub', function () {
		it('can perform subtraction', function () {
			var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
			var b = new srcgoomathVector_Vectorjs(2).set(1, 2);

			a.sub(a);

			expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(0, 0));
			expect(srcgoomathVector_Vectorjs.sub(b, b)).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(0, 0));
		});
	});

	describe('mul', function () {
		it('can perform multiplication', function () {
			var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
			var b = new srcgoomathVector_Vectorjs(2).set(1, 2);

			a.mul(a);

			expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 4));
			expect(srcgoomathVector_Vectorjs.mul(b, b)).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 4));
		});
	});

	describe('div', function () {
		it('can perform division', function () {
			var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
			var b = new srcgoomathVector_Vectorjs(2).set(1, 2);

			a.div(a);

			expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 1));
			expect(srcgoomathVector_Vectorjs.div(b, b)).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 1));
		});
	});

	describe('copy', function () {
		it('can copy values', function () {
			var source = new srcgoomathVector_Vectorjs(2).set(1, 2);
			var target = new srcgoomathVector_Vectorjs(2);

			var result = target.copy(source);

			expect(target).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 2));
			expect(result).toBe(target);
			expect(srcgoomathVector_Vectorjs.copy(srcgoomathVector_Vectorjs)).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 2));
		});
	});

	it('can calculate dot products', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
		var b = new srcgoomathVector_Vectorjs(2).set(1, 2);

		expect(a.dot(b)).toEqual(5);
		expect(srcgoomathVector_Vectorjs.dot(a, b)).toEqual(5);
	});

	it('can apply matrices', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
		var c = new srcgoomathMatrix_Matrixjs(2, 2).set(1, 2, 3, 4);

		a.apply(c);

		expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(7, 10));
	});


	describe('equals', function () {
		it('can be tested for approximate equaltiy', function () {
			var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
			var b = new srcgoomathVector_Vectorjs(2).set(1, 2);
			var c = new srcgoomathVector_Vectorjs(2).set(2, 3);

			expect(a.equals(b)).toEqual(true);
			expect(srcgoomathVector_Vectorjs.equals(a, b)).toEqual(true);
			expect(a.equals(c)).toEqual(false);
			expect(srcgoomathVector_Vectorjs.equals(a, c)).toEqual(false);
		});

		it('preserves behaviour of comparing with NaN', function () {
			// 1 === NaN // false in JS, so (1, 2) === (1, NaN) should return the same
			var v1 = new srcgoomathVector_Vectorjs(2).set(1, 2);
			var v2 = new srcgoomathVector_Vectorjs(2).set(1, NaN);

			expect(v1.equals(v2)).toBeFalsy();
		});
	});

	it('can calculate lengths', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(3, 4);

		expect(a.length()).toEqual(5);
		expect(a.lengthSquared()).toEqual(25);
	});

	it('can calculate distances', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(3, 4);
		var b = new srcgoomathVector_Vectorjs(2).set(6, 8);

		expect(a.distance(b)).toEqual(5);
		expect(srcgoomathVector_Vectorjs.distance(a, b)).toEqual(5);
		expect(a.distanceSquared(b)).toEqual(25);
		expect(srcgoomathVector_Vectorjs.distanceSquared(a, b)).toEqual(25);
	});

	it('can be inverted', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(1, 2);

		a.invert();

		expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(-1, -2));
	});

	it('can be normalized', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(3, 4);

		a.normalize();

		expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(0.6, 0.8));
	});

	it('can be cloned', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
		var b = a.clone();

		b.set(2, 3);

		expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 2));
		expect(b).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(2, 3));
	});

	it('can be set', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(1, 2);
		var b = new srcgoomathVector_Vectorjs(2).set([1, 2]);
		var c = new srcgoomathVector_Vectorjs(2).set(a);

		expect(a).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 2));
		expect(b).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 2));
		expect(c).toBeCloseToVector(new srcgoomathVector_Vectorjs(2).set(1, 2));
	});

	it('can be printed', function () {
		var a = new srcgoomathVector_Vectorjs(2).set(1, 2);

		expect(a.toString()).toEqual('[1, 2]');
	});
});
