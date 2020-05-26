import { Ray as srcgoomathRay_Rayjs } from "../../../src/goo/math/Ray";
import { Plane as srcgoomathPlane_Planejs } from "../../../src/goo/math/Plane";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../src/goo/math/Vector3";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";

describe('Ray', function () {
	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	describe('constructor', function () {
		it('creates a ray given no parameters', function () {
			var ray = new srcgoomathRay_Rayjs();

			expect(ray.origin).toBeCloseToVector(srcgoomathVector3_Vector3js.ZERO);
			expect(ray.direction).toBeCloseToVector(srcgoomathVector3_Vector3js.UNIT_Z);
		});

		it('creates a ray given only the origin', function () {
			var origin = new srcgoomathVector3_Vector3js(1, 2, 3);
			var ray = new srcgoomathRay_Rayjs(origin);

			expect(ray.origin).toBeCloseToVector(origin);
			expect(ray.origin).not.toBe(origin);

			expect(ray.direction).toBeCloseToVector(srcgoomathVector3_Vector3js.UNIT_Z);
		});

		it('creates a ray given the origin and direction', function () {
			var origin = new srcgoomathVector3_Vector3js(1, 2, 3);
			var direction = new srcgoomathVector3_Vector3js(123, 234, 345);
			var ray = new srcgoomathRay_Rayjs(origin, direction);

			expect(ray.origin).toBeCloseToVector(origin);
			expect(ray.origin).not.toBe(origin);

			expect(ray.direction).toBeCloseToVector(direction);
			expect(ray.direction).not.toBe(direction);
		});
	});

	it('intersects triangle', function () {
		var ray = new srcgoomathRay_Rayjs(new srcgoomathVector3_Vector3js(0, 0, -1), new srcgoomathVector3_Vector3js(0, 0, 1));
		var triangle = [
			new srcgoomathVector3_Vector3js(-0.1, -0.1, 0),
			new srcgoomathVector3_Vector3js(1.0, -0.1, 0),
			new srcgoomathVector3_Vector3js(1.0, 1.0, 0)
		];
		var store = new srcgoomathVector3_Vector3js(1, 1, 1);
		ray.intersects(triangle, false, store);
		expect(store).toEqual(new srcgoomathVector3_Vector3js(0, 0, 0));
	});

	it('intersects quad', function () {
		var ray = new srcgoomathRay_Rayjs(new srcgoomathVector3_Vector3js(0, 0, -1), new srcgoomathVector3_Vector3js(0, 0, 1));
		var quad = [
			new srcgoomathVector3_Vector3js(-1, -1, 0),
			new srcgoomathVector3_Vector3js(1, -1, 0),
			new srcgoomathVector3_Vector3js(1, 1, 0),
			new srcgoomathVector3_Vector3js(-1, 1, 0)
		];
		var store = new srcgoomathVector3_Vector3js(1, 1, 1);
		ray.intersects(quad, false, store);
		expect(store).toEqual(new srcgoomathVector3_Vector3js(0, 0, 0));
	});

	describe('intersectsTriangle', function () {

	});

	describe('getDistanceToPrimitive', function () {

	});

	describe('intersectsPlane', function () {
		it('intersects a plane', function () {
			//! AT: split in 2
			var plane = new srcgoomathPlane_Planejs(new srcgoomathVector3_Vector3js(1, 0, 0), 4);
			var parallelRay = new srcgoomathRay_Rayjs(new srcgoomathVector3_Vector3js(0, 0, 0), new srcgoomathVector3_Vector3js(0, 1, 0));
			var intersectingRay = new srcgoomathRay_Rayjs(new srcgoomathVector3_Vector3js(0, 0, 0), new srcgoomathVector3_Vector3js(1, 0, 0));

			var intersectionPoint = new srcgoomathVector3_Vector3js();

			expect(parallelRay.intersectsPlane(plane)).toBeFalsy();

			expect(intersectingRay.intersectsPlane(plane, intersectionPoint)).toBeTruthy();
			expect(intersectionPoint.equals(new srcgoomathVector3_Vector3js(4, 0, 0))).toBeTruthy();
		});
	});

	describe('distanceSquared', function () {
		it('computes the squared distance from a ray to a point', function () {
			//! AT: split in 2
			var ray = new srcgoomathRay_Rayjs(new srcgoomathVector3_Vector3js(4, 0, 0), new srcgoomathVector3_Vector3js(0, 0, 1));
			var point = new srcgoomathVector3_Vector3js(1, 0, 10);
			var collinearPoint = new srcgoomathVector3_Vector3js(4, 0, 20);

			var closestPoint = new srcgoomathVector3_Vector3js();

			expect(srcgoomathRay_Rayjs.distanceSquared(point, closestPoint)).toBeCloseTo(Math.pow(3, 2));
			expect(closestPoint.equals(new srcgoomathVector3_Vector3js(4, 0, 10))).toBeTruthy();

			expect(ray.distanceSquared(collinearPoint, closestPoint)).toBeCloseTo(Math.pow(0, 2));
			expect(closestPoint.equals(new srcgoomathVector3_Vector3js(4, 0, 20))).toBeTruthy();
		});
	});

	describe('copy', function () {
		it('can copy everything from another ray', function () {
			var original = new srcgoomathRay_Rayjs(new srcgoomathVector3_Vector3js(1, 2, 3), new srcgoomathVector3_Vector3js(4, 5, 6));
			var copy = new srcgoomathRay_Rayjs();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a ray', function () {
			var original = new srcgoomathRay_Rayjs(new srcgoomathVector3_Vector3js(1, 2, 3), new srcgoomathVector3_Vector3js(4, 5, 6));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
