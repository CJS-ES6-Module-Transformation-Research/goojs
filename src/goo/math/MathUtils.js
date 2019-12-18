Object.defineProperty(exports, "__esModule", {
    value: true
});
var functionObject_warnNaN;
var functionObject_floatToHalfFloat;
var functionObject_fastRandom;
var functionObject_randomSeed;
var functionObject_smoothstep;
var functionObject_barycentricInterpolation;
var functionObject_triangleArea;
var functionObject_sign;
var functionObject_closeTo;
var functionObject_nearestHigherPowerOfTwo;
var functionObject_nearestPowerOfTwo;
var functionObject_isPowerOfTwo;
var functionObject_getTriangleNormal;
var functionObject_cartesianToSpherical;
var functionObject_sphericalToCartesian;
var functionObject_scurve5;
var functionObject_scurve3;
var functionObject_moduloPositive;
var functionObject_radialClamp;
var functionObject_clamp;
var functionObject_lerp;
var functionObject_degFromRad;
var functionObject_radFromDeg;
var functionObject_EPSILON;
var functionObject_TWO_PI;
var functionObject_HALF_PI;
var functionObject_RAD_TO_DEG;
var functionObject_DEG_TO_RAD;
/**
 * A collection of useful math-related functions, constants and helpers.
 * Only used to define the class. Should never be instantiated.
 */
function MathUtils() {}

exports.DEG_TO_RAD = functionObject_DEG_TO_RAD = Math.PI / 180.0;
exports.RAD_TO_DEG = functionObject_RAD_TO_DEG = 180.0 / Math.PI;
exports.HALF_PI = functionObject_HALF_PI = 0.5 * Math.PI;
exports.TWO_PI = functionObject_TWO_PI = 2.0 * Math.PI;
exports.EPSILON = functionObject_EPSILON = 0.00001;

exports.radFromDeg = functionObject_radFromDeg = function functionObject_radFromDeg(degrees) {
    return degrees * functionObject_DEG_TO_RAD;
};

exports.degFromRad = functionObject_degFromRad = function functionObject_degFromRad(radians) {
    return radians * functionObject_RAD_TO_DEG;
};

exports.lerp = functionObject_lerp = function functionObject_lerp(factor, start, end) {
    if (start === end) {
        return start;
    } else {
        return start + (end - start) * factor;
    }
};

exports.clamp = functionObject_clamp = function functionObject_clamp(value, min, max) {
    if (min < max) {
        return value < min ? min : value > max ? max : value;
    } else {
        return value < max ? max : value > min ? min : value;
    }
};

exports.radialClamp = functionObject_radialClamp = function functionObject_radialClamp(value, min, max) {
    // Rotating coordinates to be mirrored
    var zero = (min + max) / 2 + (max > min ? Math.PI : 0);
    var _value = functionObject_moduloPositive(value - zero, functionObject_TWO_PI);
    var _min = functionObject_moduloPositive(min - zero, functionObject_TWO_PI);
    var _max = functionObject_moduloPositive(max - zero, functionObject_TWO_PI);

    // Putting min, max and value on the same circle
    if (value < 0 && min > 0) {
        min -= functionObject_TWO_PI;
    } else if (value > 0 && min < 0) {
        min += functionObject_TWO_PI;
    }
    if (value > functionObject_TWO_PI && max < functionObject_TWO_PI) {
        max += functionObject_TWO_PI;
    }

    return _value < _min ? min : _value > _max ? max : value;
};

exports.moduloPositive = functionObject_moduloPositive = function functionObject_moduloPositive(value, size) {
    var wrappedValue = value % size;
    wrappedValue += wrappedValue < 0 ? size : 0;
    return wrappedValue;
};

exports.scurve3 = functionObject_scurve3 = function functionObject_scurve3(x) {
    return (-2.0 * x + 3.0) * x * x;
};

exports.scurve5 = functionObject_scurve5 = function functionObject_scurve5(x) {
    return ((6.0 * x - 15.0) * x + 10.0) * x * x * x;
};

exports.sphericalToCartesian = functionObject_sphericalToCartesian = function functionObject_sphericalToCartesian(radius, azimuth, polar, store) {
    var a = radius * Math.cos(polar);

    store.x = a * Math.cos(azimuth);
    store.y = radius * Math.sin(polar);
    store.z = a * Math.sin(azimuth);
};

functionObject_cartesianToSpherical = function functionObject_cartesianToSpherical(x, y, z, store) {
    var a = Math.sqrt(x * x + z * z);
    store.x = Math.sqrt(x * x + y * y + z * z); // radius
    store.y = Math.atan2(z, x); // azimuth
    store.z = Math.atan2(y, a); // polar
};

exports.getTriangleNormal = functionObject_getTriangleNormal = function functionObject_getTriangleNormal(p1x, p1y, p1z, p2x, p2y, p2z, p3x, p3y, p3z) {
    var ux = p2x - p1x;
    var uy = p2y - p1y;
    var uz = p2z - p1z;

    var vx = p3x - p1x;
    var vy = p3y - p1y;
    var vz = p3z - p1z;

    var nx = uy * vz - uz * vy;
    var ny = uz * vx - ux * vz;
    var nz = ux * vy - uy * vx;

    return [nx, ny, nz];
};

