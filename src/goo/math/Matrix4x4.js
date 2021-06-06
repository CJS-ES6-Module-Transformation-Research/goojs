import { Matrix4 as Matrix4_Matrix4 } from "./Matrix4";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../util/ObjectUtils";

var Matrix4x4 = ObjectUtils_ObjectUtils.warnOnce(
	'Matrix4x4 has been renamed to Matrix4.',
	function () {
		Matrix4_Matrix4.apply(this, arguments);
	}
);

Matrix4x4.prototype = Object.create(Matrix4_Matrix4.prototype);
Matrix4x4.prototype.constructor = Matrix4x4;
for (var x in Matrix4_Matrix4) {
	Matrix4x4[x] = Matrix4_Matrix4[x];
}

var mod_Matrix4x4;

mod_Matrix4x4 = Matrix4x4;
export { mod_Matrix4x4 as Matrix4x4 };
