import { World as World_World } from "../../../../src/goo/entities/World";
import { Entity as Entity_Entity } from "../../../../src/goo/entities/Entity";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('ProjectHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a project with scene', function (done) {
		var config = Configs_Configs.project();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (project) {
			expect(project.mainScene).toBeDefined();
			expect(project.mainScene.entities).toEqual(jasmine.any(Object));
			done();
		});
	});

	it('loads a slightly more complex project', function (done) {
		var config = Configs_Configs.project(true);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (project) {
			expect(project.mainScene).toBeDefined();
			var entity;
			for (var key in project.mainScene.entities) {
				entity = project.mainScene.entities[key];
			}
			expect(entity).toEqual(jasmine.any(Entity_Entity));
			done();
		});
	});
});
