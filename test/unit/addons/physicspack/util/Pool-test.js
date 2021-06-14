"use strict";

var _Pool = require("../../../../../src/goo/addons/physicspack/util/Pool");

var _Vector = require("../../../../../src/goo/math/Vector3");

describe('Pool', function () {
		function createPool() {
				return new _Pool.Pool({
						create: function create() {
								return new _Vector.Vector3();
						},
						init: _Vector.Vector3.prototype.setDirect,
						destroy: function destroy(vector) {
								vector.setDirect(0, 0, 0);
						} // just for testing
				});
		}

		it('can resize', function () {
				var pool = createPool();

				pool.resize(10);

				expect(pool._objects.length).toEqual(10);
		});

		it('can get', function () {
				var pool = createPool();

				var vector = pool.get(1, 2, 3);

				expect(vector).toEqual(new _Vector.Vector3(1, 2, 3));
		});

		it('can release', function () {
				var pool = createPool();
				var vector = pool.get(1, 2, 3);

				expect(pool._objects.length).toEqual(0);

				pool.release(vector);

				expect(pool._objects.length).toEqual(1);
				expect(vector).toEqual(new _Vector.Vector3(0, 0, 0));
		});

		it('can create', function () {
				var pool = createPool();

				var vector = pool._create();

				expect(vector).toEqual(new _Vector.Vector3());
				expect(pool._objects.length).toEqual(0);
		});

		it('can destroy', function () {
				var pool = createPool();
				var vector = pool._create(1, 2, 3);

				pool._destroy(vector);

				expect(vector).toEqual(new _Vector.Vector3(0, 0, 0));
				expect(pool._objects.length).toEqual(0);
		});
});