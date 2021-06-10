import { Vector4Curve as Vector4Curve_Vector4Curve } from "../../../../../src/goo/addons/particlepack/curves/Vector4Curve";
import { ConstantCurve as ConstantCurve_ConstantCurve } from "../../../../../src/goo/addons/particlepack/curves/ConstantCurve";
import { Vector4 as Vector4_Vector4 } from "../../../../../src/goo/math/Vector4";

describe('Vector4Curve', function () {
	it('.getVec4ValueAt', function () {
		var curve = new Vector4Curve_Vector4Curve({
			x: new ConstantCurve_ConstantCurve({ value: 1 }),
			y: new ConstantCurve_ConstantCurve({ value: 2 }),
			z: new ConstantCurve_ConstantCurve({ value: 3 }),
			w: new ConstantCurve_ConstantCurve({ value: 4 })
		});
		var store0 = new Vector4_Vector4();
		var store1 = new Vector4_Vector4();
		var store2 = new Vector4_Vector4();

		curve.getVec4ValueAt(0, 0, store0);
		curve.getVec4ValueAt(0.5, 0, store1);
		curve.getVec4ValueAt(1, 0, store2);

		expect(store0).toEqual(new Vector4_Vector4(1, 2, 3, 4));
		expect(store1).toEqual(new Vector4_Vector4(1, 2, 3, 4));
		expect(store2).toEqual(new Vector4_Vector4(1, 2, 3, 4));
	});

	it('.getVec4IntegralValueAt', function () {
		var curve = new Vector4Curve_Vector4Curve({
			x: new ConstantCurve_ConstantCurve({ value: 1 }),
			y: new ConstantCurve_ConstantCurve({ value: 2 }),
			z: new ConstantCurve_ConstantCurve({ value: 3 }),
			w: new ConstantCurve_ConstantCurve({ value: 4 })
		});
		var store0 = new Vector4_Vector4();
		var store1 = new Vector4_Vector4();
		var store2 = new Vector4_Vector4();

		curve.getVec4IntegralValueAt(0, 0, store0);
		curve.getVec4IntegralValueAt(0.5, 0, store1);
		curve.getVec4IntegralValueAt(1, 0, store2);

		expect(store0).toEqual(new Vector4_Vector4(0, 0, 0, 0));
		expect(store1).toEqual(new Vector4_Vector4(0.5, 1, 1.5, 2));
		expect(store2).toEqual(new Vector4_Vector4(1, 2, 3, 4));
	});

	it('.toGLSL', function () {
		var curve = new Vector4Curve_Vector4Curve({
			x: new ConstantCurve_ConstantCurve({ value: 1 }),
			y: new ConstantCurve_ConstantCurve({ value: 2 }),
			z: new ConstantCurve_ConstantCurve({ value: 3 }),
			w: new ConstantCurve_ConstantCurve({ value: 4 })
		});
		expect(curve.toGLSL('t')).toBe('vec4(1.0,2.0,3.0,4.0)');
	});

	it('.integralToGLSL', function () {
		var curve = new Vector4Curve_Vector4Curve({
			x: new ConstantCurve_ConstantCurve({ value: 1 }),
			y: new ConstantCurve_ConstantCurve({ value: 2 }),
			z: new ConstantCurve_ConstantCurve({ value: 3 }),
			w: new ConstantCurve_ConstantCurve({ value: 4 })
		});
		expect(curve.integralToGLSL('t')).toBe('vec4((1.0*t),(2.0*t),(3.0*t),(4.0*t))');
	});
});
