import { Transform as Transformjs } from "../math/Transform";
var Joint_NO_PARENT;
var Joint__parentIndex;
function Joint(name) {
	this._name = name;

	this._index = 0;
	Joint__parentIndex = Joint_NO_PARENT;;
	this._inverseBindPose = new Transformjs();
}

Joint_NO_PARENT = -32768;;

export { Joint_NO_PARENT as NO_PARENT };
var exported_Joint = Joint;

/**
 * Representation of a Joint in a Skeleton. Meant to be used within a specific Skeleton object.
 * @param {string} name Name of joint
 */
export { exported_Joint as Joint };