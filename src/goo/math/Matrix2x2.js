import { Matrix2 as Matrix2_Matrix2js } from "./Matrix2";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";

var Matrix2x2 = utilObjectUtils_ObjectUtilsjs.warnOnce(
	'Matrix2x2 has been renamed to Matrix2.',
	function () {
		Matrix2_Matrix2js.apply(this, arguments);
	}
);

Matrix2x2.prototype = Object.create(Matrix2_Matrix2js.prototype);
Matrix2x2.prototype.constructor = Matrix2x2;
for (var x in Matrix2_Matrix2js) {
	Matrix2x2[x] = Matrix2_Matrix2js[x];
}

var Matrix2x2_Matrix2x2;

Matrix2x2_Matrix2x2 = Matrix2x2;
export { Matrix2x2_Matrix2x2 as Matrix2x2 };
