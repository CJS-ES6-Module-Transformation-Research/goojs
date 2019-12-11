import { World } from "../../../../src/goo/entities/World";
import { DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { AnimationClip } from "../../../../src/goo/animationpack/clip/AnimationClip";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";
var Configs = require('../../../../test/unit/loaders/Configs');

describe('AnimationClipHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World();
		loader = new DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a clip', function (done) {
		var config = Configs.clip();
		loader.preload(Configs.get());
		loader.load(config.id).then(function (clip) {
			expect(clip).toEqual(jasmine.any(AnimationClip));
			done();
		});
	});
});