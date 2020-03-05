import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { SteadyState as SteadyState_SteadyStatejs } from "../../../../src/goo/animationpack/state/SteadyState";
import { AnimationLayer as AnimationLayer_AnimationLayerjs } from "../../../../src/goo/animationpack/layer/AnimationLayer";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationLayersHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a collection of animation layers', function (done) {
		var layersConfig = Configs_Configsjs.animation();
		loader.preload(Configs_Configsjs.get());
		loader.load(layersConfig.id).then(function (layers) {
			expect(layers.length).toBe(Object.keys(layersConfig.layers).length);

			var layer = layers[0];
			expect(layer).toEqual(jasmine.any(AnimationLayer_AnimationLayerjs));
			expect(layer._currentState).toEqual(jasmine.any(SteadyState_SteadyStatejs));
			done();
		});
	});

	it('sorts animation layers correctly', function (done) {
		var layersConfig = Configs_Configsjs.animation();
		loader.preload(Configs_Configsjs.get());
		loader.load(layersConfig.id).then(function (layers) {
			for (var i = 0; i < layers.length; i++) {
				expect(layersConfig.layers[layers[i].id].sortValue).toBe(i);
			}
			done();
		});
	});
});