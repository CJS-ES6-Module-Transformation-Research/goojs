import { Vector2 as Vector2js } from "../Vector2";
import { Vector3 as Vector3js } from "../Vector3";
import { Vector4 as Vector4js } from "../Vector4";
var Spline_cubicInterpolation;
var Spline_quadraticInterpolation;
function Spline(controlPoints) {
	// array of any sort of Vector
	this.controlPoints = controlPoints;
	this.segments = (this.controlPoints.length - 1) / 3;
}

(function () {
	// should be of the same type as p0, p1, p2
	var term0_v4 = new Vector4js();
	var term1_v4 = new Vector4js();
	var term2_v4 = new Vector4js();

	var term0_v3 = new Vector3js();
	var term1_v3 = new Vector3js();
	var term2_v3 = new Vector3js();

	var term0_v2 = new Vector2js();
	var term1_v2 = new Vector2js();
	var term2_v2 = new Vector2js();

	/**
	 * Interpolate on a quadratic Bezier curve
	 * @param {Vector} p0 First control point
	 * @param {Vector} p1 Second control point
	 * @param {Vector} p2 Third control point
	 * @param {number} t Takes values between 0 and 1
	 * @param {Vector} store Vector to store the result to
	 */
	Spline_quadraticInterpolation = function(p0, p1, p2, t, store) {
        // B(t) =
        // (1 - t)^2 * P0 +
        // 2 * (1 - t) * t * P1 +
        // t^2 * P2

        var t2 = t * t;

        var it = 1 - t;
        var it2 = it * it;

        if (store instanceof Vector4js) {
            p0.copyTo(term0_v4);
            term0_v4.scale(it2);

            p1.copyTo(term1_v4);
            term1_v4.scale(it * t * 2);

            p2.copyTo(term2_v4);
            term2_v4.scale(t2);

            store.set(term0_v4).add(term1_v4).add(term2_v4);
        } else if (store instanceof Vector3js) {
            p0.copyTo(term0_v3);
            term0_v3.scale(it2);

            p1.copyTo(term1_v3);
            term1_v3.scale(it * t * 2);

            p2.copyTo(term2_v3);
            term2_v3.scale(t2);

            store.set(term0_v3).add(term1_v3).add(term2_v3);
        } else if (store instanceof Vector2js) {
            p0.copyTo(term0_v2);
            term0_v2.scale(it2);

            p1.copyTo(term1_v2);
            term1_v2.scale(it * t * 2);

            p2.copyTo(term2_v2);
            term2_v2.scale(t2);

            store.set(term0_v2).add(term1_v2).add(term2_v2);
        }
    };;
})();

(function () {
	// should be of the same type as p0, p1, p2, p3
	var term0_v4 = new Vector4js();
	var term1_v4 = new Vector4js();
	var term2_v4 = new Vector4js();
	var term3_v4 = new Vector4js();

	var term0_v3 = new Vector3js();
	var term1_v3 = new Vector3js();
	var term2_v3 = new Vector3js();
	var term3_v3 = new Vector3js();

	var term0_v2 = new Vector2js();
	var term1_v2 = new Vector2js();
	var term2_v2 = new Vector2js();
	var term3_v2 = new Vector2js();

	/**
	 * Interpolate on a quadratic Bezier curve
	 * @param {Vector} p0 First control point
	 * @param {Vector} p1 Second control point
	 * @param {Vector} p2 Third control point
	 * @param {Vector} p3 Fourth control point
	 * @param {number} t Takes values between 0 and 1
	 * @param {Vector} store Vector to store the result to
	 */
	Spline_cubicInterpolation = function(p0, p1, p2, p3, t, store) {
        // B(t) =
        // (1 - t)^3 * P0 +
        // 3 * (1 - t)^2 * t * P1 +
        // 3 * (1 - t) * t^2 * P2 +
        // t^3 * P3

        var t2 = t * t;
        var t3 = t2 * t;

        var it = 1 - t;
        var it2 = it * it;
        var it3 = it2 * it;

        if (store instanceof Vector4js) {
            p0.copyTo(term0_v4);
            term0_v4.scale(it3);

            p1.copyTo(term1_v4);
            term1_v4.scale(it2 * t * 3);

            p2.copyTo(term2_v4);
            term2_v4.scale(it * t2 * 3);

            p3.copyTo(term3_v4);
            term3_v4.scale(t3);

            store.set(term0_v4).add(term1_v4).add(term2_v4).add(term3_v4);
        } else if (store instanceof Vector3js) {
            p0.copyTo(term0_v3);
            term0_v3.scale(it3);

            p1.copyTo(term1_v3);
            term1_v3.scale(it2 * t * 3);

            p2.copyTo(term2_v3);
            term2_v3.scale(it * t2 * 3);

            p3.copyTo(term3_v3);
            term3_v3.scale(t3);

            store.set(term0_v3).add(term1_v3).add(term2_v3).add(term3_v3);
        } else if (store instanceof Vector2js) {
            p0.copyTo(term0_v2);
            term0_v2.scale(it3);

            p1.copyTo(term1_v2);
            term1_v2.scale(it2 * t * 3);

            p2.copyTo(term2_v2);
            term2_v2.scale(it * t2 * 3);

            p3.copyTo(term3_v2);
            term3_v2.scale(t3);

            store.set(term0_v2).add(term1_v2).add(term2_v2).add(term3_v2);
        }
    };;
})();

/**
 * Stores the coordinates of the point on the spline at a given t
 * @param {number} t Takes values between 0 and 1
 * @param {Vector} store A vector to store the result in
 */
Spline.prototype.getPoint = function (t, store) {
	if (t <= 0) {
		store.set(this.controlPoints[0]);
		return;
	} else if (t >= 1) {
		store.set(this.controlPoints[this.controlPoints.length - 1]);
		return;
	}

	var point = this.segments * t;
	var index = Math.floor(point);
	var fraction = point - index;

	var p0 = this.controlPoints[index * 3 + 0];
	var p1 = this.controlPoints[index * 3 + 1];
	var p2 = this.controlPoints[index * 3 + 2];
	var p3 = this.controlPoints[index * 3 + 3];

	Spline_cubicInterpolation(p0, p1, p2, p3, fraction, store);
};

export { Spline_quadraticInterpolation as quadraticInterpolation, Spline_cubicInterpolation as cubicInterpolation };
var exported_Spline = Spline;

/**
 * Describes a cubic spline
 * @param {Array<Vector>} controlPoints
 */
export { exported_Spline as Spline };
