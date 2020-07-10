import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { BoundingSphere as srcgoorendererboundsBoundingSphere_BoundingSpherejs } from "../../../../src/goo/renderer/bounds/BoundingSphere";
import { BoundingBox as srcgoorendererboundsBoundingBox_BoundingBoxjs } from "../../../../src/goo/renderer/bounds/BoundingBox";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('BoundingSphere', function () {
	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	describe('containsPoint', function () {
		it('returns false for an outside point', function () {
			var boundingSphere = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(10, 20, 30), 2);
			expect(boundingSphere.containsPoint(new srcgoomathVector3_Vector3js(31, 19, 11))).toBeFalsy();
		});

		it('returns true for a point on the edge', function () {
			var boundingSphere = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(10, 20, 30), 2);
			expect(boundingSphere.containsPoint(new srcgoomathVector3_Vector3js(12, 20, 30))).toBeTruthy();
		});

		it('returns true for an inside point', function () {
			var boundingSphere = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(10, 20, 30), 2);
			expect(boundingSphere.containsPoint(new srcgoomathVector3_Vector3js(10, 20, 30))).toBeTruthy();
		});
	});

	describe('merge', function () {
		it('merges two identical overlapping spheres', function () {
			var boundingSphere1 = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(3, 2, 1), 5);
			var boundingSphere2 = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(3, 2, 1), 2);

			var mergedBoundingSphere = boundingSphere1.merge(boundingSphere2);
			expect(mergedBoundingSphere.center).toBeCloseToVector(new srcgoomathVector3_Vector3js(3, 2, 1));
			expect(mergedBoundingSphere.radius).toBeCloseTo(5);
		});

		it('merges two intersecting spheres', function () {
			var boundingSphere1 = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(-20, 0, 0), 4);
			var boundingSphere2 = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js( 10, 0, 0), 8);

			var mergedBoundingSphere = boundingSphere1.merge(boundingSphere2);
			expect(mergedBoundingSphere.center).toBeCloseToVector(new srcgoomathVector3_Vector3js((-20 - 4 + 10 + 8) / 2, 0, 0));
			expect(mergedBoundingSphere.radius).toBeCloseTo((10 + 8 - (-20 - 4)) / 2);
		});
	});

	describe('intersects', function () {
		it('intersects a bounding box', function () {
			var boundingSphere = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(20, 20, 0), 15);
			var boundingBox = new srcgoorendererboundsBoundingBox_BoundingBoxjs(new srcgoomathVector3_Vector3js(0, 0, 0), 10, 10, 10);

			expect(boundingSphere.intersects(boundingBox)).toBeTruthy();
		});

		it('does not intersect a bounding box', function () {
			var boundingSphere = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(20, 20, 0), 12);
			var boundingBox = new srcgoorendererboundsBoundingBox_BoundingBoxjs(new srcgoomathVector3_Vector3js(0, 0, 0), 10, 10, 10);
			// the distance between bounding box and the bounding sphere should be 12 - sqrt(10*10*2) < 0

			expect(boundingSphere.intersects(boundingBox)).toBeFalsy();
		});

		it('intersects a bounding sphere', function () {
			var boundingSphere1 = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(2 * 1, 3 * 1, 6 * 1), 7);
			var boundingSphere2 = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(2 * 3, 3 * 3, 6 * 3), 7);

			expect(boundingSphere1.intersects(boundingSphere2)).toBeTruthy();
		});

		it('does not intersect a bounding sphere', function () {
			var boundingSphere1 = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(2 * 1, 3 * 1, 6 * 1), 6);
			var boundingSphere2 = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(2 * 3, 3 * 3, 6 * 3), 7);

			expect(boundingSphere1.intersects(boundingSphere2)).toBeFalsy();
		});
	});

	describe('copy', function () {
		it('can copy everything from another bounding sphere', function () {
			var original = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(1, 2, 3), 123);
			var copy = new srcgoorendererboundsBoundingSphere_BoundingSpherejs();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('clones a bounding sphere', function () {
			var original = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(1, 2, 3), 123);
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
