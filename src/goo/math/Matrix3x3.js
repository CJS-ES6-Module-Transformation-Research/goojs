var x;
import { Matrix3 as Matrix3_Matrix3 } from "./Matrix3";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../util/ObjectUtils";

var Matrix3x3 = ObjectUtils_ObjectUtils.warnOnce(
	'Matrix3x3 has been renamed to Matrix3.',
	function () {
		Matrix3_Matrix3.apply(this, arguments);
	}
);

Matrix3x3.prototype = Object.create(Matrix3_Matrix3.prototype);
Matrix3x3.prototype.constructor = Matrix3x3;
for (var x in Matrix3_Matrix3) {
	x = Matrix3_Matrix3[x];
}

export { mod_Matrix3x3 as Matrix3x3 };
