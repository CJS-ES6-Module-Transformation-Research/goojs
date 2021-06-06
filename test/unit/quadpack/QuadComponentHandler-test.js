import { World as World_World } from "../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../src/goo/loaders/DynamicLoader";
import { QuadComponent as QuadComponent_QuadComponent } from "../../../src/goo/quadpack/QuadComponent";
import { Configs as Configs_Configs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/quadpack/QuadComponentHandler";

describe('QuadComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a quadComponent', function (done) {
		var config = Configs_Configs.entity(['quad']);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.quadComponent).toEqual(jasmine.any(QuadComponent_QuadComponent));
			done();
		});
	});

	it('cleans up after the config was updated', function (done) {
		var config = Configs_Configs.entity(['quad']);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function () {
			var newConfig = JSON.parse(JSON.stringify(config));

			// Remove the material!
			delete newConfig.components.quad;
			return loader.update(config.id, newConfig);
		}).then(function (entity) {
			expect(entity._components.length).toEqual(1); // just the transform component is left
			done();
		});
	});
});
