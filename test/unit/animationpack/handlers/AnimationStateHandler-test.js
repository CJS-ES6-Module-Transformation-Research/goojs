import { World as Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { SteadyState as SteadyStatejs } from "../../../../src/goo/animationpack/state/SteadyState";
import { ClipSource as ClipSourcejs } from "../../../../src/goo/animationpack/blendtree/ClipSource";
import { AnimationClip as AnimationClip_AnimationClipjs } from "../../../../src/goo/animationpack/clip/AnimationClip";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationStateHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new Worldjs();
		loader = new DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an animation state', function (done) {
		var stateConfig = Configs_Configsjs.animstate();
		loader.preload(Configs_Configsjs.get());
		loader.load(stateConfig.id).then(function (state) {
			expect(state).toEqual(jasmine.any(SteadyStatejs));
			expect(state._sourceTree).toEqual(jasmine.any(ClipSourcejs));
			expect(state._sourceTree._clip).toEqual(jasmine.any(AnimationClip_AnimationClipjs));
			done();
		});
	});
});