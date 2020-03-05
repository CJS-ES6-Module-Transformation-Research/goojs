import { Matrix4 as Matrix4_Matrix4js } from "./Matrix4";
import { ObjectUtils as ObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";

var Matrix4x4 = ObjectUtils_ObjectUtilsjs.warnOnce(
	'Matrix4x4 has been renamed to Matrix4.',
	function () {
		Matrix4_Matrix4js.apply(this, arguments);
	}
);

let exported_Matrix4x4 = Matrix4x4;

Matrix4x4.prototype = Object.create(Matrix4_Matrix4js.prototype);
Matrix4x4.prototype.constructor = Matrix4x4;
for (var x in Matrix4_Matrix4js) {
	Matrix4x4[x] = Matrix4_Matrix4js[x];
}

export { exported_Matrix4x4 as Matrix4x4 };
