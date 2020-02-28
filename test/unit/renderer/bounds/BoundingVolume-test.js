import { Vector3 as Vector3js } from "../../../../src/goo/math/Vector3";
import { BoundingVolume as BoundingVolume_BoundingVolumejs } from "../../../../src/goo/renderer/bounds/BoundingVolume";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('BoundingVolume', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	describe('copy', function () {
		it('can copy everything from another bounding box', function () {
			var original = new BoundingVolume_BoundingVolumejs(new Vector3js(1, 2, 3), 123, 234, 345);
			var copy = new BoundingVolume_BoundingVolumejs();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});
});
