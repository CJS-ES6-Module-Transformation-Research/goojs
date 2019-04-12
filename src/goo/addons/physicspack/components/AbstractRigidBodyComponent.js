Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = AbstractRigidBodyComponent;

var _Component = require("../../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

var _Quaternion = require("../../../math/Quaternion");

var _Quaternion2 = _interopRequireDefault(_Quaternion);

var _Transform = require("../../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var tmpQuat = new _Quaternion2.default();

/**
 * Base class for rigid bodies.
 * @extends Component
 */
function AbstractRigidBodyComponent() {
	_Component2.default.call(this, arguments);

	/**
  * Joints on the body. Use .addJoint to add one, or .removeJoint to remove.
  * @type {Array}
  */
	this.joints = [];
}

AbstractRigidBodyComponent.prototype = Object.create(_Component2.default.prototype);
AbstractRigidBodyComponent.prototype.constructor = AbstractRigidBodyComponent;

/**
 * @param {PhysicsJoint}  joint
 */
AbstractRigidBodyComponent.prototype.addJoint = function (joint) {
	this.joints.push(joint);
};

/**
 * @param {PhysicsJoint}  joint
 */
AbstractRigidBodyComponent.prototype.removeJoint = function (joint) {
	var joints = this.joints;
	var index = joints.indexOf(joint);
	if (index !== -1) {
		joints.splice(index, 1);
	}
};

AbstractRigidBodyComponent.initializedEvent = {
	entity: null
};

/**
 * Should be called by subclasses when initializing the physics engine body.
 * @param  {Entity} entity
 */
AbstractRigidBodyComponent.prototype.emitInitialized = function (entity) {
	var event = AbstractRigidBodyComponent.initializedEvent;
	event.entity = entity;
	_SystemBus2.default.emit('goo.physics.initialized', event);
	event.entity = null; // Remove reference, don't need it any more
};

/**
 * Creates the physics engine rigid body and adds it to the simulation
 * @virtual
 */
AbstractRigidBodyComponent.prototype.initialize = function () {};

/**
 * @virtual
 */
AbstractRigidBodyComponent.prototype.destroy = function () {};

/**
 * Creates a joint in the physics engine.
 * @virtual
 * @param {PhysicsJoint}  joint
 * @param {Entity} entity
 * @param {System} system
 */
AbstractRigidBodyComponent.prototype.initializeJoint = function () /*joint, entity, system*/{};

/**
 * Removes a joint from the physics engine.
 * @virtual
 * @param {PhysicsJoint}  joint
 */
AbstractRigidBodyComponent.prototype.destroyJoint = function () /*joint*/{};

var inverseBodyTransform = new _Transform2.default();
var trans = new _Transform2.default();
var trans2 = new _Transform2.default();

/**
 * Traverse the tree of colliders from a root entity and down.
 * @param  {Entity}   entity
 * @param  {Function} callback A callback to be called for each collider below or on the same entity. The arguments to the callback are: colliderEntity, collider, localPosition and localQuaternion.
 */
AbstractRigidBodyComponent.prototype.traverseColliders = function (entity, callback) {
	var bodyTransform = entity.transformComponent.sync().worldTransform;
	inverseBodyTransform.copy(bodyTransform);
	inverseBodyTransform.invert(inverseBodyTransform);

	// Traverse the entities depth first, but skip nodes below other rigid body components
	var queue = [entity];
	while (queue.length) {
		var childEntity = queue.pop();

		var collider = childEntity.colliderComponent;
		if (collider) {
			childEntity.transformComponent.sync();

			// Look at the world transform and then get the transform relative to the root entity. This is needed for compounds with more than one level of recursion
			trans.copy(childEntity.transformComponent.worldTransform);
			_Transform2.default.combine(inverseBodyTransform, trans, trans2);

			var offset = trans2.translation;
			var rot = trans2.rotation;
			tmpQuat.fromRotationMatrix(rot);

			// Add the shape
			callback.call(this, childEntity, collider.collider, offset, tmpQuat);
		}

		// Add children that don't have rigid body components.
		var childTransformComponents = childEntity.transformComponent.children;
		for (var i = 0; i < childTransformComponents.length; i++) {
			var e = childTransformComponents[i].entity;
			if (!e.rigidBodyComponent) {
				queue.push(e);
			}
		}
	}
};

/**
 * @private
 * @virtual
 * @param entity
 */
AbstractRigidBodyComponent.prototype.attached = function () /*entity*/{};

/**
 * @private
 * @param entity
 */
AbstractRigidBodyComponent.prototype.attached = function (entity) {
	this._entity = entity;
	this._system = entity._world.getSystem('PhysicsSystem');
};

/**
 * @private
 * @param entity
 */
AbstractRigidBodyComponent.prototype.detached = function () /*entity*/{
	this._entity = null;
	this._system = null;
};
module.exports = exports.default;
