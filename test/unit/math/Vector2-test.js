var _Vector = require("../../../src/goo/math/Vector2");

var _CustomMatchers = require("../../../test/unit/CustomMatchers");

describe('Vector2', function () {
	beforeEach(function () {
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
	});

	describe('constructor', function () {
		it('creates a zero vector when given no parameters', function () {
			expect(new _Vector.Vector2()).toBeCloseToVector(Vector2js_ZERO);
		});

		it('creates a vector when given 2 parameters', function () {
			var vector = new _Vector.Vector2(11, 22);
			var expected = new _Vector.Vector2();

			expected.x = 11;
			expected.y = 22;

			expect(vector).toBeCloseToVector(expected);
		});

		it('creates a vector when given an array', function () {
			var vector = new _Vector.Vector2([11, 22]);
			var expected = new _Vector.Vector2(11, 22);

			expect(vector).toBeCloseToVector(expected);
		});

		it('creates a vector when given a vector', function () {
			var original = new _Vector.Vector2(1, 2);
			var vector = new _Vector.Vector2(original);
			var expected = new _Vector.Vector2(1, 2);

			expect(vector).toBeCloseToVector(expected);
		});
	});

	describe('indices', function () {
		it('can be accessed through indices (debug only)', function () {
			var a = new _Vector.Vector2(11, 22);

			expect(function () {
				a[0];
			}).toThrow(new Error('Vector component access through indices is not supported anymore'));
			expect(function () {
				a[1];
			}).toThrow(new Error('Vector component access through indices is not supported anymore'));
		});

		it('can be modified through indices (debug only)', function () {
			var a = new _Vector.Vector2();

			expect(function () {
				a[0] = 11;
			}).toThrow(new Error('Vector component access through indices is not supported anymore'));
			expect(function () {
				a[1] = 22;
			}).toThrow(new Error('Vector component access through indices is not supported anymore'));
		});
	});

	describe('aliases', function () {
		it('can be accessed through aliases', function () {
			var a = new _Vector.Vector2(11, 22);

			expect(a.x).toEqual(11);
			expect(a.y).toEqual(22);
			expect(a.u).toEqual(11);
			expect(a.v).toEqual(22);
		});

		it('can be modified through aliases', function () {
			var v1 = new _Vector.Vector2();
			v1.x = 11;
			v1.y = 22;
			expect(v1).toBeCloseToVector(new _Vector.Vector2(11, 22));

			var v2 = new _Vector.Vector2();
			v2.u = 22;
			v2.v = 33;
			expect(v2).toBeCloseToVector(new _Vector.Vector2(22, 33));
		});
	});

	describe('scale', function () {
		it('scales a vector', function () {
			var vector = new _Vector.Vector2(1, 2);
			vector.scale(123);
			expect(vector).toBeCloseToVector(new _Vector.Vector2(1 * 123, 2 * 123));
		});
	});

	describe('dot', function () {
		it('can calculate dot products', function () {
			var a = new _Vector.Vector2(1, 2);
			var b = new _Vector.Vector2(1, 2);

			expect(a.dot(b)).toEqual(5);
		});
	});

	describe('normalize', function () {
		it('can be normalized', function () {
			var a = new _Vector.Vector2();
			// rewrite with toBeCloseToVector
			a.setDirect(0, 0).normalize();
			expect(a.x).toBeCloseTo(0);
			expect(a.y).toBeCloseTo(0);

			a.setDirect(1, 1).normalize();
			expect(a.x).toBeCloseTo(1 / Math.sqrt(2));
			expect(a.y).toBeCloseTo(1 / Math.sqrt(2));

			a.setDirect(-2, -3).normalize();
			expect(a.x).toBeCloseTo(-2 / Math.sqrt(2 * 2 + 3 * 3));
			expect(a.y).toBeCloseTo(-3 / Math.sqrt(2 * 2 + 3 * 3));

			a.setDirect(12, 34).normalize();
			expect(a.x).toBeCloseTo(12 / Math.sqrt(12 * 12 + 34 * 34));
			expect(a.y).toBeCloseTo(34 / Math.sqrt(12 * 12 + 34 * 34));
		});
	});

	describe('reflect', function () {
		it('can reflect a vector', function () {
			var plane = new _Vector.Vector2(-1, 1).normalize(); // more like a vector
			var original = new _Vector.Vector2(1, 0);
			var reflection = original.clone().reflect(plane);

			expect(reflection).toBeCloseToVector(new _Vector.Vector2(0, 1));
		});
	});

	describe('copy', function () {
		it('can copy values from a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.set(new _Vector.Vector2(55, 66));
			expect(vector).toBeCloseToVector(new _Vector.Vector2(55, 66));
		});
	});

	describe('clone', function () {
		it('clones a vector', function () {
			var original = new _Vector.Vector2(11, 22);
			var clone = original.clone();

			expect(original).toBeCloseToVector(clone);
			expect(original).not.toBe(clone);
		});
	});

	describe('setDirect', function () {
		it('can set a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.setDirect(55, 66);
			expect(vector).toBeCloseToVector(new _Vector.Vector2(55, 66));
		});
	});

	describe('setArray', function () {
		it('can set a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.setArray([55, 66]);
			expect(vector).toBeCloseToVector(new _Vector.Vector2(55, 66));
		});
	});

	describe('set', function () {
		it('can set a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.set(new _Vector.Vector2(55, 66));
			expect(vector).toBeCloseToVector(new _Vector.Vector2(55, 66));
		});
	});

	describe('addDirect', function () {
		it('can add to a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.addDirect(55, 66);
			expect(vector).toBeCloseToVector(new _Vector.Vector2(66, 88));
		});
	});

	describe('add', function () {
		it('can add to a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.add(new _Vector.Vector2(55, 66));
			expect(vector).toBeCloseToVector(new _Vector.Vector2(66, 88));
		});
	});

	describe('subDirect', function () {
		it('can subtract from a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.subDirect(55, 66);
			expect(vector).toBeCloseToVector(new _Vector.Vector2(11 - 55, 22 - 66));
		});
	});

	describe('sub', function () {
		it('can subtract from a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.sub(new _Vector.Vector2(55, 66));
			expect(vector).toBeCloseToVector(new _Vector.Vector2(11 - 55, 22 - 66));
		});
	});

	describe('mulDirect', function () {
		it('can multiply with 2 numbers', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.mulDirect(55, 66);
			expect(vector).toBeCloseToVector(new _Vector.Vector2(11 * 55, 22 * 66));
		});
	});

	describe('mul', function () {
		it('can multiply with a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.mul(new _Vector.Vector2(55, 66));
			expect(vector).toBeCloseToVector(new _Vector.Vector2(11 * 55, 22 * 66));
		});
	});

	describe('divDirect', function () {
		it('can multiply with 2 numbers', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.divDirect(55, 66);
			expect(vector).toBeCloseToVector(new _Vector.Vector2(11 / 55, 22 / 66));
		});
	});

	describe('div', function () {
		it('can multiply with a vector', function () {
			var vector = new _Vector.Vector2(11, 22);
			vector.div(new _Vector.Vector2(55, 66));
			expect(vector).toBeCloseToVector(new _Vector.Vector2(11 / 55, 22 / 66));
		});
	});

	describe('fromArray', function () {
		it('creates a Vector2 from an array', function () {
			expect(Vector2js_fromArray([11, 22])).toBeCloseToVector(new _Vector.Vector2(11, 22));
		});
	});

	describe('fromAny', function () {
		it('creates a Vector2 from 2 numbers', function () {
			expect(Vector2js_fromAny(11, 22)).toBeCloseToVector(new _Vector.Vector2(11, 22));
		});

		it('creates a Vector2 from an array of 2 numbers', function () {
			expect(Vector2js_fromAny([11, 22])).toBeCloseToVector(new _Vector.Vector2(11, 22));
		});

		it('creates a Vector2 from an { x, y } object', function () {
			expect(Vector2js_fromAny({ x: 11, y: 22 })).toBeCloseToVector(new _Vector.Vector2(11, 22));
		});

		it('clones a Vector2', function () {
			var original = new _Vector.Vector2(11, 22);
			var clone = Vector2js_fromAny(original);

			expect(clone).toBeCloseToVector(original);
			expect(clone).not.toBe(original);
		});
	});

	describe('toArray', function () {
		it('converts to array', function () {
			expect(Vector2js_fromArray([1, 2]).toArray()).toEqual([1, 2]);
		});
	});

	describe('deprecated shim added 2015-10-07 (v1.0)', function () {
		describe('.data', function () {
			it('has working getters', function () {
				var v = new _Vector.Vector2(1, 2);
				expect(v.data[0]).toEqual(1);
				expect(v.data[1]).toEqual(2);
			});

			it('has working setters', function () {
				var v = new _Vector.Vector2();
				v.data[0] = 1;
				v.data[1] = 2;
				expect(v.x).toEqual(1);
				expect(v.y).toEqual(2);
			});

			it('distinguishes vectors', function () {
				var u = new _Vector.Vector2(1, 2);
				var v = new _Vector.Vector2(4, 5);
				expect(u.data[0]).toEqual(1);
				expect(v.data[0]).toEqual(4);
			});
		});

		describe('add', function () {
			it('can perform addition', function () {
				var a = new _Vector.Vector2(1, 2);
				var b = new _Vector.Vector2(1, 2);

				a.add(a);

				expect(a).toBeCloseToVector(new _Vector.Vector2(2, 4));
				expect(Vector2js_add(b, b)).toBeCloseToVector(new _Vector.Vector2(2, 4));

				expect(Vector2js_add(b, 1)).toBeCloseToVector(new _Vector.Vector2(2, 3));
				expect(Vector2js_add(1, b)).toBeCloseToVector(new _Vector.Vector2(2, 3));

				expect(Vector2js_add(b, [1, 2])).toBeCloseToVector(new _Vector.Vector2(2, 4));
				expect(Vector2js_add([1, 2], b)).toBeCloseToVector(new _Vector.Vector2(2, 4));
			});
		});

		describe('sub', function () {
			it('can perform subtraction', function () {
				var a = new _Vector.Vector2(1, 2);
				var b = new _Vector.Vector2(1, 2);

				a.sub(a);

				expect(a).toBeCloseToVector(new _Vector.Vector2(0, 0));
				expect(Vector2js_sub(b, b)).toBeCloseToVector(new _Vector.Vector2(0, 0));

				expect(Vector2js_sub(b, 1)).toBeCloseToVector(new _Vector.Vector2(0, 1));
				expect(Vector2js_sub(1, b)).toBeCloseToVector(new _Vector.Vector2(0, -1));

				expect(Vector2js_sub(b, [1, 2])).toBeCloseToVector(new _Vector.Vector2(0, 0));
				expect(Vector2js_sub([1, 2], b)).toBeCloseToVector(new _Vector.Vector2(0, 0));
			});
		});

		describe('mul', function () {
			it('can perform multiplication', function () {
				var a = new _Vector.Vector2(1, 2);
				var b = new _Vector.Vector2(1, 2);

				a.mul(a);

				expect(a).toBeCloseToVector(new _Vector.Vector2(1, 4));
				expect(Vector2js_mul(b, b)).toBeCloseToVector(new _Vector.Vector2(1, 4));

				expect(Vector2js_mul(b, 1)).toBeCloseToVector(new _Vector.Vector2(1, 2));
				expect(Vector2js_mul(1, b)).toBeCloseToVector(new _Vector.Vector2(1, 2));

				expect(Vector2js_mul(b, [1, 2])).toBeCloseToVector(new _Vector.Vector2(1, 4));
				expect(Vector2js_mul([1, 2], b)).toBeCloseToVector(new _Vector.Vector2(1, 4));
			});
		});

		describe('scale', function () {
			it('scales a vector', function () {
				var vector = new _Vector.Vector2(1, 2);
				vector.scale(123);
				expect(vector).toBeCloseToVector(new _Vector.Vector2(1 * 123, 2 * 123));
			});
		});

		describe('div', function () {
			it('can perform division', function () {
				var a = new _Vector.Vector2(1, 2);
				var b = new _Vector.Vector2(1, 2);

				a.div(a);

				expect(a).toBeCloseToVector(new _Vector.Vector2(1, 1));
				expect(Vector2js_div(b, b)).toBeCloseToVector(new _Vector.Vector2(1, 1));

				expect(Vector2js_div(b, 1)).toBeCloseToVector(new _Vector.Vector2(1, 2));
				expect(Vector2js_div(1, b)).toBeCloseToVector(new _Vector.Vector2(1, 1 / 2));

				expect(Vector2js_div(b, [1, 2])).toBeCloseToVector(new _Vector.Vector2(1, 1));
				expect(Vector2js_div([1, 2], b)).toBeCloseToVector(new _Vector.Vector2(1, 1));
			});
		});

		describe('dot', function () {
			it('can calculate dot products', function () {
				var a = new _Vector.Vector2(1, 2);
				var b = new _Vector.Vector2(1, 2);

				expect(a.dot(b)).toEqual(5);
				expect(Vector2js_dot(a, b)).toEqual(5);
			});

			it('returns garbage if supplied with garbage', function () {
				expect(Vector2js_dot([1, 2], [5])).toEqual(NaN);
			});
		});

		describe('dotVector', function () {
			it('can calculate dot products', function () {
				var a = new _Vector.Vector2(1, 2);
				var b = new _Vector.Vector2(1, 2);

				expect(a.dotVector(b)).toEqual(5);
			});
		});

		it('can be normalized', function () {
			var a = new _Vector.Vector2();

			a.set(0, 0).normalize();
			expect(a.x).toBeCloseTo(0);
			expect(a.y).toBeCloseTo(0);

			a.set(1, 1).normalize();
			expect(a.x).toBeCloseTo(1 / Math.sqrt(2));
			expect(a.y).toBeCloseTo(1 / Math.sqrt(2));

			a.set(-2, -3).normalize();
			expect(a.x).toBeCloseTo(-2 / Math.sqrt(2 * 2 + 3 * 3));
			expect(a.y).toBeCloseTo(-3 / Math.sqrt(2 * 2 + 3 * 3));

			a.set(12, 34).normalize();
			expect(a.x).toBeCloseTo(12 / Math.sqrt(12 * 12 + 34 * 34));
			expect(a.y).toBeCloseTo(34 / Math.sqrt(12 * 12 + 34 * 34));
		});

		describe('reflect', function () {
			it('can reflect a vector', function () {
				var plane = new _Vector.Vector2(-1, 1).normalize(); // more like a vector
				var original = new _Vector.Vector2(1, 0);
				var reflection = original.clone().reflect(plane);

				expect(reflection).toBeCloseToVector(new _Vector.Vector2(0, 1));
			});
		});

		describe('copy', function () {
			it('can copy values from a vector', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.setVector(new _Vector.Vector2(55, 66));
				expect(vector).toBeCloseToVector(new _Vector.Vector2(55, 66));
			});
		});

		describe('clone', function () {
			it('clones a vector', function () {
				var original = new _Vector.Vector2(11, 22);
				var clone = original.clone();

				expect(original).toBeCloseToVector(clone);
				expect(original).not.toBe(clone);
			});
		});

		describe('setDirect', function () {
			it('can set a vector', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.setDirect(55, 66);
				expect(vector).toBeCloseToVector(new _Vector.Vector2(55, 66));
			});
		});

		describe('setVector', function () {
			it('can set a vector', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.setVector(new _Vector.Vector2(55, 66));
				expect(vector).toBeCloseToVector(new _Vector.Vector2(55, 66));
			});
		});

		describe('addDirect', function () {
			it('can add to a vector', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.addDirect(55, 66);
				expect(vector).toBeCloseToVector(new _Vector.Vector2(66, 88));
			});
		});

		describe('addVector', function () {
			it('can add to a vector', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.addVector(new _Vector.Vector2(55, 66));
				expect(vector).toBeCloseToVector(new _Vector.Vector2(66, 88));
			});
		});

		describe('mulDirect', function () {
			it('can multiply with 2 numbers', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.mulDirect(55, 66);
				expect(vector).toBeCloseToVector(new _Vector.Vector2(11 * 55, 22 * 66));
			});
		});

		describe('mulVector', function () {
			it('can multiply with a vector', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.mulVector(new _Vector.Vector2(55, 66));
				expect(vector).toBeCloseToVector(new _Vector.Vector2(11 * 55, 22 * 66));
			});
		});

		describe('subDirect', function () {
			it('can subtract from a vector', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.subDirect(55, 66);
				expect(vector).toBeCloseToVector(new _Vector.Vector2(11 - 55, 22 - 66));
			});
		});

		describe('subVector', function () {
			it('can subtract from a vector', function () {
				var vector = new _Vector.Vector2(11, 22);
				vector.subVector(new _Vector.Vector2(55, 66));
				expect(vector).toBeCloseToVector(new _Vector.Vector2(11 - 55, 22 - 66));
			});
		});
	});
});
