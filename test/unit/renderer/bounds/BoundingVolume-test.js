import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { BoundingVolume as srcgoorendererboundsBoundingVolume_BoundingVolumejs } from "../../../../src/goo/renderer/bounds/BoundingVolume";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('BoundingVolume', function () {
	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	describe('copy', function () {
		it('can copy everything from another bounding box', function () {
			var original = new srcgoorendererboundsBoundingVolume_BoundingVolumejs(new srcgoomathVector3_Vector3js(1, 2, 3), 123, 234, 345);
			var copy = new srcgoorendererboundsBoundingVolume_BoundingVolumejs();
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});
});
