import { PolyCurve as srcgooaddonsparticlepackcurvesPolyCurve_PolyCurvejs } from "../../../../../src/goo/addons/particlepack/curves/PolyCurve";
import { Curve as srcgooaddonsparticlepackcurvesCurve_Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Curve";
import { LinearCurve as srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs } from "../../../../../src/goo/addons/particlepack/curves/LinearCurve";

describe('PolyCurve', function () {
	it('can add a segment', function () {
		var set = new srcgooaddonsparticlepackcurvesPolyCurve_PolyCurvejs();
		var curve = new srcgooaddonsparticlepackcurvesCurve_Curvejs();
		set.addSegment(curve);
		expect(set.segments.length).toBe(1);
	});

	it('.getValueAt', function () {

		it('can get a value from multiple curve types', function () {
			var set = new srcgooaddonsparticlepackcurvesPolyCurve_PolyCurvejs();
			var curve = new srcgooaddonsparticlepackcurvesCurve_Curvejs();
			set.addSegment(curve);
			expect(set.getValueAt(0.5)).toBe(0);
		});

		it('can get a value from multiple curve types', function () {
			var set = new srcgooaddonsparticlepackcurvesPolyCurve_PolyCurvejs();
			set.addSegment(new srcgooaddonsparticlepackcurvesCurve_Curvejs({ timeOffset: 0 }));
			set.addSegment(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ timeOffset: 0.5, k: 1, m: 0 }));
			expect(set.getValueAt(0)).toBe(0);
			expect(set.getValueAt(1)).toBe(0.5);
		});
	});

	it('.getIntegralValueAt', function () {
		var set = new srcgooaddonsparticlepackcurvesPolyCurve_PolyCurvejs();
		var curve = new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ timeOffset: 0, k: 1, m: 0 });
		set.addSegment(curve);
		expect(set.getIntegralValueAt(0.5)).toBe(0.125);
	});

	it('.toGLSL', function () {
		var set = new srcgooaddonsparticlepackcurvesPolyCurve_PolyCurvejs();
		set.addSegment(new srcgooaddonsparticlepackcurvesCurve_Curvejs({ timeOffset: 0 }));
		set.addSegment(new srcgooaddonsparticlepackcurvesCurve_Curvejs({ timeOffset: 0.5 }));
		expect(set.toGLSL('t','lerp')).toBe('step(0.0,t)*step(-0.5,-t)*0.0+step(0.5,t)*step(-1.0,-t)*0.0');
	});

	it('.integralToGLSL', function () {
		var set = new srcgooaddonsparticlepackcurvesPolyCurve_PolyCurvejs();
		set.addSegment(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ timeOffset: 0, k: 1, m: 0 }));
		expect(set.integralToGLSL('t','lerp')).toBe('(1.0*clamp(t,0.0,1.0)*clamp(t,0.0,1.0)*0.5+0.0*clamp(t,0.0,1.0))');
	});
});
