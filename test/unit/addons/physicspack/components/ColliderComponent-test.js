import {     SphereCollider as srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../../src/goo/math/Vector3";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../../src/goo/entities/World";
import { TransformSystem as srcgooentitiessystemsTransformSystem_TransformSystemjs } from "../../../../../src/goo/entities/systems/TransformSystem";
import {     PhysicsMaterial as srcgooaddonsphysicspackPhysicsMaterial_PhysicsMaterialjs, } from "../../../../../src/goo/addons/physicspack/PhysicsMaterial";
import {     PhysicsSystem as srcgooaddonsphysicspacksystemsPhysicsSystem_PhysicsSystemjs, } from "../../../../../src/goo/addons/physicspack/systems/PhysicsSystem";
import {     ColliderSystem as srcgooaddonsphysicspacksystemsColliderSystem_ColliderSystemjs, } from "../../../../../src/goo/addons/physicspack/systems/ColliderSystem";
import {     ColliderComponent as srcgooaddonsphysicspackcomponentsColliderComponent_ColliderComponentjs, } from "../../../../../src/goo/addons/physicspack/components/ColliderComponent";

/* global CANNON */

describe('ColliderComponent', function () {
	var world, system;

	beforeEach(function () {
		world = new srcgooentitiesWorld_Worldjs();
		system = new srcgooaddonsphysicspacksystemsPhysicsSystem_PhysicsSystemjs({
			maxSubSteps: 1
		});
		system.setGravity(new srcgoomathVector3_Vector3js());
		world.setSystem(system);
		world.setSystem(new srcgooentitiessystemsTransformSystem_TransformSystemjs());
		world.setSystem(new srcgooaddonsphysicspacksystemsColliderSystem_ColliderSystemjs());
	});

	it('can update its world collider', function () {
		var colliderComponent = new srcgooaddonsphysicspackcomponentsColliderComponent_ColliderComponentjs({
			collider: new srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs({ radius: 1 })
		});
		var entity = world.createEntity(colliderComponent).addToWorld();

		entity.setTranslation(1, 2, 3);
		entity.setScale(1, 2, 3);

		colliderComponent.updateWorldCollider(true);

		expect(colliderComponent.worldCollider.radius).toBe(3);
	});

	it('instantiates as a static body without a rigid body component', function () {
		var material = new srcgooaddonsphysicspackPhysicsMaterial_PhysicsMaterialjs({
			friction: 0.6,
			restitution: 0.7
		});
		var colliderComponent = new srcgooaddonsphysicspackcomponentsColliderComponent_ColliderComponentjs({
			collider: new srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs({ radius: 1 }),
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
