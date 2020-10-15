var Matrix4x4_x;
import { Matrix4 as Matrix4_Matrix4js } from "./Matrix4";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";

var Matrix4x4 = utilObjectUtils_ObjectUtilsjs.warnOnce(
	'Matrix4x4 has been renamed to Matrix4.',
	function () {
		Matrix4_Matrix4js.apply(this, arguments);
	}
);

Matrix4x4.prototype = Object.create(Matrix4_Matrix4js.prototype);
Matrix4x4.prototype.constructor = Matrix4x4;
for (var x in Matrix4_Matrix4js) {
	Matrix4x4_x = Matrix4_Matrix4js[x];
}

export { Matrix4x4 };
