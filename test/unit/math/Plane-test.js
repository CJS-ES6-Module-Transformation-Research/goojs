import { Vector3 as Vector3_Vector3js } from "../../../src/goo/math/Vector3";
import { Plane as Plane_Planejs } from "../../../src/goo/math/Plane";
import { Ray as Ray_Rayjs } from "../../../src/goo/math/Ray";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";

describe('Plane', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	describe('constructor', function () {
		it('creates a new vector pointing upwards if no parameters were passed', function () {
			var plane = new Plane_Planejs();
			expect(plane.normal).toBeCloseToVector(Vector3_Vector3js.UNIT_Y);
			expect(plane.constant).toBeCloseTo(0);
		});
	});

	it('computes pseudodistance', function () {
		var p = new Plane_Planejs();
		var dist = p.pseudoDistance(new Vector3_Vector3js(0, 1, 0));
		expect(dist).toEqual(1);
	});

	it('can set from points', function () {
		var p = new Plane_Planejs();
		p.setPlanePoints(
			new Vector3_Vector3js(1, 0, 0),
			new Vector3_Vector3js(0, 1, 0),
			new Vector3_Vector3js(0, 0, 0)
		);
		expect(p.normal).toEqual(new Vector3_Vector3js(0, 0, 1));
	});

	it('can reflect vector', function () {
		var p = new Plane_Planejs();
		var store = new Vector3_Vector3js();
		p.reflectVector(new Vector3_Vector3js(0, 1, 0), store);
		expect(store).toEqual(new Vector3_Vector3js(0, -1, 0));

		// Without precreating store
		store = p.reflectVector(new Vector3_Vector3js(0, 1, 0));
		expect(store).toEqual(new Vector3_Vector3js(0, -1, 0));
	});

	it('can ray intersect', function () {
		var p = new Plane_Planejs(new Vector3_Vector3js(0, 1, 0), 1);
		var ray = new Ray_Rayjs(new Vector3_Vector3js(0, 0, 0), new Vector3_Vector3js(0, 1, 0));
		var store = new Vector3_Vector3js();
		p.rayIntersect(ray, store);
		expect(store).toEqual(new Vector3_Vector3js(0, 1, 0));

		ray.direction.setDirect(0, 0, 1);
		var result = p.rayIntersect(ray, store);
		expect(result).toBe(null);
	});

	describe('copy', function () {
		it('can copy everything from another plane', function () {
			var original = new Plane_Planejs(new Vector3_Vector3js(1, 2, 3), 123);
			var copy = new Plane_Planejs();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a plane', function () {
			var original = new Plane_Planejs(new Vector3_Vector3js(1, 2, 3), 123);
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
