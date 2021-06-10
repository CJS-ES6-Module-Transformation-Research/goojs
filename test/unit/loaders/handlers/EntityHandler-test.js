import { World as World_World } from "../../../../src/goo/entities/World";
import { Entity as Entity_Entity } from "../../../../src/goo/entities/Entity";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/EntityHandler";

describe('EntityHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity', function (done) {
		var config = Configs_Configs.entity();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity).toEqual(jasmine.any(Entity_Entity));
			expect(entity.id).toBe(config.id);
			done();
		});
	});

	it('loads an entity with tags', function (done) {
		var config = Configs_Configs.entity();
		config.tags = { t1: true, t2: true };
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.hasTag('t1')).toEqual(true);
			expect(entity.hasTag('t2')).toEqual(true);
			done();
		});
	});
});
