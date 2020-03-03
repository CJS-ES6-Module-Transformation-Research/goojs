var _Vector = require("../../../../src/goo/math/Vector3");

var _BoundingVolume = require("../../../../src/goo/renderer/bounds/BoundingVolume");

var _CustomMatchers = require("../../../../test/unit/CustomMatchers");

describe('BoundingVolume', function () {
	beforeEach(function () {
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
	});

	describe('copy', function () {
		it('can copy everything from another bounding box', function () {
			var original = new _BoundingVolume.BoundingVolume(new _Vector.Vector3(1, 2, 3), 123, 234, 345);
			var copy = new _BoundingVolume.BoundingVolume();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});
});
