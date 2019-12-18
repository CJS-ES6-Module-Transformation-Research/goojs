var _World = require("../../../../src/goo/entities/World");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _AnimationClip = require("../../../../src/goo/animationpack/clip/AnimationClip");

require("../../../../src/goo/animationpack/handlers/AnimationHandlers");

var Configs = require('../../../../test/unit/loaders/Configs');

describe('AnimationClipHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a clip', function (done) {
		var config = Configs.clip();
		loader.preload(Configs.get());
		loader.load(config.id).then(function (clip) {
			expect(clip).toEqual(jasmine.any(_AnimationClip.AnimationClip));
			done();
		});
	});
});
