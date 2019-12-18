import { Quad } from "../../shapes/Quad";
import { Camera } from "../../renderer/Camera";
import { Vector3 } from "../../math/Vector3";
var functionObject_quad;
var functionObject_camera;

/**
 * Utility class with a default setup parallel camera and fullscreen quad for fullscreen pass usage
 */
function FullscreenUtils() {}

var camera = new Camera();
camera.projectionMode = Camera.Parallel;
camera.setFrustum(0, 1, -1, 1, 1, -1);
camera._left.copy(Vector3.UNIT_X).negate();
camera._up.copy(Vector3.UNIT_Y);
camera._direction.copy(Vector3.UNIT_Z);
camera.onFrameChange();
functionObject_camera = camera;
functionObject_quad = new Quad(2, 2);
export { functionObject_camera as camera, functionObject_quad as quad };