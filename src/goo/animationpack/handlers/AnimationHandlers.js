Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AnimationClipHandler = require("../../animationpack/handlers/AnimationClipHandler");

var _AnimationClipHandler2 = _interopRequireDefault(_AnimationClipHandler);

var _AnimationComponentHandler = require("../../animationpack/handlers/AnimationComponentHandler");

var _AnimationComponentHandler2 = _interopRequireDefault(_AnimationComponentHandler);

var _AnimationLayersHandler = require("../../animationpack/handlers/AnimationLayersHandler");

var _AnimationLayersHandler2 = _interopRequireDefault(_AnimationLayersHandler);

var _AnimationStateHandler = require("../../animationpack/handlers/AnimationStateHandler");

var _AnimationStateHandler2 = _interopRequireDefault(_AnimationStateHandler);

var _SkeletonHandler = require("../../animationpack/handlers/SkeletonHandler");

var _SkeletonHandler2 = _interopRequireDefault(_SkeletonHandler);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	AnimationClipHandler: _AnimationClipHandler2.default,
	AnimationComponentHandler: _AnimationComponentHandler2.default,
	AnimationLayersHandler: _AnimationLayersHandler2.default,
	AnimationStateHandler: _AnimationStateHandler2.default,
	SkeletonHandler: _SkeletonHandler2.default
};
;
module.exports = exports.default;
