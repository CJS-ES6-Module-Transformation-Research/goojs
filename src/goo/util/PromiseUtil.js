Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromiseUtils = undefined;

var _PromiseUtils = require("../util/PromiseUtils");

var PromiseUtils = _interopRequireWildcard(_PromiseUtils);

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

exports.PromiseUtils = PromiseUtils;
