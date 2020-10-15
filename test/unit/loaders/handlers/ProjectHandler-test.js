import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { Entity as srcgooentitiesEntity_Entityjs } from "../../../../src/goo/entities/Entity";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('ProjectHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a project with scene', function (done) {
		var config = testunitloadersConfigs_Configsjs.project();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (project) {
			expect(project.mainScene).toBeDefined();
			expect(project.mainScene.entities).toEqual(jasmine.any(Object));
			done();
		});
	});

	it('loads a slightly more complex project', function (done) {
		var config = testunitloadersConfigs_Configsjs.project(true);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (project) {
			expect(project.mainScene).toBeDefined();
			var entity;
			for (var key in project.mainScene.entities) {
				entity = project.mainScene.entities[key];
			}
			expect(entity).toEqual(jasmine.any(srcgooentitiesEntity_Entityjs));
			done();
		});
	});
});
