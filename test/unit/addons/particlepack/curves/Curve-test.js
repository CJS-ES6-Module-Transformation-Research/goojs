import { Curve as Curve_Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Curve";

describe('Curve', function () {
	it('.getValueAt', function () {
		var curve = new Curve_Curvejs();
		expect(curve.getValueAt(0)).toBe(0);
	});

	it('.toGLSL', function () {
		var curve = new Curve_Curvejs();
		expect(curve.toGLSL('t')).toBe('0.0');
	});
});