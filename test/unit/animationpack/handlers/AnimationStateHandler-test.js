import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { SteadyState as SteadyState_SteadyStatejs } from "../../../../src/goo/animationpack/state/SteadyState";
import { ClipSource as ClipSource_ClipSourcejs } from "../../../../src/goo/animationpack/blendtree/ClipSource";
import { AnimationClip as AnimationClip_AnimationClipjs } from "../../../../src/goo/animationpack/clip/AnimationClip";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationStateHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an animation state', function (done) {
		var stateConfig = Configs_Configsjs.animstate();
		loader.preload(Configs_Configsjs.get());
		loader.load(stateConfig.id).then(function (state) {
			expect(state).toEqual(jasmine.any(SteadyState_SteadyStatejs));
			expect(state._sourceTree).toEqual(jasmine.any(ClipSource_ClipSourcejs));
			expect(state._sourceTree._clip).toEqual(jasmine.any(AnimationClip_AnimationClipjs));
			done();
		});
	});
});