import { Vector as Vectorjs } from "../../../src/goo/math/Vector";
import { Matrix as Matrixjs } from "../../../src/goo/math/Matrix";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";

describe('Vector', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	describe('add', function () {
		it('can perform addition', function () {
			var a = new Vectorjs(2).set(1, 2);
			var b = new Vectorjs(2).set(1, 2);
			a.add(a);

			expect(a).toBeCloseToVector(new Vectorjs(2).set(2, 4));
			expect(Vectorjs_add(b, b)).toBeCloseToVector(new Vectorjs(2).set(2, 4));
		});
	});

	describe('sub', function () {
		it('can perform subtraction', function () {
			var a = new Vectorjs(2).set(1, 2);
			var b = new Vectorjs(2).set(1, 2);

			a.sub(a);

			expect(a).toBeCloseToVector(new Vectorjs(2).set(0, 0));
			expect(Vectorjs_sub(b, b)).toBeCloseToVector(new Vectorjs(2).set(0, 0));
		});
	});

	describe('mul', function () {
		it('can perform multiplication', function () {
			var a = new Vectorjs(2).set(1, 2);
			var b = new Vectorjs(2).set(1, 2);

			a.mul(a);

			expect(a).toBeCloseToVector(new Vectorjs(2).set(1, 4));
			expect(Vectorjs_mul(b, b)).toBeCloseToVector(new Vectorjs(2).set(1, 4));
		});
	});

	describe('div', function () {
		it('can perform division', function () {
			var a = new Vectorjs(2).set(1, 2);
			var b = new Vectorjs(2).set(1, 2);

			a.div(a);

			expect(a).toBeCloseToVector(new Vectorjs(2).set(1, 1));
			expect(Vectorjs_div(b, b)).toBeCloseToVector(new Vectorjs(2).set(1, 1));
		});
	});

	describe('copy', function () {
		it('can copy values', function () {
			var source = new Vectorjs(2).set(1, 2);
			var target = new Vectorjs(2);

			var result = target.copy(source);

			expect(target).toBeCloseToVector(new Vectorjs(2).set(1, 2));
			expect(result).toBe(target);
			expect(Vectorjs_copy(source)).toBeCloseToVector(new Vectorjs(2).set(1, 2));
		});
	});

	it('can calculate dot products', function () {
		var a = new Vectorjs(2).set(1, 2);
		var b = new Vectorjs(2).set(1, 2);

		expect(a.dot(b)).toEqual(5);
		expect(Vectorjs_dot(a, b)).toEqual(5);
	});

	it('can apply matrices', function () {
		var a = new Vectorjs(2).set(1, 2);
		var c = new Matrixjs(2, 2).set(1, 2, 3, 4);

		a.apply(c);

		expect(a).toBeCloseToVector(new Vectorjs(2).set(7, 10));
	});


	describe('equals', function () {
		it('can be tested for approximate equaltiy', function () {
			var a = new Vectorjs(2).set(1, 2);
			var b = new Vectorjs(2).set(1, 2);
			var c = new Vectorjs(2).set(2, 3);

			expect(a.equals(b)).toEqual(true);
			expect(Vectorjs_equals(a, b)).toEqual(true);
			expect(a.equals(c)).toEqual(false);
			expect(Vectorjs_equals(a, c)).toEqual(false);
		});

		it('preserves behaviour of comparing with NaN', function () {
			// 1 === NaN // false in JS, so (1, 2) === (1, NaN) should return the same
			var v1 = new Vectorjs(2).set(1, 2);
			var v2 = new Vectorjs(2).set(1, NaN);

			expect(v1.equals(v2)).toBeFalsy();
		});
	});

	it('can calculate lengths', function () {
		var a = new Vectorjs(2).set(3, 4);

		expect(a.length()).toEqual(5);
		expect(a.lengthSquared()).toEqual(25);
	});

	it('can calculate distances', function () {
		var a = new Vectorjs(2).set(3, 4);
		var b = new Vectorjs(2).set(6, 8);

		expect(a.distance(b)).toEqual(5);
		expect(Vectorjs_distance(a, b)).toEqual(5);
		expect(a.distanceSquared(b)).toEqual(25);
		expect(Vectorjs_distanceSquared(a, b)).toEqual(25);
	});

	it('can be inverted', function () {
		var a = new Vectorjs(2).set(1, 2);

		a.invert();

		expect(a).toBeCloseToVector(new Vectorjs(2).set(-1, -2));
	});

	it('can be normalized', function () {
		var a = new Vectorjs(2).set(3, 4);

		a.normalize();

		expect(a).toBeCloseToVector(new Vectorjs(2).set(0.6, 0.8));
	});

	it('can be cloned', function () {
		var a = new Vectorjs(2).set(1, 2);
		var b = a.clone();

		b.set(2, 3);

		expect(a).toBeCloseToVector(new Vectorjs(2).set(1, 2));
		expect(b).toBeCloseToVector(new Vectorjs(2).set(2, 3));
	});

	it('can be set', function () {
		var a = new Vectorjs(2).set(1, 2);
		var b = new Vectorjs(2).set([1, 2]);
		var c = new Vectorjs(2).set(a);

		expect(a).toBeCloseToVector(new Vectorjs(2).set(1, 2));
		expect(b).toBeCloseToVector(new Vectorjs(2).set(1, 2));
		expect(c).toBeCloseToVector(new Vectorjs(2).set(1, 2));
	});

	it('can be printed', function () {
		var a = new Vectorjs(2).set(1, 2);

		expect(a.toString()).toEqual('[1, 2]');
	});
});
