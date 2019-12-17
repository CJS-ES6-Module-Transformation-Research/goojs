var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Vector = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _ObjectUtils = require("../util/ObjectUtils");

var ObjectUtils = _interopRequireWildcard(_ObjectUtils);

var _MathUtils = require("./MathUtils");

var MathUtils = _interopRequireWildcard(_MathUtils);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var exported_Vector = Vector;
function Vector(size) {

	/**
  * @hidden
  * @deprecated
  */
	this._size = size;
}

var COMPONENT_NAMES = ['x', 'y', 'z', 'w'];
// @ifdef DEBUG
var COMPONENT_NAMES = ['_x', '_y', '_z', '_w'];
// @endif

/**
 * Binds aliases to the different vector components.
 * @hidden
 * @param {Object} prototype The prototype to bind to.
 * @param {Array<Array<string>>} aliases Array of component aliases for each component index.
 */
Vector.setupAliases = function (prototype, aliases) {
	aliases.forEach(function (aliasesPerComponent, index) {
		var componentName = COMPONENT_NAMES[index];

		aliasesPerComponent.forEach(function (alias) {
			Object.defineProperty(prototype, alias, {
				get: function get() {
					return this[componentName];
				},
				set: function set(value) {
					this[componentName] = value;

					// @ifdef DEBUG
					if (isNaN(this[componentName])) {
						throw new Error('Tried setting NaN to vector component ' + alias);
					}
					// @endif
				}
			});
		});
	});
};

// @ifdef DEBUG
Vector.setupIndices = function (prototype, count) {
	var raise = function raise() {
		throw new Error('Vector component access through indices is not supported anymore');
	};

	for (var i = 0; i < count; i++) {
		Object.defineProperty(prototype, i, {
			get: raise,
			set: raise
		});
	}
};

/**
 * Replaces the supplied method of object and wraps it in a integrity check
 * @hidden
 * @param {Object} object The object to attach the post-check to
 * @param {string} methodName The name of the original method the check is attached to
 */
Vector.addReturnCheck = function (object, methodName) {
	var originalMethod = object[methodName];
	object[methodName] = function () {
		var ret = originalMethod.apply(this, arguments);
		if (isNaN(ret)) {
			throw new Error('Vector method ' + methodName + ' returned NaN');
		}

		return ret;
	};
};

/**
 * Adds more validators at once
 * @hidden
 * @param {Object} object
 * @param {Array<string>} methodNames
 */
Vector.addReturnChecks = function (object, methodNames) {
	methodNames.forEach(Vector.addReturnCheck.bind(null, object));
};
// @endif

// SHIM START
Object.defineProperty(Vector.prototype, 'data', {
	get: ObjectUtils.warnOnce('The .data property of Vector was removed, please use the .x, .y, .z, .w properties instead.', function () {
		var data = [];
		var that = this;
		Object.defineProperties(data, {
			'0': {
				get: function get() {
					return that.x;
				},
				set: function set(value) {
					that.x = value;
				}
			},
			'1': {
				get: function get() {
					return that.y;
				},
				set: function set(value) {
					that.y = value;
				}
			},
			'2': {
				get: function get() {
					return that.z;
				},
				set: function set(value) {
					that.z = value;
				}
			},
			'3': {
				get: function get() {
					return that.w;
				},
				set: function set(value) {
					that.w = value;
				}
			}
		});
		return data;
	})
});

/**
 * @hidden
 * @deprecated
 */
