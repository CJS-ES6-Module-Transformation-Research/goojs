var _Vector = require("../../../../src/goo/math/Vector3");

var _Light = require("../../../../src/goo/renderer/light/Light");

var _CustomMatchers = require("../../../../test/unit/CustomMatchers");

describe('Light', function () {
	beforeEach(function () {
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
	});

	it('defaults the color to (1, 1, 1)', function () {
		var defaultColor = new _Vector.Vector3(1, 1, 1);
		var light = new _Light.Light();

		expect(light.color).toBeCloseToVector(defaultColor);
	});

	it('gets the color from the first parameter passed to the constructor', function () {
		var color = new _Vector.Vector3(0.2, 0.3, 0.5);
		var light = new _Light.Light(color);

		expect(light.color).toBeCloseToVector(color);
		expect(light.color).not.toBe(color);
	});
});
