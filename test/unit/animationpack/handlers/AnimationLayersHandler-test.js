import { World as World_World } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { SteadyState as SteadyState_SteadyState } from "../../../../src/goo/animationpack/state/SteadyState";
import { AnimationLayer as AnimationLayer_AnimationLayer } from "../../../../src/goo/animationpack/layer/AnimationLayer";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationLayersHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a collection of animation layers', function (done) {
		var layersConfig = Configs_Configs.animation();
		loader.preload(Configs_Configs.get());
		loader.load(layersConfig.id).then(function (layers) {
			expect(layers.length).toBe(Object.keys(layersConfig.layers).length);

			var layer = layers[0];
			expect(layer).toEqual(jasmine.any(AnimationLayer_AnimationLayer));
			expect(layer._currentState).toEqual(jasmine.any(SteadyState_SteadyState));
			done();
		});
	});

	it('sorts animation layers correctly', function (done) {
		var layersConfig = Configs_Configs.animation();
		loader.preload(Configs_Configs.get());
		loader.load(layersConfig.id).then(function (layers) {
			for (var i = 0; i < layers.length; i++) {
				expect(layersConfig.layers[layers[i].id].sortValue).toBe(i);
			}
			done();
		});
	});
});