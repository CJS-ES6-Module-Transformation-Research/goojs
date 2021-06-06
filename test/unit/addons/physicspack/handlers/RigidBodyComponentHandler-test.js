import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../../src/goo/loaders/DynamicLoader";
import { Vector3 as Vector3_Vector3 } from "../../../../../src/goo/math/Vector3";
import { World as World_World } from "../../../../../src/goo/entities/World";
import { RigidBodyComponent as RigidBodyComponent_RigidBodyComponent } from "../../../../../src/goo/addons/physicspack/components/RigidBodyComponent";
import { Configs as Configs_Configs } from "../../../../../test/unit/loaders/Configs";
import "../../../../../src/goo/addons/physicspack/handlers/RigidBodyComponentHandler";

describe('RigidBodyComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with rigidBody component', function (done) {
		var config = Configs_Configs.entity(['rigidBody']);

		config.components.rigidBody.mass = 3;
		config.components.rigidBody.velocity = [1, 2, 3];
		config.components.rigidBody.angularVelocity = [4, 5, 6];

		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.rigidBodyComponent).toEqual(jasmine.any(RigidBodyComponent_RigidBodyComponent));

			var velocity = new Vector3_Vector3();
			entity.rigidBodyComponent.getVelocity(velocity);
			expect(velocity).toEqual(new Vector3_Vector3(1, 2, 3));

			var angularVelocity = new Vector3_Vector3();
			entity.rigidBodyComponent.getAngularVelocity(angularVelocity);
			expect(angularVelocity).toEqual(new Vector3_Vector3(4, 5, 6));

			expect(entity.rigidBodyComponent.mass).toBe(3);

			done();
		});
	});
});
