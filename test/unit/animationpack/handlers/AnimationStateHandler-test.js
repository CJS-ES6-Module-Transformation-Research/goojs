"use strict";

var _World = require("../../../../src/goo/entities/World");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _SteadyState = require("../../../../src/goo/animationpack/state/SteadyState");

var _ClipSource = require("../../../../src/goo/animationpack/blendtree/ClipSource");

var _AnimationClip = require("../../../../src/goo/animationpack/clip/AnimationClip");

var _Configs = require("../../../../test/unit/loaders/Configs");

require("../../../../src/goo/animationpack/handlers/AnimationHandlers");

describe('AnimationStateHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an animation state', function (done) {
		var stateConfig = _Configs.Configs.animstate();
		loader.preload(_Configs.Configs.get());
		loader.load(stateConfig.id).then(function (state) {
			expect(state).toEqual(jasmine.any(_SteadyState.SteadyState));
			expect(state._sourceTree).toEqual(jasmine.any(_ClipSource.ClipSource));
			expect(state._sourceTree._clip).toEqual(jasmine.any(_AnimationClip.AnimationClip));
			done();
		});
	});
});
