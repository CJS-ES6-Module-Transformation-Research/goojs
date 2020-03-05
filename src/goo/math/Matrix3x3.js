import { Matrix3 as Matrix3js } from "./Matrix3";
import { ObjectUtils as ObjectUtilsjs } from "../util/ObjectUtils";

var Matrix3x3 = ObjectUtilsjs.warnOnce(
	'Matrix3x3 has been renamed to Matrix3.',
	function () {
		Matrix3js.apply(this, arguments);
	}
);

let exported_Matrix3x3 = Matrix3x3;

Matrix3x3.prototype = Object.create(Matrix3js.prototype);
Matrix3x3.prototype.constructor = Matrix3x3;
for (var x in Matrix3js) {
	Matrix3x3[x] = Matrix3js[x];
}

export { exported_Matrix3x3 as Matrix3x3 };
