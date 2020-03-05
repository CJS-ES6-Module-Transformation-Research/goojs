import { World as Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { SteadyState as SteadyStatejs } from "../../../../src/goo/animationpack/state/SteadyState";
import { AnimationLayer as AnimationLayerjs } from "../../../../src/goo/animationpack/layer/AnimationLayer";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationLayersHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new Worldjs();
		loader = new DynamicLoaderjs({
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
			expect(layer).toEqual(jasmine.any(AnimationLayerjs));
			expect(layer._currentState).toEqual(jasmine.any(SteadyStatejs));
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