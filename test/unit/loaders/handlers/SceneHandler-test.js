var _World = require("../../../../src/goo/entities/World");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _Entity = require("../../../../src/goo/entities/Entity");

var _Configs = require("../../../../test/unit/loaders/Configs");

require("../../../../src/goo/loaders/handlers/SceneHandler");

describe('SceneHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a scene with entities', function (done) {
		var config = _Configs.Configs.scene();
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (scene) {
			expect(scene.entities).toEqual(jasmine.any(Object));
			var entity;
			for (var key in scene.entities) {
				entity = scene.entities[key];
				break;
			}
			expect(entity).toEqual(jasmine.any(_Entity.Entity));
			expect(entity._world._addedEntities).toContain(entity);
			done();
		});
	});
});
