"use strict";

var _Vector3Curve = require("../../../../../src/goo/addons/particlepack/curves/Vector3Curve");

var _ConstantCurve = require("../../../../../src/goo/addons/particlepack/curves/ConstantCurve");

var _Vector = require("../../../../../src/goo/math/Vector3");

describe('Vector3Curve', function () {
	it('.getVec3ValueAt', function () {
		var curve = new _Vector3Curve.Vector3Curve({
			x: new _ConstantCurve.ConstantCurve({ value: 1 }),
			y: new _ConstantCurve.ConstantCurve({ value: 2 }),
			z: new _ConstantCurve.ConstantCurve({ value: 3 })
		});
		var store0 = new _Vector.Vector3();
		var store1 = new _Vector.Vector3();
		var store2 = new _Vector.Vector3();

		curve.getVec3ValueAt(0, 0, store0);
		curve.getVec3ValueAt(0.5, 0, store1);
		curve.getVec3ValueAt(1, 0, store2);

		expect(store0).toEqual(new _Vector.Vector3(1, 2, 3));
		expect(store1).toEqual(new _Vector.Vector3(1, 2, 3));
		expect(store2).toEqual(new _Vector.Vector3(1, 2, 3));
	});

	it('.getVec3IntegralValueAt', function () {
		var curve = new _Vector3Curve.Vector3Curve({
			x: new _ConstantCurve.ConstantCurve({ value: 1 }),
			y: new _ConstantCurve.ConstantCurve({ value: 2 }),
			z: new _ConstantCurve.ConstantCurve({ value: 3 })
		});
		var store0 = new _Vector.Vector3();
		var store1 = new _Vector.Vector3();
		var store2 = new _Vector.Vector3();

		curve.getVec3IntegralValueAt(0, 0, store0);
		curve.getVec3IntegralValueAt(0.5, 0, store1);
		curve.getVec3IntegralValueAt(1, 0, store2);

		expect(store0).toEqual(new _Vector.Vector3(0, 0, 0));
		expect(store1).toEqual(new _Vector.Vector3(0.5, 1, 1.5));
		expect(store2).toEqual(new _Vector.Vector3(1, 2, 3));
	});

	it('.toGLSL', function () {
		var curve = new _Vector3Curve.Vector3Curve({
			x: new _ConstantCurve.ConstantCurve({ value: 1 }),
			y: new _ConstantCurve.ConstantCurve({ value: 2 }),
			z: new _ConstantCurve.ConstantCurve({ value: 3 })
		});
		expect(curve.toGLSL('t')).toBe('vec3(1.0,2.0,3.0)');
	});

	it('.integralToGLSL', function () {
		var curve = new _Vector3Curve.Vector3Curve({
			x: new _ConstantCurve.ConstantCurve({ value: 1 }),
			y: new _ConstantCurve.ConstantCurve({ value: 2 }),
			z: new _ConstantCurve.ConstantCurve({ value: 3 })
		});
		expect(curve.integralToGLSL('t')).toBe('vec3((1.0*t),(2.0*t),(3.0*t))');
	});
});
