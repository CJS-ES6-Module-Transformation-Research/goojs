import { ArrayUtils as srcgooutilArrayUtils_ArrayUtilsjs } from "../../../src/goo/util/ArrayUtils";

describe('ArrayUtils', function () {
	describe('fromKeys', function () {
		it('returns an empty array for an empty collection', function () {
			var set_ = new Set();
			var map = new Map();

			var setKeys = srcgooutilArrayUtils_ArrayUtilsjs.fromKeys(set_);
			var mapKeys = srcgooutilArrayUtils_ArrayUtilsjs.fromKeys(map);

			expect(setKeys).toEqual([]);
			expect(mapKeys).toEqual([]);
		});

		it('returns an array of keys of the given collection', function () {
			var set_ = new Set();
			set_.add('a');
			set_.add('s');
			set_.add('d');

			var map = new Map();
			map.set('f', 'ff');
			map.set('g', 'gg');
			map.set('h', 'hh');

			var setKeys = srcgooutilArrayUtils_ArrayUtilsjs.fromKeys(set_);
			var mapKeys = srcgooutilArrayUtils_ArrayUtilsjs.fromKeys(map);

			expect(setKeys).toEqual(['a', 's', 'd']);
			expect(mapKeys).toEqual(['f', 'g', 'h']);
		});
	});

	describe('fromValues', function () {
		it('returns an empty array for an empty collection', function () {
			var set_ = new Set();
			var map = new Map();

			var setKeys = srcgooutilArrayUtils_ArrayUtilsjs.fromValues(set_);
			var mapKeys = srcgooutilArrayUtils_ArrayUtilsjs.fromValues(map);

			expect(setKeys).toEqual([]);
			expect(mapKeys).toEqual([]);
		});

		it('returns an array of keys of the given collection', function () {
			var set_ = new Set();
			set_.add('a');
			set_.add('s');
			set_.add('d');

			var map = new Map();
			map.set('f', 'ff');
			map.set('g', 'gg');
			map.set('h', 'hh');

			var setKeys = srcgooutilArrayUtils_ArrayUtilsjs.fromValues(set_);
			var mapKeys = srcgooutilArrayUtils_ArrayUtilsjs.fromValues(map);

			expect(setKeys).toEqual(['a', 's', 'd']);
			expect(mapKeys).toEqual(['ff', 'gg', 'hh']);
		});
	});
});
