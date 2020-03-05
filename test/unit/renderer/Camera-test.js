import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";
import { Camera as Camera_Camerajs } from "../../../src/goo/renderer/Camera";
import { BoundingSphere as BoundingSphere_BoundingSpherejs } from "../../../src/goo/renderer/bounds/BoundingSphere";
import { BoundingBox as BoundingBox_BoundingBoxjs } from "../../../src/goo/renderer/bounds/BoundingBox";
import { Vector3 as Vector3_Vector3js } from "../../../src/goo/math/Vector3";

describe('Camera', function () {
	var camera;

	beforeEach(function () {
		camera = new Camera_Camerajs(90, 1, 1, 100);
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	it('can pack frustum around bounds', function () {
		var bound = new BoundingSphere_BoundingSpherejs();
		bound.radius = 10.0;
		bound.center.setDirect(0, 0, -20);

		camera.pack(bound);

		expect(camera._frustumNear).toBeCloseTo(10.0, 5);
		expect(camera._frustumFar).toBeCloseTo(30.0, 5);
		expect(camera._frustumLeft).toBeCloseTo(-10.0, 5);
		expect(camera._frustumBottom).toBeCloseTo(-10.0, 5);
		expect(camera._frustumTop).toBeCloseTo(10.0, 5);
		expect(camera._frustumRight).toBeCloseTo(10.0, 5);
	});

	it('can pick a ray', function () {
		var ray = camera.getPickRay(50, 50, 100, 100);
		expect(ray.origin).toBeCloseToVector(new Vector3_Vector3js(0, 0, -1)); // from nearplane (with negative z direction)
		expect(ray.direction).toBeCloseToVector(new Vector3_Vector3js(0, 0, -1));
	});

	it('can get the world position', function () {
		var vec = camera.getWorldPosition(25, 25, 100, 100, 10);
		expect(vec.z).toBeCloseTo(-10); // minus because Camera looks at negative z
	});

	it('can get the world coordinates', function () {
		var vec = camera.getWorldCoordinates(25, 25, 100, 100, 0.9091);
		expect(vec.z).toBeCloseTo(-10); // minus because Camera looks at negative z
	});

	it('can lookAt', function () {
		camera.lookAt(new Vector3_Vector3js(-1, 0, 0), Vector3_Vector3js.UNIT_Y);
		expect(camera.translation).toBeCloseToVector(new Vector3_Vector3js(0, 0, 0)); // from nearplane (with negative z direction)
		expect(camera._left).toBeCloseToVector(new Vector3_Vector3js(0, 0, 1)); // from nearplane (with negative z direction)
		expect(camera._up).toBeCloseToVector(new Vector3_Vector3js(0, 1, 0)); // from nearplane (with negative z direction)
		expect(camera._direction).toBeCloseToVector(new Vector3_Vector3js(-1, 0, 0)); // from nearplane (with negative z direction)
	});

	it('does correct intersection calculations against boundingbox and boundingsphere', function () {
		var tests = [
			[-10, 0, -10, Camera_Camerajs.Intersects], // place to intersect with left plane
			[10, 0, -10, Camera_Camerajs.Intersects], // place to intersect with right plane
			[0, 10, -10, Camera_Camerajs.Intersects], // place to intersect with top plane
			[0, -10, -10, Camera_Camerajs.Intersects], // place to intersect with bottom plane
			[0, 0, -1, Camera_Camerajs.Intersects], // place to intersect with near plane
			[0, 0, -100, Camera_Camerajs.Intersects], // place to intersect with far plane

			[0, 0, -10, Camera_Camerajs.Inside], // place to be inside

			[-100, 0, -10, Camera_Camerajs.Outside], // place to be outside left plane
			[100, 0, -10, Camera_Camerajs.Outside], // place to be outside right plane
			[0, 100, -10, Camera_Camerajs.Outside], // place to be outside top plane
			[0, -100, -10, Camera_Camerajs.Outside], // place to be outside bottom plane
			[0, 0, 10, Camera_Camerajs.Outside], // place to be outside near plane
			[0, 0, -1000, Camera_Camerajs.Outside] // place to be outside far plane
		];
		var testBounds = function (bounding, testdata) {
			for (var i = 0; i < testdata.length; i++) {
				var data = testdata[i];
				bounding.center.setDirect(data[0], data[1], data[2]);
				expect(camera.contains(bounding)).toBe(data[3]);
			}
		};
		testBounds(new BoundingBox_BoundingBoxjs(), tests);
		testBounds(new BoundingSphere_BoundingSpherejs(), tests);
	});

	it('can calculate corners of frustum', function () {
		var corners = camera.calculateFrustumCorners();
		expect(corners[0]).toBeCloseToVector(new Vector3_Vector3js(1, -1, -1));
		expect(corners[1]).toBeCloseToVector(new Vector3_Vector3js(-1, -1, -1));
		expect(corners[2]).toBeCloseToVector(new Vector3_Vector3js(-1, 1, -1));
		expect(corners[3]).toBeCloseToVector(new Vector3_Vector3js(1, 1, -1));
		expect(corners[4]).toBeCloseToVector(new Vector3_Vector3js(100, -100, -100));
		expect(corners[5]).toBeCloseToVector(new Vector3_Vector3js(-100, -100, -100));
		expect(corners[6]).toBeCloseToVector(new Vector3_Vector3js(-100, 100, -100));
		expect(corners[7]).toBeCloseToVector(new Vector3_Vector3js(100, 100, -100));
	});

	describe('setFrustumPerspective', function () {
		it('safely deals with far planes that are too near', function () {
			var near = 1;
			var far = 1;
			camera.setFrustumPerspective(45, 1, near, far);
			expect(camera._frustumFar - camera._frustumNear).toBeGreaterThan(0);
		});

		it('remembers the given bad values for the near and far planes', function () {
			var near = 1;
			var far = -1;
			camera.setFrustumPerspective(45, 1, near, far);
			expect(camera.near).toBeCloseTo(1);
			expect(camera.far).toBeCloseTo(-1);
		});
	});

	describe('setFrustum', function () {
		it('safely deals with far planes that are too near', function () {
			var near = 1;
			var far = 1;
			camera.setFrustum(near, far);
			expect(camera._frustumFar - camera._frustumNear).toBeGreaterThan(0);
		});

		it('remembers the given bad values for the near and far planes', function () {
			var near = 1;
			var far = -1;
			camera.setFrustum(near, far);
			expect(camera.near).toBeCloseTo(1);
			expect(camera.far).toBeCloseTo(-1);
		});
	});

	describe('copy', function () {
		it('can copy everything from another camera', function () {
			var original = new Camera_Camerajs(50, 2, 2, 2000);
			var copy = new Camera_Camerajs();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('clones a camera', function () {
			var original = new Camera_Camerajs(50, 2, 2, 2000);
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
