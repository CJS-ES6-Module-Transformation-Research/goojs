"use strict";

var _DynamicLoader = require("../../../../../src/goo/loaders/DynamicLoader");

var _Vector = require("../../../../../src/goo/math/Vector3");

var _World = require("../../../../../src/goo/entities/World");

var _RigidBodyComponent = require("../../../../../src/goo/addons/physicspack/components/RigidBodyComponent");

var _Configs = require("../../../../../test/unit/loaders/Configs");

require("../../../../../src/goo/addons/physicspack/handlers/RigidBodyComponentHandler");

describe('RigidBodyComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with rigidBody component', function (done) {
		var config = _Configs.Configs.entity(['rigidBody']);

		config.components.rigidBody.mass = 3;
		config.components.rigidBody.velocity = [1, 2, 3];
		config.components.rigidBody.angularVelocity = [4, 5, 6];

		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.rigidBodyComponent).toEqual(jasmine.any(_RigidBodyComponent.RigidBodyComponent));

			var velocity = new _Vector.Vector3();
			entity.rigidBodyComponent.getVelocity(velocity);
			expect(velocity).toEqual(new _Vector.Vector3(1, 2, 3));

			var angularVelocity = new _Vector.Vector3();
			entity.rigidBodyComponent.getAngularVelocity(angularVelocity);
			expect(angularVelocity).toEqual(new _Vector.Vector3(4, 5, 6));

			expect(entity.rigidBodyComponent.mass).toBe(3);

			done();
		});
	});
});
