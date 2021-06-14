import { World as World_World } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { AnimationClip as AnimationClip_AnimationClip } from "../../../../src/goo/animationpack/clip/AnimationClip";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationClipHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a clip', function (done) {
		var config = Configs_Configs.clip();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (clip) {
			expect(clip).toEqual(jasmine.any(AnimationClip_AnimationClip));
			done();
		});
	});
});