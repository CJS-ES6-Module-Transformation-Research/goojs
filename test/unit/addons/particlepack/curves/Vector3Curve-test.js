import { Vector3Curve as Vector3Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Vector3Curve";
import { ConstantCurve as ConstantCurvejs } from "../../../../../src/goo/addons/particlepack/curves/ConstantCurve";
import { Vector3 as Vector3js } from "../../../../../src/goo/math/Vector3";

describe('Vector3Curve', function () {
	it('.getVec3ValueAt', function () {
		var curve = new Vector3Curvejs({
			x: new ConstantCurvejs({ value: 1 }),
			y: new ConstantCurvejs({ value: 2 }),
			z: new ConstantCurvejs({ value: 3 })
		});
		var store0 = new Vector3js();
		var store1 = new Vector3js();
		var store2 = new Vector3js();

		curve.getVec3ValueAt(0, 0, store0);
		curve.getVec3ValueAt(0.5, 0, store1);
		curve.getVec3ValueAt(1, 0, store2);

		expect(store0).toEqual(new Vector3js(1, 2, 3));
		expect(store1).toEqual(new Vector3js(1, 2, 3));
		expect(store2).toEqual(new Vector3js(1, 2, 3));
	});

	it('.getVec3IntegralValueAt', function () {
		var curve = new Vector3Curvejs({
			x: new ConstantCurvejs({ value: 1 }),
			y: new ConstantCurvejs({ value: 2 }),
			z: new ConstantCurvejs({ value: 3 })
		});
		var store0 = new Vector3js();
		var store1 = new Vector3js();
		var store2 = new Vector3js();

		curve.getVec3IntegralValueAt(0, 0, store0);
		curve.getVec3IntegralValueAt(0.5, 0, store1);
		curve.getVec3IntegralValueAt(1, 0, store2);

		expect(store0).toEqual(new Vector3js(0, 0, 0));
		expect(store1).toEqual(new Vector3js(0.5, 1, 1.5));
		expect(store2).toEqual(new Vector3js(1, 2, 3));
	});

	it('.toGLSL', function () {
		var curve = new Vector3Curvejs({
			x: new ConstantCurvejs({ value: 1 }),
			y: new ConstantCurvejs({ value: 2 }),
			z: new ConstantCurvejs({ value: 3 })
		});
		expect(curve.toGLSL('t')).toBe('vec3(1.0,2.0,3.0)');
	});

	it('.integralToGLSL', function () {
		var curve = new Vector3Curvejs({
			x: new ConstantCurvejs({ value: 1 }),
			y: new ConstantCurvejs({ value: 2 }),
			z: new ConstantCurvejs({ value: 3 })
		});
		expect(curve.integralToGLSL('t')).toBe('vec3((1.0*t),(2.0*t),(3.0*t))');
	});
});
