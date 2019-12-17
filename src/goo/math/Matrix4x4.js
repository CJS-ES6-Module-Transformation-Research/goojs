import { Matrix4 } from "./Matrix4";
import * as ObjectUtils from "../util/ObjectUtils";

var Matrix4x4 = ObjectUtils.warnOnce(
	'Matrix4x4 has been renamed to Matrix4.',
	function () {
		Matrix4.apply(this, arguments);
	}
);

let exported_Matrix4x4 = Matrix4x4;

Matrix4x4.prototype = Object.create(Matrix4.prototype);
Matrix4x4.prototype.constructor = Matrix4x4;
for (var x in Matrix4) {
	Matrix4x4[x] = Matrix4[x];
}

export { exported_Matrix4x4 as Matrix4x4 };
