import { Matrix3 } from "./Matrix3";
import * as ObjectUtils from "../util/ObjectUtils";

var Matrix3x3 = ObjectUtils.warnOnce(
	'Matrix3x3 has been renamed to Matrix3.',
	function () {
		Matrix3.apply(this, arguments);
	}
);

let exported_Matrix3x3 = Matrix3x3;

Matrix3x3.prototype = Object.create(Matrix3.prototype);
Matrix3x3.prototype.constructor = Matrix3x3;
for (var x in Matrix3) {
	Matrix3x3[x] = Matrix3[x];
}

export { exported_Matrix3x3 as Matrix3x3 };
