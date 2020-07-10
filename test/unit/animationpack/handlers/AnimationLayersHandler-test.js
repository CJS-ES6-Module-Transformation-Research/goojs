"use strict";

var _World = require("../../../../src/goo/entities/World");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _SteadyState = require("../../../../src/goo/animationpack/state/SteadyState");

var _AnimationLayer = require("../../../../src/goo/animationpack/layer/AnimationLayer");

var _Configs = require("../../../../test/unit/loaders/Configs");

require("../../../../src/goo/animationpack/handlers/AnimationHandlers");

describe('AnimationLayersHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a collection of animation layers', function (done) {
		var layersConfig = _Configs.Configs.animation();
		loader.preload(_Configs.Configs.get());
		loader.load(layersConfig.id).then(function (layers) {
			expect(layers.length).toBe(Object.keys(layersConfig.layers).length);

			var layer = layers[0];
			expect(layer).toEqual(jasmine.any(_AnimationLayer.AnimationLayer));
			expect(layer._currentState).toEqual(jasmine.any(_SteadyState.SteadyState));
			done();
		});
	});

	it('sorts animation layers correctly', function (done) {
		var layersConfig = _Configs.Configs.animation();
		loader.preload(_Configs.Configs.get());
		loader.load(layersConfig.id).then(function (layers) {
			for (var i = 0; i < layers.length; i++) {
				expect(layersConfig.layers[layers[i].id].sortValue).toBe(i);
			}
			done();
		});
	});
});