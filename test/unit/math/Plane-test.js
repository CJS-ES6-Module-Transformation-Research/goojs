"use strict";

var _Vector = require("../../../src/goo/math/Vector3");

var _Plane = require("../../../src/goo/math/Plane");

var _Ray = require("../../../src/goo/math/Ray");

var _CustomMatchers = require("../../../test/unit/CustomMatchers");

describe('Plane', function () {
	beforeEach(function () {
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
	});

	describe('constructor', function () {
		it('creates a new vector pointing upwards if no parameters were passed', function () {
			var plane = new _Plane.Plane();
			expect(plane.normal).toBeCloseToVector(_Vector.Vector3.UNIT_Y);
			expect(plane.constant).toBeCloseTo(0);
		});
	});

	it('computes pseudodistance', function () {
		var p = new _Plane.Plane();
		var dist = p.pseudoDistance(new _Vector.Vector3(0, 1, 0));
		expect(dist).toEqual(1);
	});

	it('can set from points', function () {
		var p = new _Plane.Plane();
		p.setPlanePoints(new _Vector.Vector3(1, 0, 0), new _Vector.Vector3(0, 1, 0), new _Vector.Vector3(0, 0, 0));
		expect(p.normal).toEqual(new _Vector.Vector3(0, 0, 1));
	});

	it('can reflect vector', function () {
		var p = new _Plane.Plane();
		var store = new _Vector.Vector3();
		p.reflectVector(new _Vector.Vector3(0, 1, 0), store);
		expect(store).toEqual(new _Vector.Vector3(0, -1, 0));

		// Without precreating store
		store = p.reflectVector(new _Vector.Vector3(0, 1, 0));
		expect(store).toEqual(new _Vector.Vector3(0, -1, 0));
	});

	it('can ray intersect', function () {
		var p = new _Plane.Plane(new _Vector.Vector3(0, 1, 0), 1);
		var ray = new _Ray.Ray(new _Vector.Vector3(0, 0, 0), new _Vector.Vector3(0, 1, 0));
		var store = new _Vector.Vector3();
		p.rayIntersect(ray, store);
		expect(store).toEqual(new _Vector.Vector3(0, 1, 0));

		ray.direction.setDirect(0, 0, 1);
		var result = p.rayIntersect(ray, store);
		expect(result).toBe(null);
	});

	describe('copy', function () {
		it('can copy everything from another plane', function () {
			var original = new _Plane.Plane(new _Vector.Vector3(1, 2, 3), 123);
			var copy = new _Plane.Plane();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a plane', function () {
			var original = new _Plane.Plane(new _Vector.Vector3(1, 2, 3), 123);
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
