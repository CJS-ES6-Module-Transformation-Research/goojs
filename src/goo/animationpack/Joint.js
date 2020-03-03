Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Joint = exports.NO_PARENT = undefined;

var _Transform = require("../math/Transform");

var Joint_NO_PARENT;
var Joint__parentIndex;
function Joint(name) {
	this._name = name;

	this._index = 0;
	Joint__parentIndex = Joint_NO_PARENT;;
	this._inverseBindPose = new _Transform.Transform();
}

exports.NO_PARENT = Joint_NO_PARENT = -32768;;

exports.NO_PARENT = Joint_NO_PARENT;

var exported_Joint = Joint;

/**
 * Representation of a Joint in a Skeleton. Meant to be used within a specific Skeleton object.
 * @param {string} name Name of joint
 */
exports.Joint = exported_Joint;
