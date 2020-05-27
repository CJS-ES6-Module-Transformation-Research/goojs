import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { AnimationClip as srcgooanimationpackclipAnimationClip_AnimationClipjs } from "../../../../src/goo/animationpack/clip/AnimationClip";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationClipHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a clip', function (done) {
		var config = testunitloadersConfigs_Configsjs.clip();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (clip) {
			expect(clip).toEqual(jasmine.any(srcgooanimationpackclipAnimationClip_AnimationClipjs));
			done();
		});
	});
});