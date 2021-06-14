import { Vector3 as Vector3_Vector3 } from "../../../src/goo/math/Vector3";
import { Matrix3 as Matrix3_Matrix3 } from "../../../src/goo/math/Matrix3";
import { Quaternion as Quaternion_Quaternion } from "../../../src/goo/math/Quaternion";
import { CustomMatchers as CustomMatchers_CustomMatchers } from "../../../test/unit/CustomMatchers";

describe('Quaternion', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchers);
	});

	describe('constructor', function () {
		it('creates a zero quaternion when given no parameters', function () {
			var quaternion = new Quaternion_Quaternion();
			expect(quaternion.equals(new Quaternion_Quaternion(0, 0, 0, 1))).toBeTruthy();
		});

		it('creates a quaternion when given 4 parameters', function () {
			var quaternion = new Quaternion_Quaternion(11, 22, 33, 44);

			var expected = new Quaternion_Quaternion();
			expected.x = 11;
			expected.y = 22;
			expected.z = 33;
			expected.w = 44;

			expect(quaternion).toBeCloseToVector(expected);
		});

		it('creates a vector when given an array', function () {
			var vector = new Quaternion_Quaternion([1, 2, 3, 4]);
			var expected = new Quaternion_Quaternion(1, 2, 3, 4);

			expect(vector).toBeCloseToVector(expected);
		});

		it('creates a vector when given a vector', function () {
			var original = new Quaternion_Quaternion(1, 2, 3, 4);
			var vector = new Quaternion_Quaternion(original);
			var expected = new Quaternion_Quaternion(1, 2, 3, 4);

			expect(vector).toBeCloseToVector(expected);
		});
	});

	describe('mul', function () {
		it('can multiply two quaternions', function () {
			var p = new Quaternion_Quaternion(1, 0, 0, 0);
			var q = new Quaternion_Quaternion(0, 1, 0, 0);
			p.mul(q);

			expect(p.equals(new Quaternion_Quaternion(0, 0, 1, 0))).toBeTruthy();
		});
	});

	it('can slerp', function () {
		var angle1 = Math.PI / 2;
		var angle2 = Math.PI;
		var half = (angle1 + angle2) / 2;

		var quat1 = new Quaternion_Quaternion(Math.sin(angle1), 0, 0, Math.cos(angle1));
		var quat2 = new Quaternion_Quaternion(Math.sin(angle2), 0, 0, Math.cos(angle2));

		var result = new Quaternion_Quaternion();
		var expectedResult = new Quaternion_Quaternion(Math.sin(half), 0, 0, Math.cos(half));

		Quaternion_Quaternion.slerp(quat1, quat2, 0.5, result);
		expect(result.equals(expectedResult)).toBeTruthy();
	});

	it('can slerp via prototype method', function () {
		var startQuat = new Quaternion_Quaternion();
		var endQuat = new Quaternion_Quaternion();
		var result = new Quaternion_Quaternion();
		startQuat.slerp(endQuat, 0.5, result);
		expect(result).toEqual(new Quaternion_Quaternion());
	});

	describe('negate', function () {
		it('can negate', function () {
			var q = new Quaternion_Quaternion(1, 1, 1, 1);
			q.negate();
			expect(q).toEqual(new Quaternion_Quaternion(-1, -1, -1, -1));
		});
	});

	describe('conjugate', function () {
		it('conjugates a quaternion', function () {
			var original = new Quaternion_Quaternion(1, 2, 3, 4);
			var conjugate = new Quaternion_Quaternion().copy(original).conjugate();
			expect(conjugate.equals(new Quaternion_Quaternion(-1, -2, -3, 4))).toBeTruthy();
		});
	});

	describe('invert', function () {
		it('inverts a quaternion', function () {
			var original = new Quaternion_Quaternion(1, 2, 3, 4).normalize();
			var inverse = new Quaternion_Quaternion().copy(original).invert();
			expect(inverse.equals(new Quaternion_Quaternion(-1 / 30, -2 / 30, -3 / 30, 4 / 30).normalize())).toBeTruthy();
		});
	});

	it('can dot', function () {
		var q = new Quaternion_Quaternion(1, 1, 1, 1);
		expect(q.dot(q)).toEqual(4);
	});

	it('can be set from rotation matrix', function () {
		var matrix = new Matrix3_Matrix3(
			-1, 0, 0,
			0, -1, 0,
			0, 0, 1
		);

		var quaternion = new Quaternion_Quaternion();
		quaternion.fromRotationMatrix(matrix);

		expect(quaternion.equals(new Quaternion_Quaternion(0, 0, 1, 0))).toBeTruthy();
	});

	it('can convert to rotation matrix', function () {
		var matrix = new Matrix3_Matrix3();

		var quaternion = new Quaternion_Quaternion(0, 0, 1, 0);
		quaternion.toRotationMatrix(matrix);

		expect(matrix).toBeCloseToMatrix(new Matrix3_Matrix3(
			-1, 0, 0,
			0, -1, 0,
			0, 0, 1
		));
	});

	it('can be set from vector to vector', function () {
		var p = new Quaternion_Quaternion();
		var q = new Quaternion_Quaternion();
		q.fromVectorToVector(new Vector3_Vector3(1, 0, 0), new Vector3_Vector3(0, 1, 0));
		p.fromAngleAxis(Math.PI / 2, new Vector3_Vector3(0, 0, 1));
		expect(p).toBeCloseToVector(q);
	});

	it('can be normalized', function () {
		var q = new Quaternion_Quaternion(0, 0, 0, 2);
		q.normalize();
		expect(q.length()).toEqual(1);
	});

	it('can get length', function () {
		var q = new Quaternion_Quaternion(0, 0, 0, 2);
		expect(q.length()).toEqual(2);
	});

	it('can get squared length', function () {
		var q = new Quaternion_Quaternion(0, 0, 0, 2);
		expect(q.lengthSquared()).toEqual(4);
	});

	it('can be set from axis angle', function () {
		var q = new Quaternion_Quaternion();
		var axis = new Vector3_Vector3(1, 0, 0);
		var angle = 0;
		q.fromAngleAxis(angle, axis);
		expect(q).toEqual(new Quaternion_Quaternion());
	});

	it('can be set from a normal axis and angle', function () {
		var q = new Quaternion_Quaternion();
		var axis = new Vector3_Vector3(1, 0, 0);
		var angle = 0;
		q.fromAngleNormalAxis(angle, axis);
		expect(q).toEqual(new Quaternion_Quaternion());
	});

	it('can be set from a zero axis and angle', function () {
		var q = new Quaternion_Quaternion();
		var axis = new Vector3_Vector3(0, 0, 0);
		var angle = 0;
		q.fromAngleNormalAxis(angle, axis);
		expect(q).toEqual(new Quaternion_Quaternion());
	});

	it('can generate axis and angle 1', function () {
		var q = new Quaternion_Quaternion();
		var axis = new Vector3_Vector3(0, 0, 0);
		var angle = q.toAngleAxis(axis);
		expect(typeof angle).toEqual('number');
	});

	it('can generate axis and angle 2', function () {
		var q = new Quaternion_Quaternion();
		var axis = new Vector3_Vector3(1, 0, 0);
		var axisResult = new Vector3_Vector3();
		var angle = Math.PI / 2;
		q.fromAngleNormalAxis(angle, axis);
		var angleResult = q.toAngleAxis(axisResult);
		expect(angleResult).toBeCloseTo(angle);
		expect(axisResult).toEqual(axis);
	});

	it('can set all components via other quaternion', function () {
		var q = new Quaternion_Quaternion();
		var p = new Quaternion_Quaternion(1, 2, 3, 4);
		q.set(p);
		expect(q.equals(p)).toBeTruthy();
	});

	describe('clone', function () {
		it('clones a quaternion', function () {
			var original = new Quaternion_Quaternion(1, 2, 3, 4);
			var clone = original.clone();

			expect(clone).toEqual(jasmine.any(Quaternion_Quaternion));
			expect(clone).not.toBe(original);
			expect(clone).toBeCloseToVector(original);
		});
	});


	describe('NaN checks (only in dev)', function () {
		it('throws an exception when trying to set a quaternion component to NaN', function () {
			var quaternion1 = new Quaternion_Quaternion();
			expect(function () { quaternion1.z = NaN; })
				.toThrow(new Error('Tried setting NaN to vector component z'));

			//var quaternion2 = new Quaternion();
			//expect(function () { quaternion2[1] = NaN; })
			//	.toThrow(new Error('Tried setting NaN to vector component 1'));
		});

		it('throws an exception when trying to corrupt a vector by using methods', function () {
			var quaternion1 = new Quaternion_Quaternion();
			expect(function () { quaternion1.mul({}); })
				.toThrow(new Error('Tried setting NaN to vector component x'));

			var quaternion2 = new Quaternion_Quaternion();
			expect(function () { quaternion2.setDirect(); })
				.toThrow(new Error('Tried setting NaN to vector component x'));
		});

		it('throws an exception when a corrupt quaternion would return NaN', function () {
			var quaternion = new Quaternion_Quaternion();
			// manually corrupting this quaternion
			// this is the only non-traceable way
			quaternion._x = NaN;
			expect(function () { quaternion.lengthSquared(); })
				.toThrow(new Error('Vector method lengthSquared returned NaN'));
		});
	});

	describe('deprecated shim added 2015-10-07 (v1.0)', function () {

		it('can add two quaternions',function () {
			var p = new Quaternion_Quaternion(1,1,1,1);
			var q = new Quaternion_Quaternion(2,2,2,2);
			var result = new Quaternion_Quaternion();
			Quaternion_Quaternion.add(p,q,result);
			expect(result).toEqual(new Quaternion_Quaternion(3,3,3,3));
		});

		it('can subtract two quaternions',function () {
			var p = new Quaternion_Quaternion(1,1,1,1);
			var q = new Quaternion_Quaternion(2,2,2,2);
			var result = new Quaternion_Quaternion();
			Quaternion_Quaternion.sub(p,q,result);
			expect(result).toEqual(new Quaternion_Quaternion(-1,-1,-1,-1));
		});

		it('can multiply two quaternions',function () {
			var p = new Quaternion_Quaternion();
			var q = new Quaternion_Quaternion();
			var result = new Quaternion_Quaternion();
			Quaternion_Quaternion.mul(p,q,result);

			//! schteppe: TODO: How to check result?
			expect(result).toEqual(new Quaternion_Quaternion());
		});

		it('can divide component-wise',function () {
			var p = new Quaternion_Quaternion(2,2,2,2);
			var q = new Quaternion_Quaternion(2,2,2,2);
			var result = new Quaternion_Quaternion();
			Quaternion_Quaternion.div(p,q,result);
			expect(result).toEqual(new Quaternion_Quaternion(1,1,1,1));
		});

		it('can add a scalar to a quaternion',function () {
			var p = new Quaternion_Quaternion(1,1,1,1);
			var result = new Quaternion_Quaternion();
			Quaternion_Quaternion.scalarAdd(p,1,result);
			expect(result).toEqual(new Quaternion_Quaternion(2,2,2,2));
		});

		it('can subtract a scalar from a quaternion',function () {
			var p = new Quaternion_Quaternion(1,1,1,1);
			var result = new Quaternion_Quaternion();
			Quaternion_Quaternion.scalarSub(p,1,result);
			expect(result).toEqual(new Quaternion_Quaternion(0,0,0,0));
		});

		it('can multiply a scalar with a quaternion',function () {
			var p = new Quaternion_Quaternion(1,1,1,1);
			var result = new Quaternion_Quaternion();
			Quaternion_Quaternion.scalarMul(p,2,result);
			expect(result).toEqual(new Quaternion_Quaternion(2,2,2,2));
		});

		it('can divide a quaternion with a scalar',function () {
			var p = new Quaternion_Quaternion(2,2,2,2);
			var result = new Quaternion_Quaternion();
			Quaternion_Quaternion.scalarDiv(p,2,result);
			expect(result).toEqual(new Quaternion_Quaternion(1,1,1,1));
		});

		it('can slerp',function () {
			var angle1 = Math.PI / 2;
			var angle2 = Math.PI;
			var half = (angle1 + angle2) / 2;

			var quat1 = new Quaternion_Quaternion(Math.sin(angle1), 0, 0, Math.cos(angle1));
			var quat2 = new Quaternion_Quaternion(Math.sin(angle2), 0, 0, Math.cos(angle2));

			var result = new Quaternion_Quaternion();
			var expectedResult = new Quaternion_Quaternion(Math.sin(half), 0, 0, Math.cos(half));

			Quaternion_Quaternion.slerp(quat1, quat2, 0.5, result);
			expect(result.equals(expectedResult)).toBeTruthy();
		});

		it('can slerp via prototype method',function () {
			var startQuat = new Quaternion_Quaternion();
			var endQuat = new Quaternion_Quaternion();
			var result = new Quaternion_Quaternion();
			startQuat.slerp(endQuat,0.5,result);
			expect(result).toEqual(new Quaternion_Quaternion());
		});

		it('can negate',function () {
			var q = new Quaternion_Quaternion(1,1,1,1);
			q.negate();
			expect(q).toEqual(new Quaternion_Quaternion(-1,-1,-1,-1));
		});

		describe('conjugate', function () {
			it('conjugates a quaternion', function () {
				var original = new Quaternion_Quaternion(1, 2, 3, 4);
				var conjugate = new Quaternion_Quaternion().copy(original).conjugate();
				expect(conjugate).toBeCloseToVector(new Quaternion_Quaternion(-1, -2, -3, 4));
			});
		});

		describe('invert', function () {
			it('inverts a quaternion', function () {
				var original = new Quaternion_Quaternion(1, 2, 3, 4).normalize();
				var inverse = new Quaternion_Quaternion().copy(original).invert();
				expect(inverse).toBeCloseToVector(new Quaternion_Quaternion(-1/30, -2/30, -3/30, 4/30).normalize());
			});
		});

		it('can be set from rotation matrix', function () {
			var matrix = new Matrix3_Matrix3(
				-1, 0, 0,
				0, -1, 0,
				0, 0, 1
			);

			var quaternion = new Quaternion_Quaternion();
			quaternion.fromRotationMatrix(matrix);

			expect(quaternion).toBeCloseToVector(new Quaternion_Quaternion(0, 0, 1, 0));
		});

		it('can convert to rotation matrix', function () {
			var matrix = new Matrix3_Matrix3();

			var quaternion = new Quaternion_Quaternion(0, 0, 1, 0);
			quaternion.toRotationMatrix(matrix);

			expect(matrix).toBeCloseToMatrix(new Matrix3_Matrix3(
				-1, 0, 0,
				0, -1, 0,
				0, 0, 1
			));
		});

		it('can be set from vector to vector', function () {
			var p = new Quaternion_Quaternion();
			var q = new Quaternion_Quaternion();
			q.fromVectorToVector(new Vector3_Vector3(1, 0, 0), new Vector3_Vector3(0, 1, 0));
			p.fromAngleAxis(Math.PI / 2, new Vector3_Vector3(0, 0, 1));
			expect(p).toEqual(q);
		});

		it('can be normalized', function () {
			var q = new Quaternion_Quaternion(0,0,0,2);
			q.normalize();
			expect(q.magnitude()).toEqual(1);
		});

		it('can get magnitude', function () {
			var q = new Quaternion_Quaternion(0,0,0,2);
			expect(q.magnitude()).toEqual(2);
		});

		it('can get squared magnitude', function () {
			var q = new Quaternion_Quaternion(0,0,0,2);
			expect(q.magnitudeSquared()).toEqual(4);
		});

		it('can be set from axis angle', function () {
			var q = new Quaternion_Quaternion();
			var axis = new Vector3_Vector3(1,0,0);
			var angle = 0;
			q.fromAngleAxis(angle,axis);
			expect(q).toEqual(new Quaternion_Quaternion());
		});

		it('can be set from a normal axis and angle', function () {
			var q = new Quaternion_Quaternion();
			var axis = new Vector3_Vector3(1,0,0);
			var angle = 0;
			q.fromAngleNormalAxis(angle,axis);
			expect(q).toEqual(new Quaternion_Quaternion());
		});

		it('can be set from a zero axis and angle', function () {
			var q = new Quaternion_Quaternion();
			var axis = new Vector3_Vector3(0,0,0);
			var angle = 0;
			q.fromAngleNormalAxis(angle,axis);
			expect(q).toEqual(new Quaternion_Quaternion());
		});

		it('can generate axis and angle 1', function () {
			var q = new Quaternion_Quaternion();
			var axis = new Vector3_Vector3(0,0,0);
			var angle = q.toAngleAxis(axis);
			expect(typeof angle).toEqual('number');
		});

		it('can generate axis and angle 2', function () {
			var q = new Quaternion_Quaternion();
			var axis = new Vector3_Vector3(1,0,0);
			var axisResult = new Vector3_Vector3();
			var angle = Math.PI/2;
			q.fromAngleNormalAxis(angle,axis);
			var angleResult = q.toAngleAxis(axisResult);
			expect(angleResult).toBeCloseTo(angle);
			expect(axisResult).toEqual(axis);
		});

		it('can check for equality', function () {
			var q = new Quaternion_Quaternion();
			expect(q.equals(q)).toBeTruthy();
		});

		it('can check for equality with foreign object', function () {
			var q = new Quaternion_Quaternion();
			expect(q.equals(1)).toBeFalsy();
		});

		describe('clone', function () {
			it('clones a quaternion', function () {
				var original = new Quaternion_Quaternion(1, 2, 3, 4);
				var clone = original.clone();

				expect(clone).toEqual(jasmine.any(Quaternion_Quaternion));
				expect(clone).not.toBe(original);
				expect(clone.data[0]).toBeCloseTo(original.data[0]);
				expect(clone.data[1]).toBeCloseTo(original.data[1]);
				expect(clone.data[2]).toBeCloseTo(original.data[2]);
				expect(clone.data[3]).toBeCloseTo(original.data[3]);
			});
		});

	});
});
