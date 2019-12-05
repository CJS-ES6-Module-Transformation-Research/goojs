import { Matrix2 } from "./Matrix2";
import * as ObjectUtils from "../util/ObjectUtils";

var Matrix2x2 = ObjectUtils.warnOnce(
	'Matrix2x2 has been renamed to Matrix2.',
	function () {
		Matrix2.apply(this, arguments);
	}
);

let exported_Matrix2x2 = Matrix2x2;

Matrix2x2.prototype = Object.create(Matrix2.prototype);
Matrix2x2.prototype.constructor = Matrix2x2;
for (var x in Matrix2) {
	Matrix2x2[x] = Matrix2[x];
}

export { exported_Matrix2x2 as Matrix2x2 };
