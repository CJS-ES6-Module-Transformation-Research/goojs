import { Vector3Curve as Vector3Curve_Vector3Curve } from "../../../../../src/goo/addons/particlepack/curves/Vector3Curve";
import { ConstantCurve as ConstantCurve_ConstantCurve } from "../../../../../src/goo/addons/particlepack/curves/ConstantCurve";
import { Vector3 as Vector3_Vector3 } from "../../../../../src/goo/math/Vector3";

describe('Vector3Curve', function () {
	it('.getVec3ValueAt', function () {
		var curve = new Vector3Curve_Vector3Curve({
			x: new ConstantCurve_ConstantCurve({ value: 1 }),
			y: new ConstantCurve_ConstantCurve({ value: 2 }),
			z: new ConstantCurve_ConstantCurve({ value: 3 })
		});
		var store0 = new Vector3_Vector3();
		var store1 = new Vector3_Vector3();
		var store2 = new Vector3_Vector3();

		curve.getVec3ValueAt(0, 0, store0);
		curve.getVec3ValueAt(0.5, 0, store1);
		curve.getVec3ValueAt(1, 0, store2);

		expect(store0).toEqual(new Vector3_Vector3(1, 2, 3));
		expect(store1).toEqual(new Vector3_Vector3(1, 2, 3));
		expect(store2).toEqual(new Vector3_Vector3(1, 2, 3));
	});

	it('.getVec3IntegralValueAt', function () {
		var curve = new Vector3Curve_Vector3Curve({
			x: new ConstantCurve_ConstantCurve({ value: 1 }),
			y: new ConstantCurve_ConstantCurve({ value: 2 }),
			z: new ConstantCurve_ConstantCurve({ value: 3 })
		});
		var store0 = new Vector3_Vector3();
		var store1 = new Vector3_Vector3();
		var store2 = new Vector3_Vector3();

		curve.getVec3IntegralValueAt(0, 0, store0);
		curve.getVec3IntegralValueAt(0.5, 0, store1);
		curve.getVec3IntegralValueAt(1, 0, store2);

		expect(store0).toEqual(new Vector3_Vector3(0, 0, 0));
		expect(store1).toEqual(new Vector3_Vector3(0.5, 1, 1.5));
		expect(store2).toEqual(new Vector3_Vector3(1, 2, 3));
	});

	it('.toGLSL', function () {
		var curve = new Vector3Curve_Vector3Curve({
			x: new ConstantCurve_ConstantCurve({ value: 1 }),
			y: new ConstantCurve_ConstantCurve({ value: 2 }),
			z: new ConstantCurve_ConstantCurve({ value: 3 })
		});
		expect(curve.toGLSL('t')).toBe('vec3(1.0,2.0,3.0)');
	});

	it('.integralToGLSL', function () {
		var curve = new Vector3Curve_Vector3Curve({
			x: new ConstantCurve_ConstantCurve({ value: 1 }),
			y: new ConstantCurve_ConstantCurve({ value: 2 }),
			z: new ConstantCurve_ConstantCurve({ value: 3 })
		});
		expect(curve.integralToGLSL('t')).toBe('vec3((1.0*t),(2.0*t),(3.0*t))');
	});
});