Vector.add = ObjectUtils.warnOnce('Vector.add is deprecated.', function (lhs, rhs, target) {
	var ldata = lhs.data || lhs;
	var rdata = rhs.data || rhs;
	var size = lhs._size;

	if (!target) {
		target = new Vector(size);
	}

	for (var i = 0; i < size; i++) {
		target.data[i] = ldata[i] + rdata[i];
	}

	return target;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.add = ObjectUtils.warnOnce('Vector.prototype.add is deprecated.', function (rhs) {
	return Vector.add(this, rhs, this);
});

/**
 * @hidden
 * @deprecated
 */
Vector.sub = ObjectUtils.warnOnce('Vector.sub is deprecated.', function (lhs, rhs, target) {
	var ldata = lhs.data || lhs;
	var rdata = rhs.data || rhs;
	var size = lhs._size;

	if (!target) {
		target = new Vector(size);
	}

	for (var i = 0; i < size; i++) {
		target.data[i] = ldata[i] - rdata[i];
	}

	return target;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.sub = ObjectUtils.warnOnce('Vector.prototype.sub is deprecated.', function (rhs) {
	return Vector.sub(this, rhs, this);
});

/**
 * @hidden
 * @deprecated
 */
Vector.mul = ObjectUtils.warnOnce('Vector.mul is deprecated.', function (lhs, rhs, target) {
	var ldata = lhs.data || lhs;
	var rdata = rhs.data || rhs;
	var size = lhs._size;

	if (!target) {
		target = new Vector(size);
	}

	for (var i = 0; i < size; i++) {
		target.data[i] = ldata[i] * rdata[i];
	}

	return target;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.mul = ObjectUtils.warnOnce('Vector.prototype.mul is deprecated.', function (rhs) {
	return Vector.mul(this, rhs, this);
});

/**
 * @hidden
 * @deprecated
 */
Vector.div = ObjectUtils.warnOnce('Vector.div is deprecated.', function (lhs, rhs, target) {
	var ldata = lhs.data || lhs;
	var rdata = rhs.data || rhs;
	var size = lhs._size;

	if (!target) {
		target = new Vector(size);
	}

	for (var i = 0; i < size; i++) {
		target.data[i] = ldata[i] / rdata[i];
	}

	return target;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.div = ObjectUtils.warnOnce('Vector.prototype.div is deprecated.', function (rhs) {
	return Vector.div(this, rhs, this);
});

/**
 * @hidden
 * @deprecated
 */
Vector.copy = ObjectUtils.warnOnce('Vector.copy is deprecated.', function (source, target) {
	var size = source._size;

	if (!target) {
		target = new Vector(size);
	}

	for (var i = 0; i < size; i++) {
		target.data[i] = source.data[i];
	}

	return target;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.copy = ObjectUtils.warnOnce('Vector.prototype.copy  is deprecated.', function (source) {
	var size = source._size;
	for (var i = 0; i < size; i++) {
		this.data[i] = source.data[i];
	}
	return this;
});

/**
 * @hidden
 * @deprecated
 */
Vector.dot = ObjectUtils.warnOnce('Vector.dot is deprecated.', function (lhs, rhs) {
	var ldata = lhs.data || lhs;
	var rdata = rhs.data || rhs;
	var size = lhs._size;

	var sum = 0;

	for (var i = 0; i < size; i++) {
		sum += ldata[i] * rdata[i];
	}

	return sum;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.dot = ObjectUtils.warnOnce('Vector.prototype.dot is deprecated.', function (rhs) {
	return Vector.dot(this, rhs);
});

/**
 * @hidden
 * @deprecated
 */
Vector.apply = ObjectUtils.warnOnce('Vector.apply is deprecated.', function (lhs, rhs, target) {
	var rows = lhs.rows;
	var cols = lhs.cols;
	var size = rhs._size;

	if (!target) {
		target = new Vector(rows);
	}

	if (target === rhs) {
		return Vector.copy(Vector.apply(lhs, rhs), target);
	}

	for (var c = 0; c < cols; c++) {
		var o = c * rows;

		for (var r = 0; r < rows; r++) {
			var sum = 0.0;

			for (var i = 0; i < size; i++) {
				sum += lhs.data[i * lhs.rows + r] * rhs.data[i];
			}

			target.data[o + r] = sum;
		}
	}

	return target;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.apply = ObjectUtils.warnOnce('Vector.prototype.apply is deprecated.', function (lhs) {
	return Vector.apply(lhs, this, this);
});

/**
 * @hidden
 * @deprecated
 */
Vector.equals = ObjectUtils.warnOnce('Vector.equals is deprecated.', function (lhs, rhs) {
	var lhsLength = lhs._size;
	if (lhsLength !== rhs._size) {
		return false;
	}

	for (var i = 0; i < lhsLength; i++) {
		// why the backwards check? because otherwise if NaN is present in either lhs or rhs
		// then Math.abs(NaN) is NaN which is neither bigger or smaller than EPSILON
		// which never satisfies the condition
		// NaN is not close to to NaN and we want to preserve that for vectors as well
		if (!(Math.abs(lhs.data[i] - rhs.data[i]) <= MathUtils.EPSILON)) {
			return false;
		}
	}

	return true;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.equals = ObjectUtils.warnOnce('Vector.prototype.equals is deprecated.', function (rhs) {
	return Vector.equals(this, rhs);
});

/**
 * @hidden
 * @deprecated
 */
Vector.distanceSquared = ObjectUtils.warnOnce('Vector.distanceSquared is deprecated.', function (lhs, rhs) {
	return Vector.sub(lhs, rhs).lengthSquared();
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.distanceSquared = ObjectUtils.warnOnce('Vector.prototype.distanceSquared is deprecated.', function (rhs) {
	return Vector.sub(this, rhs).lengthSquared();
});

/**
 * @hidden
 * @deprecated
 */
Vector.distance = ObjectUtils.warnOnce('Vector.distance is deprecated.', function (lhs, rhs) {
	return Vector.sub(lhs, rhs).length();
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.distance = ObjectUtils.warnOnce('Vector.prototype.distance is deprecated.', function (rhs) {
	return Vector.sub(this, rhs).length();
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.lengthSquared = ObjectUtils.warnOnce('Vector.prototype.lengthSquared is deprecated.', function () {
	return Vector.dot(this, this);
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.length = ObjectUtils.warnOnce('Vector.prototype.length is deprecated.', function () {
	return Math.sqrt(Vector.dot(this, this));
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.scale = ObjectUtils.warnOnce('Vector.prototype.scale is deprecated.', function (factor) {
	for (var i = this._size - 1; i >= 0; i--) {
		this.data[i] *= factor;
	}
	return this;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.invert = ObjectUtils.warnOnce('Vector.prototype.invert is deprecated.', function () {
	for (var i = 0; i < this._size; i++) {
		this.data[i] = 0.0 - this.data[i];
	}

	return this;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.normalize = ObjectUtils.warnOnce('Vector.prototype.normalize is deprecated.', function () {
	var l = this.length();
	var dataLength = this._size;

	if (l < MathUtils.EPSILON) {
		for (var i = 0; i < dataLength; i++) {
			this.data[i] = 0;
		}
	} else {
		l = 1.0 / l;
		for (var i = 0; i < dataLength; i++) {
			this.data[i] *= l;
		}
	}

	return this;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.clone = ObjectUtils.warnOnce('Vector.prototype.clone is deprecated.', function () {
	return Vector.copy(this);
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.set = ObjectUtils.warnOnce('Vector.prototype.set is deprecated.', function () {
	if (arguments.length === 1 && _typeof(arguments[0]) === 'object') {
		if (arguments[0] instanceof Vector) {
			this.copy(arguments[0]);
		} else {
			for (var i = 0; i < arguments[0].length; i++) {
				this.data[i] = arguments[0][i];
			}
		}
	} else {
		for (var i = 0; i < arguments.length; i++) {
			this.data[i] = arguments[i];
		}
	}

	return this;
});

/**
 * @hidden
 * @deprecated
 */
Vector.prototype.toString = ObjectUtils.warnOnce('Vector.prototype.toString is deprecated.', function () {
	var string = '';

	string += '[';

	for (var i = 0; i < this._size; i++) {
		string += this.data[i];
		string += i !== this._size - 1 ? ', ' : '';
	}

	string += ']';

	return string;
});

/**
 * Abstract vector class
 */
exports.Vector = exported_Vector;
