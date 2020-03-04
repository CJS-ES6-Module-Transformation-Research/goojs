import { World as Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Entity as Entityjs } from "../../../../src/goo/entities/Entity";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/SceneHandler";

describe('SceneHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new Worldjs();
		loader = new DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a scene with entities', function (done) {
		var config = Configs_Configsjs.scene();
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (scene) {
			expect(scene.entities).toEqual(jasmine.any(Object));
			var entity;
			for (var key in scene.entities) {
				entity = scene.entities[key];
				break;
			}
			expect(entity).toEqual(jasmine.any(Entityjs));
			expect(entity._world._addedEntities).toContain(entity);
			done();
		});
	});
});
