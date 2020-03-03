import { Matrix2 as Matrix2js } from "./Matrix2";
import { warnOnce as ObjectUtilsjs_warnOnce } from "../util/ObjectUtils";

var Matrix2x2 = ObjectUtilsjs_warnOnce(
	'Matrix2x2 has been renamed to Matrix2.',
	function () {
		Matrix2js.apply(this, arguments);
	}
);

let exported_Matrix2x2 = Matrix2x2;

Matrix2x2.prototype = Object.create(Matrix2js.prototype);
Matrix2x2.prototype.constructor = Matrix2x2;
for (var x in Matrix2js) {
	Matrix2x2[x] = Matrix2js[x];
}

export { exported_Matrix2x2 as Matrix2x2 };
