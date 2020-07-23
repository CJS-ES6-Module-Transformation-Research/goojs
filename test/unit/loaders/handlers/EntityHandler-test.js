import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { Entity as srcgooentitiesEntity_Entityjs } from "../../../../src/goo/entities/Entity";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/EntityHandler";

describe('EntityHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity).toEqual(jasmine.any(srcgooentitiesEntity_Entityjs));
			expect(entity.id).toBe(config.id);
			done();
		});
	});

	it('loads an entity with tags', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity();
		config.tags = { t1: true, t2: true };
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.hasTag('t1')).toEqual(true);
			expect(entity.hasTag('t2')).toEqual(true);
			done();
		});
	});
});
