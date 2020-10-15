import { Curve as srcgooaddonsparticlepackcurvesCurve_Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Curve";

describe('Curve', function () {
	it('.getValueAt', function () {
		var curve = new srcgooaddonsparticlepackcurvesCurve_Curvejs();
		expect(curve.getValueAt(0)).toBe(0);
	});

	it('.toGLSL', function () {
		var curve = new srcgooaddonsparticlepackcurvesCurve_Curvejs();
		expect(curve.toGLSL('t')).toBe('0.0');
	});
});