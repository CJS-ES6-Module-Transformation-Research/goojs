import { Vector3 as srcgoomathVector3_Vector3js } from "../../../src/goo/math/Vector3";
import { Plane as srcgoomathPlane_Planejs } from "../../../src/goo/math/Plane";
import { Ray as srcgoomathRay_Rayjs } from "../../../src/goo/math/Ray";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";

describe('Plane', function () {
	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	describe('constructor', function () {
		it('creates a new vector pointing upwards if no parameters were passed', function () {
			var plane = new srcgoomathPlane_Planejs();
			expect(plane.normal).toBeCloseToVector(srcgoomathVector3_Vector3js.UNIT_Y);
			expect(plane.constant).toBeCloseTo(0);
		});
	});

	it('computes pseudodistance', function () {
		var p = new srcgoomathPlane_Planejs();
		var dist = p.pseudoDistance(new srcgoomathVector3_Vector3js(0, 1, 0));
		expect(dist).toEqual(1);
	});

	it('can set from points', function () {
		var p = new srcgoomathPlane_Planejs();
		p.setPlanePoints(
			new srcgoomathVector3_Vector3js(1, 0, 0),
			new srcgoomathVector3_Vector3js(0, 1, 0),
			new srcgoomathVector3_Vector3js(0, 0, 0)
		);
		expect(p.normal).toEqual(new srcgoomathVector3_Vector3js(0, 0, 1));
	});

	it('can reflect vector', function () {
		var p = new srcgoomathPlane_Planejs();
		var store = new srcgoomathVector3_Vector3js();
		p.reflectVector(new srcgoomathVector3_Vector3js(0, 1, 0), store);
		expect(store).toEqual(new srcgoomathVector3_Vector3js(0, -1, 0));

		// Without precreating store
		store = p.reflectVector(new srcgoomathVector3_Vector3js(0, 1, 0));
		expect(store).toEqual(new srcgoomathVector3_Vector3js(0, -1, 0));
	});

	it('can ray intersect', function () {
		var p = new srcgoomathPlane_Planejs(new srcgoomathVector3_Vector3js(0, 1, 0), 1);
		var ray = new srcgoomathRay_Rayjs(new srcgoomathVector3_Vector3js(0, 0, 0), new srcgoomathVector3_Vector3js(0, 1, 0));
		var store = new srcgoomathVector3_Vector3js();
		p.rayIntersect(ray, store);
		expect(store).toEqual(new srcgoomathVector3_Vector3js(0, 1, 0));

		ray.direction.setDirect(0, 0, 1);
		var result = p.rayIntersect(ray, store);
		expect(result).toBe(null);
	});

	describe('copy', function () {
		it('can copy everything from another plane', function () {
			var original = new srcgoomathPlane_Planejs(new srcgoomathVector3_Vector3js(1, 2, 3), 123);
			var copy = new srcgoomathPlane_Planejs();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a plane', function () {
			var original = new srcgoomathPlane_Planejs(new srcgoomathVector3_Vector3js(1, 2, 3), 123);
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
