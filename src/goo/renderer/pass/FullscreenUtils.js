var mod_FullscreenUtils = FullscreenUtils;
import { Quad as Quad_Quad } from "../../shapes/Quad";
import { Camera as Camera_Camera } from "../../renderer/Camera";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";

/**
 * Utility class with a default setup parallel camera and fullscreen quad for fullscreen pass usage
 */
function FullscreenUtils() {}

var camera = new Camera_Camera();
camera.projectionMode = Camera_Camera.Parallel;
camera.setFrustum(0, 1, -1, 1, 1, -1);
camera._left.copy(Vector3_Vector3.UNIT_X).negate();
camera._up.copy(Vector3_Vector3.UNIT_Y);
camera._direction.copy(Vector3_Vector3.UNIT_Z);
camera.onFrameChange();
FullscreenUtils.camera = camera;

FullscreenUtils.quad = new Quad_Quad(2, 2);

/**
 * Utility class with a default setup parallel camera and fullscreen quad for fullscreen pass usage
 */
export { mod_FullscreenUtils as FullscreenUtils };