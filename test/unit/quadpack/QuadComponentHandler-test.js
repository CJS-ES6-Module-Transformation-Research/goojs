import { World as srcgooentitiesWorld_Worldjs } from "../../../src/goo/entities/World";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../src/goo/loaders/DynamicLoader";
import { QuadComponent as srcgooquadpackQuadComponent_QuadComponentjs } from "../../../src/goo/quadpack/QuadComponent";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/quadpack/QuadComponentHandler";

describe('QuadComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a quadComponent', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['quad']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.quadComponent).toEqual(jasmine.any(srcgooquadpackQuadComponent_QuadComponentjs));
			done();
		});
	});

	it('cleans up after the config was updated', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['quad']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
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
