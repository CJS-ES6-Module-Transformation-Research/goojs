import { World as World_World } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { SteadyState as SteadyState_SteadyState } from "../../../../src/goo/animationpack/state/SteadyState";
import { ClipSource as ClipSource_ClipSource } from "../../../../src/goo/animationpack/blendtree/ClipSource";
import { AnimationClip as AnimationClip_AnimationClip } from "../../../../src/goo/animationpack/clip/AnimationClip";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationStateHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an animation state', function (done) {
		var stateConfig = Configs_Configs.animstate();
		loader.preload(Configs_Configs.get());
		loader.load(stateConfig.id).then(function (state) {
			expect(state).toEqual(jasmine.any(SteadyState_SteadyState));
			expect(state._sourceTree).toEqual(jasmine.any(ClipSource_ClipSource));
			expect(state._sourceTree._clip).toEqual(jasmine.any(AnimationClip_AnimationClip));
			done();
		});
	});
});