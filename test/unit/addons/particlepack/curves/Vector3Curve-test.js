import { Vector3Curve as srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Vector3Curve";
import {     ConstantCurve as srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs, } from "../../../../../src/goo/addons/particlepack/curves/ConstantCurve";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../../src/goo/math/Vector3";

describe('Vector3Curve', function () {
	it('.getVec3ValueAt', function () {
		var curve = new srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs({
			x: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 1 }),
			y: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 2 }),
			z: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 3 })
		});
		var store0 = new srcgoomathVector3_Vector3js();
		var store1 = new srcgoomathVector3_Vector3js();
		var store2 = new srcgoomathVector3_Vector3js();

		curve.getVec3ValueAt(0, 0, store0);
		curve.getVec3ValueAt(0.5, 0, store1);
		curve.getVec3ValueAt(1, 0, store2);

		expect(store0).toEqual(new srcgoomathVector3_Vector3js(1, 2, 3));
		expect(store1).toEqual(new srcgoomathVector3_Vector3js(1, 2, 3));
		expect(store2).toEqual(new srcgoomathVector3_Vector3js(1, 2, 3));
	});

	it('.getVec3IntegralValueAt', function () {
		var curve = new srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs({
			x: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 1 }),
			y: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 2 }),
			z: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 3 })
		});
		var store0 = new srcgoomathVector3_Vector3js();
		var store1 = new srcgoomathVector3_Vector3js();
		var store2 = new srcgoomathVector3_Vector3js();

		curve.getVec3IntegralValueAt(0, 0, store0);
		curve.getVec3IntegralValueAt(0.5, 0, store1);
		curve.getVec3IntegralValueAt(1, 0, store2);

		expect(store0).toEqual(new srcgoomathVector3_Vector3js(0, 0, 0));
		expect(store1).toEqual(new srcgoomathVector3_Vector3js(0.5, 1, 1.5));
		expect(store2).toEqual(new srcgoomathVector3_Vector3js(1, 2, 3));
	});

	it('.toGLSL', function () {
		var curve = new srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs({
			x: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 1 }),
			y: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 2 }),
			z: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 3 })
		});
		expect(curve.toGLSL('t')).toBe('vec3(1.0,2.0,3.0)');
	});

	it('.integralToGLSL', function () {
		var curve = new srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs({
			x: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 1 }),
			y: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 2 }),
			z: new srcgooaddonsparticlepackcurvesConstantCurve_ConstantCurvejs({ value: 3 })
		});
		expect(curve.integralToGLSL('t')).toBe('vec3((1.0*t),(2.0*t),(3.0*t))');
	});
});
