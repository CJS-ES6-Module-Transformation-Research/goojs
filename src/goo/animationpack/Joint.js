Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Joint;

var _Transform = require("../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Representation of a Joint in a Skeleton. Meant to be used within a specific Skeleton object.
 * @param {string} name Name of joint
 */
function Joint(name) {
	this._name = name;

	this._index = 0;
	this._parentIndex = Joint.NO_PARENT;
	this._inverseBindPose = new _Transform2.default();
}

Joint.NO_PARENT = -32768;
module.exports = exports.default;
