var _DynamicLoader = require("../../../../../src/goo/loaders/DynamicLoader");

var _Vector = require("../../../../../src/goo/math/Vector3");

var _World = require("../../../../../src/goo/entities/World");

var _BoxCollider = require("../../../../../src/goo/addons/physicspack/colliders/BoxCollider");

var _PlaneCollider = require("../../../../../src/goo/addons/physicspack/colliders/PlaneCollider");

var _CylinderCollider = require("../../../../../src/goo/addons/physicspack/colliders/CylinderCollider");

var _SphereCollider = require("../../../../../src/goo/addons/physicspack/colliders/SphereCollider");

var _ColliderComponent = require("../../../../../src/goo/addons/physicspack/components/ColliderComponent");

require("../../../../../src/goo/addons/physicspack/handlers/ColliderComponentHandler");

var Configs = require('../../../../../test/unit/loaders/Configs');

describe('ColliderComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with collider component', function (done) {
		var config = Configs.entity(['collider']);

		config.components.collider.isTrigger = true;
		config.components.collider.friction = 0.5;
		config.components.collider.restitution = 0.6;

		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(_ColliderComponent.ColliderComponent));
			expect(entity.colliderComponent.isTrigger).toBe(true);
			expect(entity.colliderComponent.material.friction).toBe(0.5);
			expect(entity.colliderComponent.material.restitution).toBe(0.6);
			done();
		});
	});

	it('loads an entity with with a BoxCollider', function (done) {
		var config = Configs.entity();
		config.components.collider = Configs.component.collider('Box');
		config.components.collider.shapeOptions.halfExtents = [1, 2, 3];
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(_ColliderComponent.ColliderComponent));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(_BoxCollider.BoxCollider));
			expect(entity.colliderComponent.collider.halfExtents).toEqual(new _Vector.Vector3(1, 2, 3));
			done();
		});
	});

	it('loads an entity with with a PlaneCollider', function (done) {
		var config = Configs.entity();
		config.components.collider = Configs.component.collider('Plane');
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(_ColliderComponent.ColliderComponent));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(_PlaneCollider.PlaneCollider));
			done();
		});
	});

	it('loads an entity with with a CylinderCollider', function (done) {
		var config = Configs.entity();
		config.components.collider = Configs.component.collider('Cylinder');
		config.components.collider.shapeOptions.height = 2;
		config.components.collider.shapeOptions.radius = 3;
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(_ColliderComponent.ColliderComponent));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(_CylinderCollider.CylinderCollider));
			expect(entity.colliderComponent.collider.height).toEqual(2);
			expect(entity.colliderComponent.collider.radius).toEqual(3);
			done();
		});
	});

	it('manages to update between collider types', function (done) {
		var component;
		var config = Configs.entity();
		var sphereConfig = Configs.component.collider('Sphere');
		var boxConfig = Configs.component.collider('Box');
		config.components.collider = sphereConfig;
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			component = entity.colliderComponent;
			expect(component.collider).toEqual(jasmine.any(_SphereCollider.SphereCollider));
			expect(component.worldCollider).toEqual(jasmine.any(_SphereCollider.SphereCollider));
			config.components.collider = boxConfig;
			return loader.update(config.id, config);
		}).then(function (entity) {
			expect(entity.colliderComponent).toBe(component);
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(_BoxCollider.BoxCollider));
			expect(entity.colliderComponent.worldCollider).toEqual(jasmine.any(_BoxCollider.BoxCollider));
			done();
		});
	});
});
