import { Vector3 as Vector3_Vector3 } from "../../../../src/goo/math/Vector3";
import { Light as Light_Light } from "../../../../src/goo/renderer/light/Light";
import { CustomMatchers as CustomMatchers_CustomMatchers } from "../../../../test/unit/CustomMatchers";

describe('Light', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchers);
	});

	it('defaults the color to (1, 1, 1)', function () {
		var defaultColor = new Vector3_Vector3(1, 1, 1);
		var light = new Light_Light();

		expect(light.color).toBeCloseToVector(defaultColor);
	});

	it('gets the color from the first parameter passed to the constructor', function () {
		var color = new Vector3_Vector3(0.2, 0.3, 0.5);
		var light = new Light_Light(color);

		expect(light.color).toBeCloseToVector(color);
		expect(light.color).not.toBe(color);
	});
});
