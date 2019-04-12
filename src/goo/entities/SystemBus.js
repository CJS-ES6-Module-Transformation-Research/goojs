Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Bus = require("./Bus");

var _Bus2 = _interopRequireDefault(_Bus);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * SystemBus is a global instance of the {@link Bus} class.
 * @target-class SystemBus SystemBus constructor
 * @require-pathvar SystemBus = require('../../entities/SystemBus');
 * @group entities
 */
exports.default = new _Bus2.default();
;
module.exports = exports.default;
