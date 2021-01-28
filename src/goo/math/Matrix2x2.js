var x;
import { Matrix2 as Matrix2_Matrix2 } from "./Matrix2";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../util/ObjectUtils";

var Matrix2x2 = ObjectUtils_ObjectUtils.warnOnce(
	'Matrix2x2 has been renamed to Matrix2.',
	function () {
		Matrix2_Matrix2.apply(this, arguments);
	}
);

Matrix2x2.prototype = Object.create(Matrix2_Matrix2.prototype);
Matrix2x2.prototype.constructor = Matrix2x2;
for (var x in Matrix2_Matrix2) {
	x = Matrix2_Matrix2[x];
}

export { mod_Matrix2x2 as Matrix2x2 };
