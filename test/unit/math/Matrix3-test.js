import { Quaternion as Quaternionjs } from "../../../src/goo/math/Quaternion";
import { Matrix3 as Matrix3js } from "../../../src/goo/math/Matrix3";
import { Vector3 as Vector3js } from "../../../src/goo/math/Vector3";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";

describe('Matrix3', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	describe('constructor', function () {
		it('creates an identity matrix when given no parameters', function () {
			expect(new Matrix3js()).toBeCloseToMatrix(Matrix3js_IDENTITY);
		});

		it('creates a matrix when given 9 parameters', function () {
			var matrix = new Matrix3js(11, 22, 33, 44, 55, 66, 77, 88, 99);
			var expected = new Matrix3js();

			for (var i = 0; i < 9; i++) {
				expected.data[i] = (i + 1) * 11;
			}

			expect(matrix).toBeCloseToMatrix(expected);
		});

		it('creates a matrix when given an array', function () {
			var matrix = new Matrix3js([11, 22, 33, 44, 55, 66, 77, 88, 99]);
			var expected = new Matrix3js();

			for (var i = 0; i < 9; i++) {
				expected.data[i] = (i + 1) * 11;
			}

			expect(matrix).toBeCloseToMatrix(expected);
		});

		it('creates a matrix when given another matrix', function () {
			var expected = new Matrix3js(11, 22, 33, 44, 55, 66, 77, 88, 99);
			var matrix = new Matrix3js(expected);

			expect(matrix).toBeCloseToMatrix(expected);
		});
	});

	describe('mul', function () {
		it('multiplies this matrix with another matrix', function () {
			var a = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);
			var b = new Matrix3js(2, 3, 5, 7, 11, 13, 17, 19, 23);

			a.mul(b);

			expect(a).toBeCloseToMatrix(new Matrix3js(67, 82, 100, 145, 181, 223, 223, 280, 346));
		});
	});

	describe('mul2', function () {
		it('multiplies another matrix with this matrix', function () {
			var a = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);
			var b = new Matrix3js(2, 3, 5, 7, 11, 13, 17, 19, 23);
			var result = new Matrix3js();

			result.mul2(a, b);

			expect(result).toBeCloseToMatrix(new Matrix3js(49, 59, 69, 142, 173, 204, 254, 313, 372));
		});
	});

	it('can be transposed', function () {
		var a = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);

		a.transpose();

		expect(a).toBeCloseToMatrix(new Matrix3js(1, 4, 7, 2, 5, 8, 3, 6, 9));
	});

	it('can be inverted', function () {
		var a = new Matrix3js(0, 0, 1, -1, 2, 0, 0, 1, -2);
		var b = new Matrix3js(0, 0, 1, -1, 2, 0, 0, 1, -2);
		var c = new Matrix3js(0, 0, 0, 1, 2, 3, 4, 5, 6);

		a.invert();

		expect(a).toBeCloseToMatrix(new Matrix3js(4, -1, 2, 2, 0, 1, 1, 0, 0));
		expect(Matrix3js_invert(b)).toBeCloseToMatrix(new Matrix3js(4, -1, 2, 2, 0, 1, 1, 0, 0));
		expect(c.invert()).toBeCloseToMatrix(c);
	});

	it('can determine orthogonality', function () {
		var a = new Matrix3js(0, 0, 1, -1, 2, 0, 0, 1, -2);
		var b = new Matrix3js(0, -1, 0, 1, 0, 0, 0, 0, -1);

		expect(a.isOrthogonal()).toBeFalsy();
		expect(b.isOrthogonal()).toBeTruthy();
	});

	it('can determine normality', function () {
		var a = new Matrix3js(0, 0, 1, -1, 2, 0, 0, 1, -2);
		var b = new Matrix3js(0, -1, 0, 1, 0, 0, 0, 0, -1);

		expect(a.isNormal()).toBeFalsy();
		expect(b.isNormal()).toBeTruthy();
	});

	it('can determine orthonormality', function () {
		var a = new Matrix3js(0, 0, 1, -1, 2, 0, 0, 1, -2);
		var b = new Matrix3js(0, -1, 0, 1, 0, 0, 0, 0, -1);

		expect(a.isOrthonormal()).toBeFalsy();
		expect(b.isOrthonormal()).toBeTruthy();
	});

	it('can compute determinants', function () {
		var a = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);

		expect(a.determinant()).toBeCloseTo(0);
	});

	it('can be set to identity', function () {
		var a = new Matrix3js();
		var b = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);

		b.setIdentity();

		expect(a).toBeCloseToMatrix(Matrix3js_IDENTITY);
		expect(b).toBeCloseToMatrix(Matrix3js_IDENTITY);
	});

	it('can set the scale part', function () {
		var a = new Matrix3js();
		var b = new Matrix3js();

		a.multiplyDiagonalPost(new Vector3js(1, 2, 3), b);

		expect(b).toBeCloseToMatrix(new Matrix3js(1, 0, 0, 0, 2, 0, 0, 0, 3));
	});

	it('can be set from a vector of angles', function () {
		var a = 1.0 / Math.sqrt(2.0);

		expect(new Matrix3js().fromAngles(0, Math.PI / 4, 0))
			.toBeCloseToMatrix(new Matrix3js(a, 0, -a, 0, 1, 0, a, 0, a));
	});

	it('can be set from an axis and angle', function () {
		var a = 1.0 / Math.sqrt(2.0);

		expect(new Matrix3js().fromAngleNormalAxis(Math.PI / 4, 0, 1, 0))
			.toBeCloseToMatrix(new Matrix3js(a, 0, -a, 0, 1, 0, a, 0, a));
	});

	it('can be set to look in a specific direction', function () {
		var a = new Matrix3js().lookAt(new Vector3js(0.0, 0.0, -1.0), new Vector3js(0.0, 1.0, 0.0));
		var b = new Matrix3js(1, 0, 0, 0, 1, 0, 0, 0, 1);

		expect(a).toBeCloseToMatrix(b);
	});

	it('can be set from a quaternion', function () {
		var a = 1.0 / Math.sqrt(2.0);

		expect(new Matrix3js().copyQuaternion(new Quaternionjs(0.0, Math.sin(Math.PI / 8), 0.0, Math.cos(Math.PI / 8))))
			.toBeCloseToMatrix(new Matrix3js(a, 0, -a, 0, 1, 0, a, 0, a));
	});

	it('can retrieve euler angles', function () {
		var testVec = new Vector3js(1.4, -1.4, 1.4);
		var testMatrix = new Matrix3js().fromAngles(testVec.x, testVec.y, testVec.z);
		var store = new Vector3js();
		testMatrix.toAngles(store);
		expect(testVec).toBeCloseToVector(store);
	});

	describe('rotateX', function () {
		it('returns itself when no store matrix is given', function () {
			var a = new Matrix3js();
			expect(a.rotateX(1)).toBe(a);
		});
	});

	describe('rotateY', function () {
		it('returns itself when no store matrix is given', function () {
			var a = new Matrix3js();
			expect(a.rotateY(1)).toBe(a);
		});
	});

	describe('rotateZ', function () {
		it('returns itself when no store matrix is given', function () {
			var a = new Matrix3js();
			expect(a.rotateZ(1)).toBe(a);
		});
	});

	describe('equals', function () {
		it('can be tested for approximate equaltiy', function () {
			var a = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);
			var b = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);
			var c = new Matrix3js(0, 1, 2, 3, 4, 5, 6, 7, 8);

			expect(a.equals(b)).toBe(true);
			expect(a.equals(c)).toBe(false);
		});

		it('preserves behaviour of comparing with NaN', function () {
			// 1 === NaN // false in JS, so (1, 2) === (1, NaN) should return the same
			var m1 = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);
			var m2 = new Matrix3js(1, 2, 3, NaN, 5, 6, 7, 8, 9);

			expect(m1.equals(m2)).toBe(false);
		});
	});

	describe('copy', function () {
		it('can copy from another matrix', function () {
			var original = new Matrix3js(11, 22, 33, 44, 55, 66, 77, 88, 99);
			var copy = new Matrix3js(110, 220, 330, 440, 550, 660, 770, 880, 990);
			copy.copy(original);
			expect(copy).toBeCloseToMatrix(new Matrix3js(11, 22, 33, 44, 55, 66, 77, 88, 99));
		});
	});

	describe('clone', function () {
		it('clones a matrix', function () {
			var original = new Matrix3js(11, 22, 33, 44, 55, 66, 77, 88, 99);
			var clone = original.clone();

			expect(clone).toBeCloseToMatrix(new Matrix3js(11, 22, 33, 44, 55, 66, 77, 88, 99));
			expect(clone).not.toBe(original);
		});
	});

	describe('NaN checks (only in dev)', function () {
		it('throws an exception when trying to set a matrix component to NaN', function () {
			var matrix1 = new Matrix3js();
			expect(function () { matrix1.e12 = NaN; })
				.toThrow(new Error('Tried setting NaN to matrix component e12'));

			var matrix2 = new Matrix3js();
			expect(function () { matrix2[4] = NaN; })
				.toThrow(new Error('Tried setting NaN to matrix component 4'));
		});

		it('throws an exception when trying to corrupt a matrix by using methods', function () {
			var matrix1 = new Matrix3js();
			expect(function () { matrix1.add(new Matrix3js(NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN)); })
				.toThrow(new Error('Matrix contains NaN at index 0'));

			var matrix2 = new Matrix3js();
			expect(function () { matrix2.fromAngles(); })
				.toThrow(new Error('Matrix contains NaN at index 0'));
		});

		it('throws an exception when a corrupt matrix would return NaN', function () {
			var matrix = new Matrix3js();
			// manually corrupting this matrix
			// this is the only non-traceable way
			matrix.data[0] = NaN;
			expect(function () { matrix.determinant(); })
				.toThrow(new Error('Matrix method determinant returned NaN'));
		});
	});

	describe('deprecated shim added 2015-10-07 (v1.0)', function () {
		it('Matrix3.add', function () {
			var a = new Matrix3js(1, 1, 1, 1, 1, 1, 1, 1, 1);
			Matrix3js_add(a, a, a);
			expect(a).toBeCloseToMatrix(new Matrix3js(2, 2, 2, 2, 2, 2, 2, 2, 2));
		});

		it('Matrix3.sub', function () {
			var a = new Matrix3js(1, 1, 1, 1, 1, 1, 1, 1, 1);
			Matrix3js_sub(a, a, a);
			expect(a).toBeCloseToMatrix(new Matrix3js(0, 0, 0, 0, 0, 0, 0, 0, 0));
		});

		it('Matrix3.combine', function () {
			var a = new Matrix3js(2, 0, 0, 0, 2, 0, 0, 0, 2);
			var b = new Matrix3js(3, 0, 0, 0, 3, 0, 0, 0, 3);
			Matrix3js_combine(a, b, a);
			expect(a).toBeCloseToMatrix(new Matrix3js(6, 0, 0, 0, 6, 0, 0, 0, 6));
		});

		it('Matrix3.prototype.combine', function () {
			var a = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);
			var b = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);

			a.combine(a);

			expect(a).toBeCloseToMatrix(new Matrix3js(30, 36, 42, 66, 81, 96, 102, 126, 150));
			expect(Matrix3js_combine(b, b)).toBeCloseToMatrix(new Matrix3js(30, 36, 42, 66, 81, 96, 102, 126, 150));
		});

		it('can be transposed', function () {
			var a = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);

			expect(Matrix3js_transpose(a)).toBeCloseToMatrix(new Matrix3js(1, 4, 7, 2, 5, 8, 3, 6, 9));
		});

		it('can transform three-dimensional vectors', function () {
			var a = new Matrix3js(1, 2, 3, 4, 5, 6, 7, 8, 9);

			expect(a.applyPost(new Vector3js(1, 2, 3))).toBeCloseToVector(new Vector3js(30, 36, 42));
		});
	});
});
