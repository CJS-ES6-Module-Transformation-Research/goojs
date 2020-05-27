import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { SteadyState as srcgooanimationpackstateSteadyState_SteadyStatejs } from "../../../../src/goo/animationpack/state/SteadyState";
import { ClipSource as srcgooanimationpackblendtreeClipSource_ClipSourcejs } from "../../../../src/goo/animationpack/blendtree/ClipSource";
import { AnimationClip as srcgooanimationpackclipAnimationClip_AnimationClipjs } from "../../../../src/goo/animationpack/clip/AnimationClip";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationStateHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an animation state', function (done) {
		var stateConfig = testunitloadersConfigs_Configsjs.animstate();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(stateConfig.id).then(function (state) {
			expect(state).toEqual(jasmine.any(srcgooanimationpackstateSteadyState_SteadyStatejs));
			expect(state._sourceTree).toEqual(jasmine.any(srcgooanimationpackblendtreeClipSource_ClipSourcejs));
			expect(state._sourceTree._clip).toEqual(jasmine.any(srcgooanimationpackclipAnimationClip_AnimationClipjs));
			done();
		});
	});
});