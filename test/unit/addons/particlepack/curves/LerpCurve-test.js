import { ConstantCurve as ConstantCurve_ConstantCurvejs } from "../../../../../src/goo/addons/particlepack/curves/ConstantCurve";
import { LerpCurve as LerpCurve_LerpCurvejs } from "../../../../../src/goo/addons/particlepack/curves/LerpCurve";

describe('LerpCurve', function () {
	it('.getValueAt', function () {
		var curve = new LerpCurve_LerpCurvejs({
			curveA: new ConstantCurve_ConstantCurvejs({ value: 1 }),
			curveB: new ConstantCurve_ConstantCurvejs({ value: 2 })
		});

		expect(curve.getValueAt(0, 0.5)).toBe(1.5);
		expect(curve.getValueAt(0.5, 0.5)).toBe(1.5);
		expect(curve.getValueAt(1, 0.5)).toBe(1.5);
	});

	it('.getVec4IntegralValueAt', function () {
		var curve = new LerpCurve_LerpCurvejs({
			curveA: new ConstantCurve_ConstantCurvejs({ value: 1 }),
			curveB: new ConstantCurve_ConstantCurvejs({ value: 2 })
		});

		expect(curve.getIntegralValueAt(0, 0.5)).toBe(0);
		expect(curve.getIntegralValueAt(0.5, 0.5)).toBe(0.75);
		expect(curve.getIntegralValueAt(1, 0.5)).toBe(1.5);
	});

	it('.toGLSL', function () {
		var curve = new LerpCurve_LerpCurvejs({
			curveA: new ConstantCurve_ConstantCurvejs({ value: 1 }),
			curveB: new ConstantCurve_ConstantCurvejs({ value: 2 })
		});
		expect(curve.toGLSL('t', 'a')).toBe('mix(1.0,2.0,a)');
	});

	it('.integralToGLSL', function () {
		var curve = new LerpCurve_LerpCurvejs({
			curveA: new ConstantCurve_ConstantCurvejs({ value: 1 }),
			curveB: new ConstantCurve_ConstantCurvejs({ value: 2 })
		});
		expect(curve.integralToGLSL('t','a')).toBe('mix((1.0*t),(2.0*t),a)');
	});
});
