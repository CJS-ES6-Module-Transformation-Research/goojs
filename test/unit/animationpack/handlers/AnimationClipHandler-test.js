"use strict";

var _World = require("../../../../src/goo/entities/World");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _AnimationClip = require("../../../../src/goo/animationpack/clip/AnimationClip");

var _Configs = require("../../../../test/unit/loaders/Configs");

require("../../../../src/goo/animationpack/handlers/AnimationHandlers");

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
		var config = _Configs.Configs.clip();
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (clip) {
			expect(clip).toEqual(jasmine.any(_AnimationClip.AnimationClip));
			done();
		});
	});
});