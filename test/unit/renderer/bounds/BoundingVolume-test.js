import { Vector3 as Vector3_Vector3 } from "../../../../src/goo/math/Vector3";
import { BoundingVolume as BoundingVolume_BoundingVolume } from "../../../../src/goo/renderer/bounds/BoundingVolume";
import { CustomMatchers as CustomMatchers_CustomMatchers } from "../../../../test/unit/CustomMatchers";

describe('BoundingVolume', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchers);
	});

	describe('copy', function () {
		it('can copy everything from another bounding box', function () {
			var original = new BoundingVolume_BoundingVolume(new Vector3_Vector3(1, 2, 3), 123, 234, 345);
			var copy = new BoundingVolume_BoundingVolume();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});
});
