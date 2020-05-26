import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../../src/goo/loaders/DynamicLoader";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../../src/goo/math/Vector3";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../../src/goo/entities/World";
import { BoxCollider as srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/BoxCollider";
import {     PlaneCollider as srcgooaddonsphysicspackcollidersPlaneCollider_PlaneColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/PlaneCollider";
import {     CylinderCollider as srcgooaddonsphysicspackcollidersCylinderCollider_CylinderColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/CylinderCollider";
import {     SphereCollider as srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import {     ColliderComponent as srcgooaddonsphysicspackcomponentsColliderComponent_ColliderComponentjs, } from "../../../../../src/goo/addons/physicspack/components/ColliderComponent";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../../test/unit/loaders/Configs";
import "../../../../../src/goo/addons/physicspack/handlers/ColliderComponentHandler";

describe('ColliderComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with collider component', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['collider']);

		config.components.collider.isTrigger = true;
		config.components.collider.friction = 0.5;
		config.components.collider.restitution = 0.6;

		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(srcgooaddonsphysicspackcomponentsColliderComponent_ColliderComponentjs));
			expect(entity.colliderComponent.isTrigger).toBe(true);
			expect(entity.colliderComponent.material.friction).toBe(0.5);
			expect(entity.colliderComponent.material.restitution).toBe(0.6);
			done();
		});
	});

	it('loads an entity with with a BoxCollider', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity();
		config.components.collider = testunitloadersConfigs_Configsjs.component.collider('Box');
		config.components.collider.shapeOptions.halfExtents = [1, 2, 3];
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(srcgooaddonsphysicspackcomponentsColliderComponent_ColliderComponentjs));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs));
			expect(entity.colliderComponent.collider.halfExtents).toEqual(new srcgoomathVector3_Vector3js(1, 2, 3));
			done();
		});
	});

	it('loads an entity with with a PlaneCollider', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity();
		config.components.collider = testunitloadersConfigs_Configsjs.component.collider('Plane');
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(srcgooaddonsphysicspackcomponentsColliderComponent_ColliderComponentjs));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(srcgooaddonsphysicspackcollidersPlaneCollider_PlaneColliderjs));
			done();
		});
	});

	it('loads an entity with with a CylinderCollider', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity();
		config.components.collider = testunitloadersConfigs_Configsjs.component.collider('Cylinder');
		config.components.collider.shapeOptions.height = 2;
		config.components.collider.shapeOptions.radius = 3;
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(srcgooaddonsphysicspackcomponentsColliderComponent_ColliderComponentjs));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(srcgooaddonsphysicspackcollidersCylinderCollider_CylinderColliderjs));
			expect(entity.colliderComponent.collider.height).toEqual(2);
			expect(entity.colliderComponent.collider.radius).toEqual(3);
			done();
		});
	});

	it('manages to update between collider types', function (done) {
		var component;
		var config = testunitloadersConfigs_Configsjs.entity();
		var sphereConfig = testunitloadersConfigs_Configsjs.component.collider('Sphere');
		var boxConfig = testunitloadersConfigs_Configsjs.component.collider('Box');
		config.components.collider = sphereConfig;
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			component = entity.colliderComponent;
			expect(component.collider).toEqual(jasmine.any(srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs));
			expect(component.worldCollider).toEqual(jasmine.any(srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs));
			config.components.collider = boxConfig;
			return loader.update(config.id, config);
		}).then(function (entity) {
			expect(entity.colliderComponent).toBe(component);
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs));
			expect(entity.colliderComponent.worldCollider).toEqual(jasmine.any(srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs));
			done();
		});
	});
});
