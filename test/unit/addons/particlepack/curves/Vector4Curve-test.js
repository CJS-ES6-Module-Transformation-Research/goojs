var _Vector4Curve = require("../../../../../src/goo/addons/particlepack/curves/Vector4Curve");

var _ConstantCurve = require("../../../../../src/goo/addons/particlepack/curves/ConstantCurve");

var _Vector = require("../../../../../src/goo/math/Vector4");

describe('Vector4Curve', function () {
	it('.getVec4ValueAt', function () {
		var curve = new _Vector4Curve.Vector4Curve({
			x: new _ConstantCurve.ConstantCurve({ value: 1 }),
			y: new _ConstantCurve.ConstantCurve({ value: 2 }),
			z: new _ConstantCurve.ConstantCurve({ value: 3 }),
			w: new _ConstantCurve.ConstantCurve({ value: 4 })
		});
		var store0 = new _Vector.Vector4();
		var store1 = new _Vector.Vector4();
		var store2 = new _Vector.Vector4();

		curve.getVec4ValueAt(0, 0, store0);
		curve.getVec4ValueAt(0.5, 0, store1);
		curve.getVec4ValueAt(1, 0, store2);

		expect(store0).toEqual(new _Vector.Vector4(1, 2, 3, 4));
		expect(store1).toEqual(new _Vector.Vector4(1, 2, 3, 4));
		expect(store2).toEqual(new _Vector.Vector4(1, 2, 3, 4));
	});

	it('.getVec4IntegralValueAt', function () {
		var curve = new _Vector4Curve.Vector4Curve({
			x: new _ConstantCurve.ConstantCurve({ value: 1 }),
			y: new _ConstantCurve.ConstantCurve({ value: 2 }),
			z: new _ConstantCurve.ConstantCurve({ value: 3 }),
			w: new _ConstantCurve.ConstantCurve({ value: 4 })
		});
		var store0 = new _Vector.Vector4();
		var store1 = new _Vector.Vector4();
		var store2 = new _Vector.Vector4();

		curve.getVec4IntegralValueAt(0, 0, store0);
		curve.getVec4IntegralValueAt(0.5, 0, store1);
		curve.getVec4IntegralValueAt(1, 0, store2);

		expect(store0).toEqual(new _Vector.Vector4(0, 0, 0, 0));
		expect(store1).toEqual(new _Vector.Vector4(0.5, 1, 1.5, 2));
		expect(store2).toEqual(new _Vector.Vector4(1, 2, 3, 4));
	});

	it('.toGLSL', function () {
		var curve = new _Vector4Curve.Vector4Curve({
			x: new _ConstantCurve.ConstantCurve({ value: 1 }),
			y: new _ConstantCurve.ConstantCurve({ value: 2 }),
			z: new _ConstantCurve.ConstantCurve({ value: 3 }),
			w: new _ConstantCurve.ConstantCurve({ value: 4 })
		});
		expect(curve.toGLSL('t')).toBe('vec4(1.0,2.0,3.0,4.0)');
	});

	it('.integralToGLSL', function () {
		var curve = new _Vector4Curve.Vector4Curve({
			x: new _ConstantCurve.ConstantCurve({ value: 1 }),
			y: new _ConstantCurve.ConstantCurve({ value: 2 }),
			z: new _ConstantCurve.ConstantCurve({ value: 3 }),
			w: new _ConstantCurve.ConstantCurve({ value: 4 })
		});
		expect(curve.integralToGLSL('t')).toBe('vec4((1.0*t),(2.0*t),(3.0*t),(4.0*t))');
	});
});
