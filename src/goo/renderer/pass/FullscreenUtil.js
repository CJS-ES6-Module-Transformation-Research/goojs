Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullscreenUtils = undefined;

var _FullscreenUtils = require("../../renderer/pass/FullscreenUtils");

var FullscreenUtils = _interopRequireWildcard(_FullscreenUtils);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

exports.FullscreenUtils = FullscreenUtils;
