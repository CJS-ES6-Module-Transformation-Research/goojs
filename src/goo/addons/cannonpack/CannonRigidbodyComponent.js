Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CannonRigidbodyComponent = undefined;

var _Component = require("../../entities/components/Component");

var _Quaternion = require("../../math/Quaternion");

var _Vector = require("../../math/Vector3");

var _Transform = require("../../math/Transform");

var _ObjectUtils = require("../../util/ObjectUtils");

function CannonRigidbodyComponent(settings) {
	_Component.Component.apply(this, arguments);

	settings = settings || {};
	this.type = 'CannonRigidbodyComponent';

	(0, _ObjectUtils.defaults)(settings, {
		mass: 1,
		velocity: new _Vector.Vector3()
		// Todo: a lot of more things from Cannon.js API
	}); //! AT: this is modifying the settings object which is bad practice (as in 'unintended side effects')

	this.mass = settings.mass;
	this._initialPosition = null;
	this._initialVelocity = new _Vector.Vector3();
	this._initialVelocity.set(settings.velocity);
	this.body = null;
	this.centerOfMassOffset = new _Vector.Vector3();
}

CannonRigidbodyComponent.prototype = Object.create(_Component.Component.prototype);
CannonRigidbodyComponent.constructor = CannonRigidbodyComponent;

CannonRigidbodyComponent.prototype.api = {
	setForce: function setForce(force) {
		CannonRigidbodyComponent.prototype.setForce.call(this.cannonRigidbodyComponent, force);
	},
	setVelocity: function setVelocity(velocity) {
		CannonRigidbodyComponent.prototype.setVelocity.call(this.cannonRigidbodyComponent, velocity);
	},
	// schteppe: needs to be separate from the transformcomponent setTranslation, since the transformcomponent data will get overridden by physics
	setPosition: function setPosition(pos) {
		CannonRigidbodyComponent.prototype.setPosition.call(this.cannonRigidbodyComponent, pos);
	},
	setAngularVelocity: function setAngularVelocity(angularVelocity) {
		CannonRigidbodyComponent.prototype.setAngularVelocity.call(this.cannonRigidbodyComponent, angularVelocity);
	}
};

var tmpQuat = new _Quaternion.Quaternion();

/**
 * Set the force on the body
 * @param {Vector3} force
 */
CannonRigidbodyComponent.prototype.setForce = function (force) {
	this.body.force.set(force.x, force.y, force.z);
};

/**
 * Set the velocity on the body
 * @param {Vector3} velocity
 */
CannonRigidbodyComponent.prototype.setVelocity = function (velocity) {
	this.body.velocity.set(velocity.x, velocity.y, velocity.z);
};

/**
 * Set the body position.
 * @param {Vector3} position
 */
CannonRigidbodyComponent.prototype.setPosition = function (pos) {
	if (this.body) {
		this.body.position.set(pos.x, pos.y, pos.z);
	} else {
		this._initialPosition = new _Vector.Vector3(pos);
	}
};

/**
 * Set the body angular velocity position.
 * @param {Vector3} angularVelocity
 */
CannonRigidbodyComponent.prototype.setAngularVelocity = function (angularVelocity) {
	this.body.angularVelocity.set(angularVelocity.x, angularVelocity.y, angularVelocity.z);
};

/**
 * Get the collider component from an entity, if one exist.
 * @returns {mixed} Any of the collider types, or NULL if not found
 */
CannonRigidbodyComponent.getCollider = function (entity) {
	return entity.cannonBoxColliderComponent || entity.cannonPlaneColliderComponent || entity.cannonSphereColliderComponent || entity.cannonTerrainColliderComponent || entity.cannonCylinderColliderComponent || null;
};

CannonRigidbodyComponent.prototype.addShapesToBody = function (entity) {
	var body = entity.cannonRigidbodyComponent.body;

	var collider = CannonRigidbodyComponent.getCollider(entity);
	if (!collider) {
		// Needed for getting the Rigidbody-local transform of each collider
		var bodyTransform = entity.transformComponent.sync().worldTransform;
		var invBodyTransform = new _Transform.Transform();
		invBodyTransform.copy(bodyTransform);
		invBodyTransform.invert(invBodyTransform);
		var gooTrans = new _Transform.Transform();

		var cmOffset = this.centerOfMassOffset;

		entity.traverse(function (childEntity) {
			var collider = CannonRigidbodyComponent.getCollider(childEntity);
			if (collider) {
				// Look at the world transform and then get the transform relative to the root entity. This is needed for compounds with more than one level of recursion
				gooTrans.copy(childEntity.transformComponent.sync().worldTransform);
				var gooTrans2 = new _Transform.Transform();
				Transformjs_combine(invBodyTransform, gooTrans, gooTrans2);
				gooTrans2.update();

				// var gooTrans2 = new Transform();
				// gooTrans2.copy(childEntity.transformComponent.transform);

				var trans = gooTrans2.translation;
				var rot = gooTrans2.rotation;

				var offset = new CANNON.Vec3(trans.x, trans.y, trans.z);
				var q = tmpQuat;
				q.fromRotationMatrix(rot);
				var orientation = new CANNON.Quaternion(q.x, q.y, q.z, q.w);

				// var o2 = orientation.clone();
				// o2.w *= -1;
				// o2.vmult(offset, offset);

				// Subtract center of mass offset
				offset.vadd(cmOffset, offset);

				if (collider.isTrigger) {
					collider.cannonShape.collisionResponse = false;
				}

				// Add the shape
				body.addShape(collider.cannonShape, offset, orientation);
			}
		});
	} else {
		// Entity has a collider on the root
		// Create a simple shape
		body.addShape(collider.cannonShape);
	}
};

var exported_CannonRigidbodyComponent = CannonRigidbodyComponent;

/* global CANNON */

/**
 * Adds Cannon physics to an entity. Should be combined with one of the CannonCollider components, such as the {@link CannonSphereColliderComponent}. Also see {@link CannonSystem}.
 * @extends Component
 * @param {Object} [settings]
 * @param {number} [settings.mass=1]
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @example
 * world.setSystem(new CannonSystem());
 * var entity = world.createEntity();
 * var rigidBodyComponent = new CannonRigidBodyComponent({
 *   mass: 1
 * });
 * entity.setComponent(rigidBodyComponent);
 * var boxColliderComponent = new CannonBoxColliderComponent({
 *   halfExtents: new Vector3(1, 1, 1)
 * });
 * entity.setComponent(boxColliderComponent);
 */
exports.CannonRigidbodyComponent = exported_CannonRigidbodyComponent;
