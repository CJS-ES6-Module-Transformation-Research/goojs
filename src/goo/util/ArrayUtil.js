Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayUtils = undefined;

var _ArrayUtils = require("../util/ArrayUtils");

var ArrayUtils = _interopRequireWildcard(_ArrayUtils);

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

exports.ArrayUtils = ArrayUtils;
