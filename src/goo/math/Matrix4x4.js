import { Matrix4 as Matrix4js } from "./Matrix4";
import { warnOnce as ObjectUtilsjs_warnOnce } from "../util/ObjectUtils";

var Matrix4x4 = ObjectUtilsjs_warnOnce(
	'Matrix4x4 has been renamed to Matrix4.',
	function () {
		Matrix4js.apply(this, arguments);
	}
);

let exported_Matrix4x4 = Matrix4x4;

Matrix4x4.prototype = Object.create(Matrix4js.prototype);
Matrix4x4.prototype.constructor = Matrix4x4;
for (var x in Matrix4js) {
	Matrix4x4[x] = Matrix4js[x];
}

export { exported_Matrix4x4 as Matrix4x4 };
