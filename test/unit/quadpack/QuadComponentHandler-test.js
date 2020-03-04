import { World as Worldjs } from "../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoaderjs } from "../../../src/goo/loaders/DynamicLoader";
import { QuadComponent as QuadComponentjs } from "../../../src/goo/quadpack/QuadComponent";
import { Configs as Configs_Configsjs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/quadpack/QuadComponentHandler";

describe('QuadComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new Worldjs();
		loader = new DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a quadComponent', function (done) {
		var config = Configs_Configsjs.entity(['quad']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.quadComponent).toEqual(jasmine.any(QuadComponentjs));
			done();
		});
	});

	it('cleans up after the config was updated', function (done) {
		var config = Configs_Configsjs.entity(['quad']);
		loader.preload(Configs_Configsjs.get());
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
