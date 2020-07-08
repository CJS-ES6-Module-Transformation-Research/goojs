import { Quad as shapesQuad_Quadjs } from "../../shapes/Quad";
import { Camera as rendererCamera_Camerajs } from "../../renderer/Camera";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
var FullscreenUtils_quad;
var FullscreenUtils_camera;

/**
 * Utility class with a default setup parallel camera and fullscreen quad for fullscreen pass usage
 */
function FullscreenUtils() {}

var camera = new rendererCamera_Camerajs();
camera.projectionMode = rendererCamera_Camerajs.Parallel;
camera.setFrustum(0, 1, -1, 1, 1, -1);
camera._left.copy(mathVector3_Vector3js.UNIT_X).negate();
camera._up.copy(mathVector3_Vector3js.UNIT_Y);
camera._direction.copy(mathVector3_Vector3js.UNIT_Z);
camera.onFrameChange();
FullscreenUtils_camera = camera;;

FullscreenUtils_quad = new shapesQuad_Quadjs(2, 2);;

export { FullscreenUtils_camera as camera, FullscreenUtils_quad as quad, FullscreenUtils };