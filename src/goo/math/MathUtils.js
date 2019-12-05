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

functionObject_DEG_TO_RAD = Math.PI / 180;
functionObject_RAD_TO_DEG = 180 / Math.PI;
functionObject_HALF_PI = 0.5 * Math.PI;
functionObject_TWO_PI = 2 * Math.PI;
functionObject_EPSILON = 0.00001;

functionObject_radFromDeg = function(degrees) {
    return degrees * functionObject_DEG_TO_RAD;
};

functionObject_degFromRad = function(radians) {
    return radians * functionObject_RAD_TO_DEG;
};

functionObject_lerp = function(factor, start, end) {
    if (start === end) {
        return start;
    } else {
        return start + (end - start) * factor;
    }
};

functionObject_clamp = function(value, min, max) {
    if (min < max) {
        return (value < min ? min : (value > max ? max : value));
    } else {
        return (value < max ? max : (value > min ? min : value));
    }
};

functionObject_radialClamp = function(value, min, max) {
    // Rotating coordinates to be mirrored
    var zero = (min + max) / 2 + ((max > min ? Math.PI : 0));
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

    return (_value < _min ? min : (_value > _max ? max : value));
};

functionObject_moduloPositive = function(value, size) {
    var wrappedValue = value % size;
    wrappedValue += (wrappedValue < 0 ? size : 0);
    return wrappedValue;
};

functionObject_scurve3 = function(x) {
    return (-2 * x + 3) * x * x;
};

functionObject_scurve5 = function(x) {
    return ((6 * x - 15) * x + 10) * x * x * x;
};

functionObject_sphericalToCartesian = function(radius, azimuth, polar, store) {
    var a = radius * Math.cos(polar);

    store.x = a * Math.cos(azimuth);
    store.y = radius * Math.sin(polar);
    store.z = a * Math.sin(azimuth);
};

functionObject_cartesianToSpherical = function(x, y, z, store) {
    var a = Math.sqrt(x * x + z * z);
    store.x = Math.sqrt(x * x + y * y + z * z); // radius
    store.y = Math.atan2(z, x); // azimuth
    store.z = Math.atan2(y, a); // polar
};

functionObject_getTriangleNormal = function(p1x, p1y, p1z, p2x, p2y, p2z, p3x, p3y, p3z) {
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

functionObject_isPowerOfTwo = function(value) {
    return (value & value - 1) === 0;
};

functionObject_nearestPowerOfTwo = function(value) {
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

functionObject_closeTo = function(v1, v2, tolerance) {
    tolerance = (typeof tolerance !== "undefined" ? tolerance : 0.001);
    return Math.abs(v1 - v2) <= tolerance;
};

functionObject_sign = function(value) {
    return (value < 0 ? -1 : (value > 0 ? 1 : 0));
};

functionObject_triangleArea = function(t1, t2, t3) {
    return Math.abs(
        t1.x * t2.y + t2.x * t3.y + t3.x * t1.y - t2.y * t3.x - t3.y * t1.x - t1.y * t2.x
    ) / 2;
};

functionObject_barycentricInterpolation = function(t1, t2, t3, p) {
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

functionObject_smoothstep = function(edge0, edge1, x) {
    x = functionObject_clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return x * x * (3 - 2 * x);
};

functionObject_randomSeed = 1337;

functionObject_fastRandom = function() {
    MathUtils.randomSeed = (MathUtils.randomSeed * 9301 + 49297) % 233280;
    return functionObject_randomSeed / 233280;
};

functionObject_floatToHalfFloat = function() {
    var floatView = new Float32Array(1);
    var int32View = new Int32Array(floatView.buffer);

    return function(fval) {
        floatView[0] = fval;
        var fbits = int32View[0];
        var sign = fbits >> 16 & 32768;
        var val = (fbits & 2147483647) + 4096;

        if (val >= 1199570944) {
            if ((fbits & 2147483647) >= 1199570944) {
                if (val < 2139095040) {
                    return sign | 31744;
                }
                return sign | 31744 | (fbits & 8388607) >> 13;
            }
            return sign | 31743;
        }
        if (val >= 947912704) {
            return sign | val - 939524096 >> 13;
        }
        if (val < 855638016) {
            return sign;
        }
        val = (fbits & 2147483647) >> 23;
        return sign | (fbits & 8388607 | 8388608) + (8388608 >>> val - 102) >> 126 - val;
    };
}();

functionObject_warnNaN = function(object, property) {
    var value = object[property];

    Object.defineProperty(object, property, {
        get: function() {
            return value;
        },

        set: function(_value) {
            if (isNaN(_value)) {
                throw new Error("Tried to assign NaN to " + property);
            }
            value = _value;
        }
    });
};

export { functionObject_DEG_TO_RAD as DEG_TO_RAD, functionObject_HALF_PI as HALF_PI, functionObject_TWO_PI as TWO_PI, functionObject_EPSILON as EPSILON, functionObject_lerp as lerp, functionObject_clamp as clamp, functionObject_radialClamp as radialClamp, functionObject_moduloPositive as moduloPositive, functionObject_scurve3 as scurve3, functionObject_scurve5 as scurve5, functionObject_sphericalToCartesian as sphericalToCartesian, functionObject_getTriangleNormal as getTriangleNormal, functionObject_isPowerOfTwo as isPowerOfTwo, functionObject_nearestPowerOfTwo as nearestPowerOfTwo, functionObject_sign as sign, functionObject_barycentricInterpolation as barycentricInterpolation, functionObject_smoothstep as smoothstep, functionObject_randomSeed as randomSeed, functionObject_fastRandom as fastRandom };