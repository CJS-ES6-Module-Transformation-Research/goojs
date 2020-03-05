import { Quad as Quad_Quadjs } from "../../shapes/Quad";
import { Camera as Camera_Camerajs } from "../../renderer/Camera";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
function FullscreenUtils() {}

var camera = new Camera_Camerajs();
camera.projectionMode = Camera_Camerajs.Parallel;
camera.setFrustum(0, 1, -1, 1, 1, -1);
camera._left.copy(Vector3_Vector3js.UNIT_X).negate();
camera._up.copy(Vector3_Vector3js.UNIT_Y);
camera._direction.copy(Vector3_Vector3js.UNIT_Z);
camera.onFrameChange();
FullscreenUtils.camera = camera;

FullscreenUtils.quad = new Quad_Quadjs(2, 2);

var exported_FullscreenUtils = FullscreenUtils;

/**
 * Utility class with a default setup parallel camera and fullscreen quad for fullscreen pass usage
 */
export { exported_FullscreenUtils as FullscreenUtils };