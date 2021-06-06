import { Vector3 as Vector3_Vector3 } from "../../../../src/goo/math/Vector3";
import { PointLight as PointLight_PointLight } from "../../../../src/goo/renderer/light/PointLight";
import { CustomMatchers as CustomMatchers_CustomMatchers } from "../../../../test/unit/CustomMatchers";

describe('PointLight', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchers);
	});

	it('gets the color from the first parameter passed to the constructor', function () {
		var color = new Vector3_Vector3(0.2, 0.3, 0.5);
		var light = new PointLight_PointLight(color);

		expect(light.color).toBeCloseToVector(color);
		expect(light.color).not.toBe(color);
	});

	describe('copy', function () {
		it('can copy everything from another point light', function () {
			var original = new PointLight_PointLight(new Vector3_Vector3(11, 22, 33));
			var copy = new PointLight_PointLight(new Vector3_Vector3(44, 55, 66));
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a point light', function () {
			var original = new PointLight_PointLight(new Vector3_Vector3(11, 22, 33));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
