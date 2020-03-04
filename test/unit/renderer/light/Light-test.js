import { Vector3 as Vector3js } from "../../../../src/goo/math/Vector3";
import { Light as Lightjs } from "../../../../src/goo/renderer/light/Light";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('Light', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	it('defaults the color to (1, 1, 1)', function () {
		var defaultColor = new Vector3js(1, 1, 1);
		var light = new Lightjs();

		expect(light.color).toBeCloseToVector(defaultColor);
	});

	it('gets the color from the first parameter passed to the constructor', function () {
		var color = new Vector3js(0.2, 0.3, 0.5);
		var light = new Lightjs(color);

		expect(light.color).toBeCloseToVector(color);
		expect(light.color).not.toBe(color);
	});
});