exports.isPowerOfTwo = functionObject_isPowerOfTwo = function functionObject_isPowerOfTwo(value) {
    return (value & value - 1) === 0;
};

exports.nearestPowerOfTwo = functionObject_nearestPowerOfTwo = function functionObject_nearestPowerOfTwo(value) {
    value--;
    value |= value >> 1;
    value |= value >> 2;
    value |= value >> 4;
    value |= value >> 8;
    value |= value >> 16;
    value++;
    return value;
};

functionObject_nearestHigherPowerOfTwo = functionObject_nearestPowerOfTwo;

exports.closeTo = functionObject_closeTo = function functionObject_closeTo(v1, v2, tolerance) {
    tolerance = typeof tolerance !== "undefined" ? tolerance : 0.001;
    return Math.abs(v1 - v2) <= tolerance;
};

exports.sign = functionObject_sign = function functionObject_sign(value) {
    return value < 0 ? -1 : value > 0 ? 1 : 0;
};

exports.triangleArea = functionObject_triangleArea = function functionObject_triangleArea(t1, t2, t3) {
    return Math.abs(t1.x * t2.y + t2.x * t3.y + t3.x * t1.y - t2.y * t3.x - t3.y * t1.x - t1.y * t2.x) / 2;
};

exports.barycentricInterpolation = functionObject_barycentricInterpolation = function functionObject_barycentricInterpolation(t1, t2, t3, p) {
    var t1Area = functionObject_triangleArea(t2, t3, p);
    var t2Area = functionObject_triangleArea(t1, t3, p);
    var t3Area = functionObject_triangleArea(t1, t2, p);

    // assuming the point is inside the triangle
    var totalArea = t1Area + t2Area + t3Area;
    if (!totalArea) {
        if (p[0] === t1[0] && p[2] === t1[2]) {
            return t1;
        } else if (p[0] === t2[0] && p[2] === t2[2]) {
            return t2;
        } else if (p[0] === t3[0] && p[2] === t3[2]) {
            return t3;
        }
    }

    p.z = (t1Area * t1.z + t2Area * t2.z + t3Area * t3.z) / totalArea;
    return p;
};

exports.smoothstep = functionObject_smoothstep = function functionObject_smoothstep(edge0, edge1, x) {
    x = functionObject_clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return x * x * (3 - 2 * x);
};

exports.randomSeed = functionObject_randomSeed = 1337;

exports.fastRandom = functionObject_fastRandom = function functionObject_fastRandom() {
    exports.randomSeed = functionObject_randomSeed = (functionObject_randomSeed * 9301 + 49297) % 233280;
    return functionObject_randomSeed / 233280;
};

functionObject_floatToHalfFloat = function () {
    var floatView = new Float32Array(1);
    var int32View = new Int32Array(floatView.buffer);

    return function (fval) {
        floatView[0] = fval;
        var fbits = int32View[0];
        var sign = fbits >> 16 & 0x8000;
        var val = (fbits & 0x7fffffff) + 0x1000;

        if (val >= 0x47800000) {
            if ((fbits & 0x7fffffff) >= 0x47800000) {
                if (val < 0x7f800000) {
                    return sign | 0x7c00;
                }
                return sign | 0x7c00 | (fbits & 0x007fffff) >> 13;
            }
            return sign | 0x7bff;
        }
        if (val >= 0x38800000) {
            return sign | val - 0x38000000 >> 13;
        }
        if (val < 0x33000000) {
            return sign;
        }
        val = (fbits & 0x7fffffff) >> 23;
        return sign | (fbits & 0x7fffff | 0x800000) + (0x800000 >>> val - 102) >> 126 - val;
    };
}();

functionObject_warnNaN = function functionObject_warnNaN(object, property) {
    var value = object[property];

    Object.defineProperty(object, property, {
        get: function get() {
            return value;
        },

        set: function set(_value) {
            if (isNaN(_value)) {
                throw new Error("Tried to assign NaN to " + property);
            }
            value = _value;
        }
    });
};

exports.DEG_TO_RAD = functionObject_DEG_TO_RAD;
exports.RAD_TO_DEG = functionObject_RAD_TO_DEG;
exports.HALF_PI = functionObject_HALF_PI;
exports.TWO_PI = functionObject_TWO_PI;
exports.EPSILON = functionObject_EPSILON;
exports.radFromDeg = functionObject_radFromDeg;
exports.degFromRad = functionObject_degFromRad;
exports.lerp = functionObject_lerp;
exports.clamp = functionObject_clamp;
exports.radialClamp = functionObject_radialClamp;
exports.moduloPositive = functionObject_moduloPositive;
exports.scurve3 = functionObject_scurve3;
exports.scurve5 = functionObject_scurve5;
exports.sphericalToCartesian = functionObject_sphericalToCartesian;
exports.getTriangleNormal = functionObject_getTriangleNormal;
exports.isPowerOfTwo = functionObject_isPowerOfTwo;
exports.nearestPowerOfTwo = functionObject_nearestPowerOfTwo;
exports.closeTo = functionObject_closeTo;
exports.sign = functionObject_sign;
exports.triangleArea = functionObject_triangleArea;
exports.barycentricInterpolation = functionObject_barycentricInterpolation;
exports.smoothstep = functionObject_smoothstep;
exports.randomSeed = functionObject_randomSeed;
exports.fastRandom = functionObject_fastRandom;
