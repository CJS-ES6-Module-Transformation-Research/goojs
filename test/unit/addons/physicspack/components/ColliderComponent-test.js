var _SphereCollider = require("../../../../../src/goo/addons/physicspack/colliders/SphereCollider");

var _Vector = require("../../../../../src/goo/math/Vector3");

var _World = require("../../../../../src/goo/entities/World");

var _TransformSystem = require("../../../../../src/goo/entities/systems/TransformSystem");

var _PhysicsMaterial = require("../../../../../src/goo/addons/physicspack/PhysicsMaterial");

var _PhysicsSystem = require("../../../../../src/goo/addons/physicspack/systems/PhysicsSystem");

var _ColliderSystem = require("../../../../../src/goo/addons/physicspack/systems/ColliderSystem");

var _ColliderComponent = require("../../../../../src/goo/addons/physicspack/components/ColliderComponent");

/* global CANNON */

describe('ColliderComponent', function () {
	var world, system;

	beforeEach(function () {
		world = new _World.World();
		system = new _PhysicsSystem.PhysicsSystem({
			maxSubSteps: 1
		});
		system.setGravity(new _Vector.Vector3());
		world.setSystem(system);
		world.setSystem(new _TransformSystem.TransformSystem());
		world.setSystem(new _ColliderSystem.ColliderSystem());
	});

	it('can update its world collider', function () {
		var colliderComponent = new _ColliderComponent.ColliderComponent({
			collider: new _SphereCollider.SphereCollider({ radius: 1 })
		});
		var entity = world.createEntity(colliderComponent).addToWorld();

		entity.setTranslation(1, 2, 3);
		entity.setScale(1, 2, 3);

		colliderComponent.updateWorldCollider(true);

		expect(colliderComponent.worldCollider.radius).toBe(3);
	});

	it('instantiates as a static body without a rigid body component', function () {
		var material = new _PhysicsMaterial.PhysicsMaterial({
			friction: 0.6,
			restitution: 0.7
		});
		var colliderComponent = new _ColliderComponent.ColliderComponent({
			collider: new _SphereCollider.SphereCollider({ radius: 1 }),
			material: material
		});
		var entity = world.createEntity(colliderComponent).addToWorld();

		// Initialize
		colliderComponent.initialize();

		expect(colliderComponent.bodyEntity).toBeFalsy();
		expect(colliderComponent.cannonBody).toBeTruthy();
		expect(colliderComponent.cannonBody.shapes[0] instanceof CANNON.Sphere).toBeTruthy();
		expect(colliderComponent.cannonBody.shapes[0].material.friction).toBe(material.friction);
		expect(colliderComponent.cannonBody.shapes[0].material.restitution).toBe(material.restitution);
		expect(colliderComponent.cannonBody.type).toBe(CANNON.Body.STATIC);

		entity.removeFromWorld();

		// Cleanup
		colliderComponent.destroy();

		expect(colliderComponent.bodyEntity).toBeFalsy();
		expect(colliderComponent.cannonBody).toBeFalsy();
	});
});
