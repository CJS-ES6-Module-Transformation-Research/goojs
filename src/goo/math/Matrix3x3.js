var Matrix3x3_x;
import { Matrix3 as Matrix3_Matrix3js } from "./Matrix3";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";

var Matrix3x3 = utilObjectUtils_ObjectUtilsjs.warnOnce(
	'Matrix3x3 has been renamed to Matrix3.',
	function () {
		Matrix3_Matrix3js.apply(this, arguments);
	}
);

Matrix3x3.prototype = Object.create(Matrix3_Matrix3js.prototype);
Matrix3x3.prototype.constructor = Matrix3x3;
for (var x in Matrix3_Matrix3js) {
	Matrix3x3_x = Matrix3_Matrix3js[x];
}

export { Matrix3x3 };
