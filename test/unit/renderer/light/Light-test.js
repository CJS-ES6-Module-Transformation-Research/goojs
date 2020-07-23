import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { Light as srcgoorendererlightLight_Lightjs } from "../../../../src/goo/renderer/light/Light";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('Light', function () {
	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	it('defaults the color to (1, 1, 1)', function () {
		var defaultColor = new srcgoomathVector3_Vector3js(1, 1, 1);
		var light = new srcgoorendererlightLight_Lightjs();

		expect(light.color).toBeCloseToVector(defaultColor);
	});

	it('gets the color from the first parameter passed to the constructor', function () {
		var color = new srcgoomathVector3_Vector3js(0.2, 0.3, 0.5);
		var light = new srcgoorendererlightLight_Lightjs(color);

		expect(light.color).toBeCloseToVector(color);
		expect(light.color).not.toBe(color);
	});
});
