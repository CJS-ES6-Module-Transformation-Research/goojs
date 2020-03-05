import { Pool as Pool_Pooljs } from "../../../../../src/goo/addons/physicspack/util/Pool";
import { Vector3 as Vector3js } from "../../../../../src/goo/math/Vector3";
describe('Pool', function () {

	var Pool = Pool_Pooljs;
	var Vector3 = Vector3js;

	function createPool() {
		return new Pool_Pooljs({
			create: function () { return new Vector3js(); },
			init: Vector3js.prototype.setDirect,
			destroy: function (vector) { vector.setDirect(0, 0, 0); } // just for testing
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

		expect(vector).toEqual(new Vector3js(1, 2, 3));
	});

	it('can release', function () {
		var pool = createPool();
		var vector = pool.get(1, 2, 3);

		expect(pool._objects.length).toEqual(0);

		pool.release(vector);

		expect(pool._objects.length).toEqual(1);
		expect(vector).toEqual(new Vector3js(0, 0, 0));
	});

	it('can create', function () {
		var pool = createPool();

		var vector = pool._create();

		expect(vector).toEqual(new Vector3js());
		expect(pool._objects.length).toEqual(0);
	});

	it('can destroy', function () {
		var pool = createPool();
		var vector = pool._create(1, 2, 3);

		pool._destroy(vector);

		expect(vector).toEqual(new Vector3js(0, 0, 0));
		expect(pool._objects.length).toEqual(0);
	});
});
