Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = JsonHandler;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _ConfigHandler2 = _interopRequireDefault(_ConfigHandler);

var _PromiseUtils = require("../../util/PromiseUtils");

var _PromiseUtils2 = _interopRequireDefault(_PromiseUtils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Handler for loading json objects.
 *
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 *
 * @extends ConfigHandler
 * @private
 */
function JsonHandler() {
  _ConfigHandler2.default.apply(this, arguments);
}

JsonHandler.prototype = Object.create(_ConfigHandler2.default.prototype);
JsonHandler.prototype.constructor = JsonHandler;
_ConfigHandler2.default._registerClass('json', JsonHandler);

/**
 * Adds/updates/removes a json data object.
 *
 * @param {string} ref
 * @param {Object} config
 * @returns {RSVP.Promise} Resolves with the updated shader or null if removed
 */
JsonHandler.prototype._update = function (ref, config) {
  if (!config) {
    this._remove(ref);
    return _PromiseUtils2.default.resolve();
  }

  var data;
  try {
    data = JSON.parse(config.body);
  } catch (error) {
    data = {};
  }

  return _PromiseUtils2.default.resolve(data);
};
module.exports = exports.default;
