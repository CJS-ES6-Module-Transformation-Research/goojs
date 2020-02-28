import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../../src/goo/loaders/DynamicLoader";
import { Vector3 as Vector3js } from "../../../../../src/goo/math/Vector3";
import { World as World_Worldjs } from "../../../../../src/goo/entities/World";
import { RigidBodyComponent as RigidBodyComponentjs } from "../../../../../src/goo/addons/physicspack/components/RigidBodyComponent";
import { Configs as Configs_Configsjs } from "../../../../../test/unit/loaders/Configs";
import "../../../../../src/goo/addons/physicspack/handlers/RigidBodyComponentHandler";

describe('RigidBodyComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with rigidBody component', function (done) {
		var config = Configs_Configsjs.entity(['rigidBody']);

		config.components.rigidBody.mass = 3;
		config.components.rigidBody.velocity = [1, 2, 3];
		config.components.rigidBody.angularVelocity = [4, 5, 6];

		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.rigidBodyComponent).toEqual(jasmine.any(RigidBodyComponentjs));

			var velocity = new Vector3js();
			entity.rigidBodyComponent.getVelocity(velocity);
			expect(velocity).toEqual(new Vector3js(1, 2, 3));

			var angularVelocity = new Vector3js();
			entity.rigidBodyComponent.getAngularVelocity(angularVelocity);
			expect(angularVelocity).toEqual(new Vector3js(4, 5, 6));

			expect(entity.rigidBodyComponent.mass).toBe(3);

			done();
		});
	});
});
