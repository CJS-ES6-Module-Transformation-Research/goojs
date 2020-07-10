import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../../src/goo/loaders/DynamicLoader";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../../src/goo/math/Vector3";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../../src/goo/entities/World";
import {     RigidBodyComponent as srcgooaddonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs, } from "../../../../../src/goo/addons/physicspack/components/RigidBodyComponent";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../../test/unit/loaders/Configs";
import "../../../../../src/goo/addons/physicspack/handlers/RigidBodyComponentHandler";

describe('RigidBodyComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with rigidBody component', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['rigidBody']);

		config.components.rigidBody.mass = 3;
		config.components.rigidBody.velocity = [1, 2, 3];
		config.components.rigidBody.angularVelocity = [4, 5, 6];

		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.rigidBodyComponent).toEqual(jasmine.any(srcgooaddonsphysicspackcomponentsRigidBodyComponent_RigidBodyComponentjs));

			var velocity = new srcgoomathVector3_Vector3js();
			entity.rigidBodyComponent.getVelocity(velocity);
			expect(velocity).toEqual(new srcgoomathVector3_Vector3js(1, 2, 3));

			var angularVelocity = new srcgoomathVector3_Vector3js();
			entity.rigidBodyComponent.getAngularVelocity(angularVelocity);
			expect(angularVelocity).toEqual(new srcgoomathVector3_Vector3js(4, 5, 6));

			expect(entity.rigidBodyComponent.mass).toBe(3);

			done();
		});
	});
});
