import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { PointLight as srcgoorendererlightPointLight_PointLightjs } from "../../../../src/goo/renderer/light/PointLight";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('PointLight', function () {
	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	it('gets the color from the first parameter passed to the constructor', function () {
		var color = new srcgoomathVector3_Vector3js(0.2, 0.3, 0.5);
		var light = new srcgoorendererlightPointLight_PointLightjs(color);

		expect(light.color).toBeCloseToVector(color);
		expect(light.color).not.toBe(color);
	});

	describe('copy', function () {
		it('can copy everything from another point light', function () {
			var original = new srcgoorendererlightPointLight_PointLightjs(new srcgoomathVector3_Vector3js(11, 22, 33));
			var copy = new srcgoorendererlightPointLight_PointLightjs(new srcgoomathVector3_Vector3js(44, 55, 66));
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a point light', function () {
			var original = new srcgoorendererlightPointLight_PointLightjs(new srcgoomathVector3_Vector3js(11, 22, 33));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
