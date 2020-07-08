import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { SteadyState as srcgooanimationpackstateSteadyState_SteadyStatejs } from "../../../../src/goo/animationpack/state/SteadyState";
import { AnimationLayer as srcgooanimationpacklayerAnimationLayer_AnimationLayerjs } from "../../../../src/goo/animationpack/layer/AnimationLayer";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationLayersHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a collection of animation layers', function (done) {
		var layersConfig = testunitloadersConfigs_Configsjs.animation();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(layersConfig.id).then(function (layers) {
			expect(layers.length).toBe(Object.keys(layersConfig.layers).length);

			var layer = layers[0];
			expect(layer).toEqual(jasmine.any(srcgooanimationpacklayerAnimationLayer_AnimationLayerjs));
			expect(layer._currentState).toEqual(jasmine.any(srcgooanimationpackstateSteadyState_SteadyStatejs));
			done();
		});
	});

	it('sorts animation layers correctly', function (done) {
		var layersConfig = testunitloadersConfigs_Configsjs.animation();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(layersConfig.id).then(function (layers) {
			for (var i = 0; i < layers.length; i++) {
				expect(layersConfig.layers[layers[i].id].sortValue).toBe(i);
			}
			done();
		});
	});
});