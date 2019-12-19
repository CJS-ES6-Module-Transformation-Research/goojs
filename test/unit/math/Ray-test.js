var _Ray = require("../../../src/goo/math/Ray");

var _Plane = require("../../../src/goo/math/Plane");

var _Vector = require("../../../src/goo/math/Vector3");

var CustomMatchers = require('../../../test/unit/CustomMatchers');

describe('Ray', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers);
	});

	describe('constructor', function () {
		it('creates a ray given no parameters', function () {
			var ray = new _Ray.Ray();

			expect(ray.origin).toBeCloseToVector(_Vector.Vector3.ZERO);
			expect(ray.direction).toBeCloseToVector(_Vector.Vector3.UNIT_Z);
		});

		it('creates a ray given only the origin', function () {
			var origin = new _Vector.Vector3(1, 2, 3);
			var ray = new _Ray.Ray(origin);

			expect(ray.origin).toBeCloseToVector(origin);
			expect(ray.origin).not.toBe(origin);

			expect(ray.direction).toBeCloseToVector(_Vector.Vector3.UNIT_Z);
		});

		it('creates a ray given the origin and direction', function () {
			var origin = new _Vector.Vector3(1, 2, 3);
			var direction = new _Vector.Vector3(123, 234, 345);
			var ray = new _Ray.Ray(origin, direction);

			expect(ray.origin).toBeCloseToVector(origin);
			expect(ray.origin).not.toBe(origin);

			expect(ray.direction).toBeCloseToVector(direction);
			expect(ray.direction).not.toBe(direction);
		});
	});

	it('intersects triangle', function () {
		var ray = new _Ray.Ray(new _Vector.Vector3(0, 0, -1), new _Vector.Vector3(0, 0, 1));
		var triangle = [new _Vector.Vector3(-0.1, -0.1, 0), new _Vector.Vector3(1.0, -0.1, 0), new _Vector.Vector3(1.0, 1.0, 0)];
		var store = new _Vector.Vector3(1, 1, 1);
		ray.intersects(triangle, false, store);
		expect(store).toEqual(new _Vector.Vector3(0, 0, 0));
	});

	it('intersects quad', function () {
		var ray = new _Ray.Ray(new _Vector.Vector3(0, 0, -1), new _Vector.Vector3(0, 0, 1));
		var quad = [new _Vector.Vector3(-1, -1, 0), new _Vector.Vector3(1, -1, 0), new _Vector.Vector3(1, 1, 0), new _Vector.Vector3(-1, 1, 0)];
		var store = new _Vector.Vector3(1, 1, 1);
		ray.intersects(quad, false, store);
		expect(store).toEqual(new _Vector.Vector3(0, 0, 0));
	});

	describe('intersectsTriangle', function () {});

	describe('getDistanceToPrimitive', function () {});

	describe('intersectsPlane', function () {
		it('intersects a plane', function () {
			//! AT: split in 2
			var plane = new _Plane.Plane(new _Vector.Vector3(1, 0, 0), 4);
			var parallelRay = new _Ray.Ray(new _Vector.Vector3(0, 0, 0), new _Vector.Vector3(0, 1, 0));
			var intersectingRay = new _Ray.Ray(new _Vector.Vector3(0, 0, 0), new _Vector.Vector3(1, 0, 0));

			var intersectionPoint = new _Vector.Vector3();

			expect(parallelRay.intersectsPlane(plane)).toBeFalsy();

			expect(intersectingRay.intersectsPlane(plane, intersectionPoint)).toBeTruthy();
			expect(intersectionPoint.equals(new _Vector.Vector3(4, 0, 0))).toBeTruthy();
		});
	});

	describe('distanceSquared', function () {
		it('computes the squared distance from a ray to a point', function () {
			//! AT: split in 2
			var ray = new _Ray.Ray(new _Vector.Vector3(4, 0, 0), new _Vector.Vector3(0, 0, 1));
			var point = new _Vector.Vector3(1, 0, 10);
			var collinearPoint = new _Vector.Vector3(4, 0, 20);

			var closestPoint = new _Vector.Vector3();

			expect(ray.distanceSquared(point, closestPoint)).toBeCloseTo(Math.pow(3, 2));
			expect(closestPoint.equals(new _Vector.Vector3(4, 0, 10))).toBeTruthy();

			expect(ray.distanceSquared(collinearPoint, closestPoint)).toBeCloseTo(Math.pow(0, 2));
			expect(closestPoint.equals(new _Vector.Vector3(4, 0, 20))).toBeTruthy();
		});
	});

	describe('copy', function () {
		it('can copy everything from another ray', function () {
			var original = new _Ray.Ray(new _Vector.Vector3(1, 2, 3), new _Vector.Vector3(4, 5, 6));
			var copy = new _Ray.Ray();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a ray', function () {
			var original = new _Ray.Ray(new _Vector.Vector3(1, 2, 3), new _Vector.Vector3(4, 5, 6));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
