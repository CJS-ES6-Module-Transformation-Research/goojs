Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FullscreenUtils;

var _Quad = require("../../shapes/Quad");

var _Quad2 = _interopRequireDefault(_Quad);

var _Camera = require("../../renderer/Camera");

var _Camera2 = _interopRequireDefault(_Camera);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Utility class with a default setup parallel camera and fullscreen quad for fullscreen pass usage
 */
function FullscreenUtils() {}

var camera = new _Camera2.default();
camera.projectionMode = _Camera2.default.Parallel;
camera.setFrustum(0, 1, -1, 1, 1, -1);
camera._left.copy(_Vector2.default.UNIT_X).negate();
camera._up.copy(_Vector2.default.UNIT_Y);
camera._direction.copy(_Vector2.default.UNIT_Z);
camera.onFrameChange();
FullscreenUtils.camera = camera;

FullscreenUtils.quad = new _Quad2.default(2, 2);
module.exports = exports.default;
