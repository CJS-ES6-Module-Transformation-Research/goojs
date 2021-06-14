import { Ray as Ray_Ray } from "../../../src/goo/math/Ray";
import { Plane as Plane_Plane } from "../../../src/goo/math/Plane";
import { Vector3 as Vector3_Vector3 } from "../../../src/goo/math/Vector3";
import { CustomMatchers as CustomMatchers_CustomMatchers } from "../../../test/unit/CustomMatchers";

describe('Ray', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchers);
	});

	describe('constructor', function () {
		it('creates a ray given no parameters', function () {
			var ray = new Ray_Ray();

			expect(ray.origin).toBeCloseToVector(Vector3_Vector3.ZERO);
			expect(ray.direction).toBeCloseToVector(Vector3_Vector3.UNIT_Z);
		});

		it('creates a ray given only the origin', function () {
			var origin = new Vector3_Vector3(1, 2, 3);
			var ray = new Ray_Ray(origin);

			expect(ray.origin).toBeCloseToVector(origin);
			expect(ray.origin).not.toBe(origin);

			expect(ray.direction).toBeCloseToVector(Vector3_Vector3.UNIT_Z);
		});

		it('creates a ray given the origin and direction', function () {
			var origin = new Vector3_Vector3(1, 2, 3);
			var direction = new Vector3_Vector3(123, 234, 345);
			var ray = new Ray_Ray(origin, direction);

			expect(ray.origin).toBeCloseToVector(origin);
			expect(ray.origin).not.toBe(origin);

			expect(ray.direction).toBeCloseToVector(direction);
			expect(ray.direction).not.toBe(direction);
		});
	});

	it('intersects triangle', function () {
		var ray = new Ray_Ray(new Vector3_Vector3(0, 0, -1), new Vector3_Vector3(0, 0, 1));
		var triangle = [
			new Vector3_Vector3(-0.1, -0.1, 0),
			new Vector3_Vector3(1.0, -0.1, 0),
			new Vector3_Vector3(1.0, 1.0, 0)
		];
		var store = new Vector3_Vector3(1, 1, 1);
		ray.intersects(triangle, false, store);
		expect(store).toEqual(new Vector3_Vector3(0, 0, 0));
	});

	it('intersects quad', function () {
		var ray = new Ray_Ray(new Vector3_Vector3(0, 0, -1), new Vector3_Vector3(0, 0, 1));
		var quad = [
			new Vector3_Vector3(-1, -1, 0),
			new Vector3_Vector3(1, -1, 0),
			new Vector3_Vector3(1, 1, 0),
			new Vector3_Vector3(-1, 1, 0)
		];
		var store = new Vector3_Vector3(1, 1, 1);
		ray.intersects(quad, false, store);
		expect(store).toEqual(new Vector3_Vector3(0, 0, 0));
	});

	describe('intersectsTriangle', function () {

	});

	describe('getDistanceToPrimitive', function () {

	});

	describe('intersectsPlane', function () {
		it('intersects a plane', function () {
			//! AT: split in 2
			var plane = new Plane_Plane(new Vector3_Vector3(1, 0, 0), 4);
			var parallelRay = new Ray_Ray(new Vector3_Vector3(0, 0, 0), new Vector3_Vector3(0, 1, 0));
			var intersectingRay = new Ray_Ray(new Vector3_Vector3(0, 0, 0), new Vector3_Vector3(1, 0, 0));

			var intersectionPoint = new Vector3_Vector3();

			expect(parallelRay.intersectsPlane(plane)).toBeFalsy();

			expect(intersectingRay.intersectsPlane(plane, intersectionPoint)).toBeTruthy();
			expect(intersectionPoint.equals(new Vector3_Vector3(4, 0, 0))).toBeTruthy();
		});
	});

	describe('distanceSquared', function () {
		it('computes the squared distance from a ray to a point', function () {
			//! AT: split in 2
			var ray = new Ray_Ray(new Vector3_Vector3(4, 0, 0), new Vector3_Vector3(0, 0, 1));
			var point = new Vector3_Vector3(1, 0, 10);
			var collinearPoint = new Vector3_Vector3(4, 0, 20);

			var closestPoint = new Vector3_Vector3();

			expect(ray.distanceSquared(point, closestPoint)).toBeCloseTo(Math.pow(3, 2));
			expect(closestPoint.equals(new Vector3_Vector3(4, 0, 10))).toBeTruthy();

			expect(ray.distanceSquared(collinearPoint, closestPoint)).toBeCloseTo(Math.pow(0, 2));
			expect(closestPoint.equals(new Vector3_Vector3(4, 0, 20))).toBeTruthy();
		});
	});

	describe('copy', function () {
		it('can copy everything from another ray', function () {
			var original = new Ray_Ray(new Vector3_Vector3(1, 2, 3), new Vector3_Vector3(4, 5, 6));
			var copy = new Ray_Ray();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a ray', function () {
			var original = new Ray_Ray(new Vector3_Vector3(1, 2, 3), new Vector3_Vector3(4, 5, 6));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
