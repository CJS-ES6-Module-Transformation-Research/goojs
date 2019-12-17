var _SphereCollider = require("../../../../../src/goo/addons/physicspack/colliders/SphereCollider");

var _Vector = require("../../../../../src/goo/math/Vector3");

var _Quaternion = require("../../../../../src/goo/math/Quaternion");

var _World = require("../../../../../src/goo/entities/World");

var _SystemBus = require("../../../../../src/goo/entities/SystemBus");

var SystemBus = _interopRequireWildcard(_SystemBus);

var _PhysicsMaterial = require("../../../../../src/goo/addons/physicspack/PhysicsMaterial");

var _PhysicsSystem = require("../../../../../src/goo/addons/physicspack/systems/PhysicsSystem");

var _ColliderComponent = require("../../../../../src/goo/addons/physicspack/components/ColliderComponent");

var _RigidBodyComponent = require("../../../../../src/goo/addons/physicspack/components/RigidBodyComponent");

var _BallJoint = require("../../../../../src/goo/addons/physicspack/joints/BallJoint");

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

/* global CANNON */

describe('RigidBodyComponent', function () {
		var world, system, rigidBodyComponent, colliderComponent, entity;

		beforeEach(function () {
				world = new _World.World();
				system = new _PhysicsSystem.PhysicsSystem({
						maxSubSteps: 1
				});
				system.setGravity(new _Vector.Vector3());
				world.setSystem(system);

				rigidBodyComponent = new _RigidBodyComponent.RigidBodyComponent({ mass: 1 });
				colliderComponent = new _ColliderComponent.ColliderComponent({
						collider: new _SphereCollider.SphereCollider({ radius: 1 })
				});
				entity = world.createEntity(rigidBodyComponent, colliderComponent).addToWorld();
				rigidBodyComponent.initialize();
				world.process();
		});

		it('can set linearDamping', function () {
				rigidBodyComponent.linearDamping = 123;
				expect(rigidBodyComponent.cannonBody.linearDamping).toEqual(123);
		});

		it('can set angularDamping', function () {
				rigidBodyComponent.angularDamping = 123;
				expect(rigidBodyComponent.cannonBody.angularDamping).toEqual(123);
		});

		it('can set constraints', function () {
				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_NONE;
				expect(rigidBodyComponent.cannonBody.linearFactor).toEqual(new CANNON.Vec3(1, 1, 1));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_POSITION_X;
				expect(rigidBodyComponent.cannonBody.linearFactor).toEqual(new CANNON.Vec3(0, 1, 1));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_POSITION_Y;
				expect(rigidBodyComponent.cannonBody.linearFactor).toEqual(new CANNON.Vec3(1, 0, 1));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_POSITION_Z;
				expect(rigidBodyComponent.cannonBody.linearFactor).toEqual(new CANNON.Vec3(1, 1, 0));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_ROTATION_X;
				expect(rigidBodyComponent.cannonBody.angularFactor).toEqual(new CANNON.Vec3(0, 1, 1));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_ROTATION_Y;
				expect(rigidBodyComponent.cannonBody.angularFactor).toEqual(new CANNON.Vec3(1, 0, 1));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_ROTATION_Z;
				expect(rigidBodyComponent.cannonBody.angularFactor).toEqual(new CANNON.Vec3(1, 1, 0));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_POSITION;
				expect(rigidBodyComponent.cannonBody.linearFactor).toEqual(new CANNON.Vec3(0, 0, 0));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_ROTATION;
				expect(rigidBodyComponent.cannonBody.angularFactor).toEqual(new CANNON.Vec3(0, 0, 0));

				rigidBodyComponent.constraints = _RigidBodyComponent.RigidBodyComponent.FREEZE_ALL;
				expect(rigidBodyComponent.cannonBody.linearFactor).toEqual(new CANNON.Vec3(0, 0, 0));
				expect(rigidBodyComponent.cannonBody.angularFactor).toEqual(new CANNON.Vec3(0, 0, 0));
		});

		it('can set transform from entity', function () {
				entity.setTranslation(1, 2, 3);
				entity.transformComponent.updateWorldTransform();
				rigidBodyComponent.setTransformFromEntity(entity);
				var position = new _Vector.Vector3();
				rigidBodyComponent.getPosition(position);
				expect(rigidBodyComponent.cannonBody.position).toEqual(new CANNON.Vec3(1, 2, 3));
		});

		it('can applyForce', function () {
				rigidBodyComponent.cannonBody.position.set(1, 2, 3);
				rigidBodyComponent.applyForce(new _Vector.Vector3(1, 2, 3));
				expect(rigidBodyComponent.cannonBody.force).toEqual(new CANNON.Vec3(1, 2, 3));
				expect(rigidBodyComponent.cannonBody.torque).toEqual(new CANNON.Vec3(0, 0, 0));
		});

		it('can applyForceWorld', function () {
				rigidBodyComponent.setPosition(new _Vector.Vector3(1, 2, 3));
				rigidBodyComponent.setQuaternion(new _Quaternion.Quaternion().fromAngleAxis(Math.PI / 4, new _Vector.Vector3(1, 0, 0))); // Should not affect at all
				var worldForce = new _Vector.Vector3(0, 1, 0);
				var worldPosition = new _Vector.Vector3(2, 2, 3); // (1,0,0) relative to the body
				rigidBodyComponent.applyForceWorld(worldForce, worldPosition);
				expect(rigidBodyComponent.cannonBody.force).toEqual(new CANNON.Vec3(0, 1, 0));
				expect(rigidBodyComponent.cannonBody.torque).toEqual(new CANNON.Vec3(0, 0, 1)); // (1,0,0) x (0,1,0) is (0,0,1)
		});

		it('can applyForceLocal', function () {
				rigidBodyComponent.setPosition(new _Vector.Vector3(1, 2, 3));
				var localForce = new _Vector.Vector3(0, 1, 0);
				var localPosition = new _Vector.Vector3(1, 0, 0);
				rigidBodyComponent.applyForceLocal(localForce, localPosition);
				expect(rigidBodyComponent.cannonBody.force).toEqual(new CANNON.Vec3(0, 1, 0));
				expect(rigidBodyComponent.cannonBody.torque).toEqual(new CANNON.Vec3(0, 0, 1)); // (1,0,0) x (0,1,0) is (0,0,1)
		});

		it('can set velocity', function () {
				rigidBodyComponent.setVelocity(new _Vector.Vector3(1, 2, 3));
				expect(rigidBodyComponent.cannonBody.velocity).toEqual(new CANNON.Vec3(1, 2, 3));
		});

		it('can get velocity', function () {
				rigidBodyComponent.cannonBody.velocity.set(1, 2, 3);
				var velocity = new _Vector.Vector3();
				rigidBodyComponent.getVelocity(velocity);
				expect(velocity).toEqual(new _Vector.Vector3(1, 2, 3));
		});

		it('can set position', function () {
				rigidBodyComponent.setPosition(new _Vector.Vector3(1, 2, 3));
				expect(rigidBodyComponent.cannonBody.position).toEqual(new CANNON.Vec3(1, 2, 3));
		});

		it('can set position', function () {
				rigidBodyComponent.setPosition(new _Vector.Vector3(1, 2, 3));
				expect(rigidBodyComponent.cannonBody.position).toEqual(new CANNON.Vec3(1, 2, 3));
		});

		it('can set quaternion', function () {
				rigidBodyComponent.setQuaternion(new _Quaternion.Quaternion(1, 2, 3, 4));
				expect(rigidBodyComponent.cannonBody.quaternion).toEqual(new CANNON.Quaternion(1, 2, 3, 4));
		});

		it('can get quaternion', function () {
				rigidBodyComponent.cannonBody.quaternion.set(1, 2, 3, 4);
				var quat = new _Quaternion.Quaternion();
				rigidBodyComponent.getQuaternion(quat);
				expect(quat).toEqual(new _Quaternion.Quaternion(1, 2, 3, 4));
		});

		it('can set kinematic', function () {
				rigidBodyComponent.isKinematic = true;
				world.process();
				expect(rigidBodyComponent.cannonBody.type).toEqual(CANNON.Body.KINEMATIC);
		});

		it('can destroy itself and rebuild', function () {
				rigidBodyComponent.destroy();
				expect(rigidBodyComponent.cannonBody).toBeFalsy();
				rigidBodyComponent.initialize();
				expect(rigidBodyComponent.cannonBody).toBeTruthy();
		});

		it('can add and remove a BallJoint', function () {
				var joint = new _BallJoint.BallJoint({
						connectedEntity: entity // Self, just for testing!
				});

				rigidBodyComponent.addJoint(joint);
				rigidBodyComponent.initializeJoint(joint);
				expect(joint.cannonJoint).toBeTruthy();

				rigidBodyComponent.removeJoint(joint);
				rigidBodyComponent.destroyJoint(joint);

				expect(joint.cannonJoint).toBeFalsy();
		});

		it('emits initialized', function () {

				rigidBodyComponent = new _RigidBodyComponent.RigidBodyComponent({ mass: 1 });
				colliderComponent = new _ColliderComponent.ColliderComponent({
						collider: new _SphereCollider.SphereCollider({ radius: 1 })
				});
				entity = world.createEntity(rigidBodyComponent, colliderComponent).addToWorld();

				var numEvents = 0;
				var listener = function listener(evt) {
						numEvents++;
						expect(evt.entity).toBe(entity);
				};
				SystemBus.addListener('goo.physics.initialized', listener);

				rigidBodyComponent.initialize();

				SystemBus.removeListener('goo.physics.initialized', listener);

				expect(numEvents).toBe(1);
				expect(rigidBodyComponent.cannonBody).toBeTruthy();
		});

		it('can clone', function () {
				rigidBodyComponent.angularDamping = 0.5;
				rigidBodyComponent.isKinematic = false;
				rigidBodyComponent.linearDamping = 0.5;
				rigidBodyComponent.mass = 2;
				rigidBodyComponent.restitution = 0.5;
				rigidBodyComponent.setAngularVelocity(new _Vector.Vector3(4, 5, 6));
				rigidBodyComponent.setVelocity(new _Vector.Vector3(1, 2, 3));
				rigidBodyComponent.sleepingThreshold = 0.5;
				rigidBodyComponent.sleepingTimeLimit = 3;

				var rigidBodyComponent2 = rigidBodyComponent.clone();

				expect(rigidBodyComponent2.angularDamping).toEqual(0.5);
				expect(rigidBodyComponent2.isKinematic).toEqual(false);
				expect(rigidBodyComponent2.linearDamping).toEqual(0.5);
				expect(rigidBodyComponent2.mass).toEqual(2);
				expect(rigidBodyComponent2.sleepingThreshold).toEqual(0.5);
				expect(rigidBodyComponent2.sleepingTimeLimit).toEqual(3);

				var angularVelocity = new _Vector.Vector3();
				rigidBodyComponent2.getAngularVelocity(angularVelocity);
				expect(angularVelocity).toEqual(new _Vector.Vector3(4, 5, 6));

				var velocity = new _Vector.Vector3();
				rigidBodyComponent2.getVelocity(velocity);
				expect(velocity).toEqual(new _Vector.Vector3(1, 2, 3));
		});

		it('can set sleeping parameters', function () {
				rigidBodyComponent.sleepingThreshold = 4;
				rigidBodyComponent.sleepingTimeLimit = 6;
				expect(rigidBodyComponent.cannonBody.sleepSpeedLimit).toEqual(4);
				expect(rigidBodyComponent.cannonBody.sleepTimeLimit).toEqual(6);
		});

		it('can set materials per collider', function () {
				var rigidBodyComponent = new _RigidBodyComponent.RigidBodyComponent({ mass: 1 });
				var colliderComponent = new _ColliderComponent.ColliderComponent({
						collider: new _SphereCollider.SphereCollider({ radius: 1 }),
						material: new _PhysicsMaterial.PhysicsMaterial({ friction: 0.7, restitution: 0.8 })
				});
				var entity = world.createEntity(rigidBodyComponent, colliderComponent).addToWorld();

				var colliderComponent2 = new _ColliderComponent.ColliderComponent({
						collider: new _SphereCollider.SphereCollider({ radius: 1 }),
						material: new _PhysicsMaterial.PhysicsMaterial({ friction: 0.9, restitution: 1.0 })
				});
				var subEntity = world.createEntity(colliderComponent2).addToWorld();

				entity.attachChild(subEntity);

				rigidBodyComponent.initialize();

				expect(entity.rigidBodyComponent.cannonBody.shapes[0].material.friction).toBe(0.7);
				expect(entity.rigidBodyComponent.cannonBody.shapes[1].material.friction).toBe(0.9);

				entity.removeFromWorld();
				subEntity.removeFromWorld();
		});
});
