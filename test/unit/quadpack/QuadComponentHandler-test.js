var _World = require("../../../src/goo/entities/World");

var _DynamicLoader = require("../../../src/goo/loaders/DynamicLoader");

var _QuadComponent = require("../../../src/goo/quadpack/QuadComponent");

require("../../../src/goo/quadpack/QuadComponentHandler");

var Configs = require('../../../test/unit/loaders/Configs');

describe('QuadComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a quadComponent', function (done) {
		var config = Configs.entity(['quad']);
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.quadComponent).toEqual(jasmine.any(_QuadComponent.QuadComponent));
			done();
		});
	});

	it('cleans up after the config was updated', function (done) {
		var config = Configs.entity(['quad']);
		loader.preload(Configs.get());
		loader.load(config.id).then(function () {
			var newConfig = JSON.parse(JSON.stringify(config));

			// Remove the material!
			delete newConfig.components.quad;
			return loader.update(config.id, newConfig);
		}).then(function (entity) {
			expect(entity._components.length).toEqual(1); // just the transform component is left
			done();
		});
	});
});
