import { DynamicLoader } from "../../../../../src/goo/loaders/DynamicLoader";
import { Vector3 } from "../../../../../src/goo/math/Vector3";
import { World } from "../../../../../src/goo/entities/World";
import { RigidBodyComponent } from "../../../../../src/goo/addons/physicspack/components/RigidBodyComponent";
import "../../../../../src/goo/addons/physicspack/handlers/RigidBodyComponentHandler";
var Configs = require('../../../../../test/unit/loaders/Configs');

describe('RigidBodyComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World();
		loader = new DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with rigidBody component', function (done) {
		var config = Configs.entity(['rigidBody']);

		config.components.rigidBody.mass = 3;
		config.components.rigidBody.velocity = [1, 2, 3];
		config.components.rigidBody.angularVelocity = [4, 5, 6];

		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.rigidBodyComponent).toEqual(jasmine.any(RigidBodyComponent));

			var velocity = new Vector3();
			entity.rigidBodyComponent.getVelocity(velocity);
			expect(velocity).toEqual(new Vector3(1, 2, 3));

			var angularVelocity = new Vector3();
			entity.rigidBodyComponent.getAngularVelocity(angularVelocity);
			expect(angularVelocity).toEqual(new Vector3(4, 5, 6));

			expect(entity.rigidBodyComponent.mass).toBe(3);

			done();
		});
	});
});
