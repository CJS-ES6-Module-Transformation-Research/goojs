import { Vector3 as Vector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { BoundingBox as BoundingBox_BoundingBoxjs } from "../../../../src/goo/renderer/bounds/BoundingBox";
import { BoundingSphere as BoundingSphere_BoundingSpherejs } from "../../../../src/goo/renderer/bounds/BoundingSphere";
import { MeshData as MeshData_MeshDatajs } from "../../../../src/goo/renderer/MeshData";
import { Box as Box_Boxjs } from "../../../../src/goo/shapes/Box";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('BoundingBox', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	describe('containsPoint', function () {
		it('returns false for an outside point', function () {
			var boundingBox = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(10, 20, 30), 2, 2, 2);
			expect(boundingBox.containsPoint(new Vector3_Vector3js(31, 19, 11))).toBeFalsy();
		});

		it('returns true for a point on the edge of the bounding volume (one of the corners)', function () {
			var boundingBox = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(10, 20, 30), 2, 2, 2);
			expect(boundingBox.containsPoint(new Vector3_Vector3js(11, 19, 31))).toBeTruthy();
		});

		it('returns true for an inside point', function () {
			var boundingBox = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(10, 20, 30), 2, 2, 2);
			expect(boundingBox.containsPoint(new Vector3_Vector3js(10, 20, 30))).toBeTruthy();
		});
	});

	describe('computeFromPoints', function () {
		function buildCustomTriangle(verts) {
			var indices = [];
			indices.push(0, 1, 2);

			var meshData = new MeshData_MeshDatajs(MeshData_MeshDatajs.defaultMap([MeshData_MeshDatajs.POSITION]), 3, indices.length);

			meshData.getAttributeBuffer(MeshData_MeshDatajs.POSITION).set(verts);
			meshData.getIndexBuffer().set(indices);

			meshData.indexLengths = [3];
			meshData.indexModes = ['Triangles'];

			return meshData;
		}

		it('computes the center of the bounding box from verts (of default box)', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs();

			var boxMeshData = new Box_Boxjs();
			boundingBox1.computeFromPoints(boxMeshData.dataViews.POSITION);
			expect(boundingBox1.center).toBeCloseToVector(new Vector3_Vector3js(0, 0, 0));
		});

		it('computes the center of the bounding box from verts (of custom triangle)', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs();
			var triangleMeshData = buildCustomTriangle([0, -5, 10, 2, 5, 20, 0, 1, 11]);
			boundingBox1.computeFromPoints(triangleMeshData.dataViews.POSITION);
			expect(boundingBox1.center).toBeCloseToVector(new Vector3_Vector3js(1, 0, 15));
		});

		it('computes max & min of the bounding box from verts (of default box)', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs();
			var boxMeshData = new Box_Boxjs();
			boundingBox1.computeFromPoints(boxMeshData.dataViews.POSITION);
			expect(boundingBox1.min).toBeCloseToVector(new Vector3_Vector3js(-0.5, -0.5, -0.5));
			expect(boundingBox1.max).toBeCloseToVector(new Vector3_Vector3js(0.5, 0.5, 0.5));
		});

		it('computes max & min of the bounding box from verts (of custom triangle)', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs();
			var triangleMeshData = buildCustomTriangle([0, -5, 10, 2, 5, 20, 0, 1, 11]);
			boundingBox1.computeFromPoints(triangleMeshData.dataViews.POSITION);
			expect(boundingBox1.min).toBeCloseToVector(new Vector3_Vector3js(0, -5, 10));
			expect(boundingBox1.max).toBeCloseToVector(new Vector3_Vector3js(2, 5, 20));
		});

		it('computes x/y/zExtent of the bounding box from verts (of default box)', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs();
			var boxMeshData = new Box_Boxjs();
			boundingBox1.computeFromPoints(boxMeshData.dataViews.POSITION);
			expect(boundingBox1.xExtent).toBeCloseTo(0.5);
			expect(boundingBox1.yExtent).toBeCloseTo(0.5);
			expect(boundingBox1.zExtent).toBeCloseTo(0.5);
		});

		it('computes x/y/zExtent of the bounding box from verts (of custom triangle)', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs();
			var triangleMeshData = buildCustomTriangle([0, -5, 10, 2, 5, 20, 0, 1, 11]);
			boundingBox1.computeFromPoints(triangleMeshData.dataViews.POSITION);
			expect(boundingBox1.xExtent).toBeCloseTo(1);
			expect(boundingBox1.yExtent).toBeCloseTo(5);
			expect(boundingBox1.zExtent).toBeCloseTo(5);
		});
	});

	describe('merge', function () {
		it('merges two identical overlapping boxes', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(0, 0, 0), 2, 3, 4);
			var boundingBox2 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(0, 0, 0), 2, 3, 4);

			var mergedBoundingBox = boundingBox1.merge(boundingBox2);
			expect(mergedBoundingBox.center).toBeCloseToVector(new Vector3_Vector3js(0, 0, 0));
			expect(mergedBoundingBox.xExtent).toBeCloseTo(2);
			expect(mergedBoundingBox.yExtent).toBeCloseTo(3);
			expect(mergedBoundingBox.zExtent).toBeCloseTo(4);
		});

		it('merges two intersecting boxes', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(-5, -5, -5), 10, 10, 10);
			var boundingBox2 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(10, 10, 10), 10, 10, 10);

			var mergedBoundingBox = boundingBox1.merge(boundingBox2);
			expect(mergedBoundingBox.center).toBeCloseToVector(new Vector3_Vector3js((-15 + 20) / 2, (-15 + 20) / 2, (-15 + 20) / 2));
			expect(mergedBoundingBox.xExtent).toBeCloseTo(35 / 2);
			expect(mergedBoundingBox.yExtent).toBeCloseTo(35 / 2);
			expect(mergedBoundingBox.zExtent).toBeCloseTo(35 / 2);
		});

		it('merges two nonintersecting boxes', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(-10, -10, -10), 5, 5, 5);
			var boundingBox2 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(20, 20, 20), 10, 10, 10);

			var mergedBoundingBox = boundingBox1.merge(boundingBox2);
			expect(mergedBoundingBox.center).toBeCloseToVector(new Vector3_Vector3js((-15 + 30) / 2, (-15 + 30) / 2, (-15 + 30) / 2));
			expect(mergedBoundingBox.xExtent).toBeCloseTo(45 / 2);
			expect(mergedBoundingBox.yExtent).toBeCloseTo(45 / 2);
			expect(mergedBoundingBox.zExtent).toBeCloseTo(45 / 2);
		});
	});

	describe('intersects', function () {
		it('intersects a bounding box', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(0, 0, 0), 10, 10, 10);
			var boundingBox2 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(20, 20, 20), 11, 11, 11);

			expect(boundingBox1.intersects(boundingBox2)).toBeTruthy();
		});

		it('does not intersect a bounding box', function () {
			var boundingBox1 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(0, 0, 0), 10, 10, 10);
			var boundingBox2 = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(20, 20, 20), 9, 11, 11);

			expect(boundingBox1.intersects(boundingBox2)).toBeFalsy();
		});

		it('intersects a bounding sphere', function () {
			var boundingBox = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(0, 0, 0), 10, 10, 10);
			var boundingSphere = new BoundingSphere_BoundingSpherejs(new Vector3_Vector3js(20, 20, 0), 15);

			expect(boundingBox.intersects(boundingSphere)).toBeTruthy();
		});

		it('does not intersect a bounding sphere', function () {
			var boundingBox = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(0, 0, 0), 10, 10, 10);
			var boundingSphere = new BoundingSphere_BoundingSpherejs(new Vector3_Vector3js(20, 20, 0), 12);
			// the distance between bounding box and the bounding sphere should be 12 - sqrt(10*10*2) < 0

			expect(boundingBox.intersects(boundingSphere)).toBeFalsy();
		});
	});

	describe('copy', function () {
		it('can copy everything from another bounding box', function () {
			var original = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(1, 2, 3), 123, 234, 345);
			var copy = new BoundingBox_BoundingBoxjs();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('clones a bounding box', function () {
			var original = new BoundingBox_BoundingBoxjs(new Vector3_Vector3js(1, 2, 3), 123, 234, 345);
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
