import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../../src/goo/loaders/DynamicLoader";
import { Vector3 as Vector3_Vector3 } from "../../../../../src/goo/math/Vector3";
import { World as World_World } from "../../../../../src/goo/entities/World";
import { BoxCollider as BoxCollider_BoxCollider } from "../../../../../src/goo/addons/physicspack/colliders/BoxCollider";
import { PlaneCollider as PlaneCollider_PlaneCollider } from "../../../../../src/goo/addons/physicspack/colliders/PlaneCollider";
import { CylinderCollider as CylinderCollider_CylinderCollider } from "../../../../../src/goo/addons/physicspack/colliders/CylinderCollider";
import { SphereCollider as SphereCollider_SphereCollider } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import { ColliderComponent as ColliderComponent_ColliderComponent } from "../../../../../src/goo/addons/physicspack/components/ColliderComponent";
import { Configs as Configs_Configs } from "../../../../../test/unit/loaders/Configs";
import "../../../../../src/goo/addons/physicspack/handlers/ColliderComponentHandler";

describe('ColliderComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with collider component', function (done) {
		var config = Configs_Configs.entity(['collider']);

		config.components.collider.isTrigger = true;
		config.components.collider.friction = 0.5;
		config.components.collider.restitution = 0.6;

		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(ColliderComponent_ColliderComponent));
			expect(entity.colliderComponent.isTrigger).toBe(true);
			expect(entity.colliderComponent.material.friction).toBe(0.5);
			expect(entity.colliderComponent.material.restitution).toBe(0.6);
			done();
		});
	});

	it('loads an entity with with a BoxCollider', function (done) {
		var config = Configs_Configs.entity();
		config.components.collider = Configs_Configs.component.collider('Box');
		config.components.collider.shapeOptions.halfExtents = [1, 2, 3];
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(ColliderComponent_ColliderComponent));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(BoxCollider_BoxCollider));
			expect(entity.colliderComponent.collider.halfExtents).toEqual(new Vector3_Vector3(1, 2, 3));
			done();
		});
	});

	it('loads an entity with with a PlaneCollider', function (done) {
		var config = Configs_Configs.entity();
		config.components.collider = Configs_Configs.component.collider('Plane');
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(ColliderComponent_ColliderComponent));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(PlaneCollider_PlaneCollider));
			done();
		});
	});

	it('loads an entity with with a CylinderCollider', function (done) {
		var config = Configs_Configs.entity();
		config.components.collider = Configs_Configs.component.collider('Cylinder');
		config.components.collider.shapeOptions.height = 2;
		config.components.collider.shapeOptions.radius = 3;
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.colliderComponent).toEqual(jasmine.any(ColliderComponent_ColliderComponent));
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(CylinderCollider_CylinderCollider));
			expect(entity.colliderComponent.collider.height).toEqual(2);
			expect(entity.colliderComponent.collider.radius).toEqual(3);
			done();
		});
	});

	it('manages to update between collider types', function (done) {
		var component;
		var config = Configs_Configs.entity();
		var sphereConfig = Configs_Configs.component.collider('Sphere');
		var boxConfig = Configs_Configs.component.collider('Box');
		config.components.collider = sphereConfig;
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			component = entity.colliderComponent;
			expect(component.collider).toEqual(jasmine.any(SphereCollider_SphereCollider));
			expect(component.worldCollider).toEqual(jasmine.any(SphereCollider_SphereCollider));
			config.components.collider = boxConfig;
			return loader.update(config.id, config);
		}).then(function (entity) {
			expect(entity.colliderComponent).toBe(component);
			expect(entity.colliderComponent.collider).toEqual(jasmine.any(BoxCollider_BoxCollider));
			expect(entity.colliderComponent.worldCollider).toEqual(jasmine.any(BoxCollider_BoxCollider));
			done();
		});
	});
});
