var _World = require("../../../../src/goo/entities/World");

var _Entity = require("../../../../src/goo/entities/Entity");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _Configs = require("../../../../test/unit/loaders/Configs");

require("../../../../src/goo/animationpack/handlers/AnimationHandlers");

describe('ProjectHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a project with scene', function (done) {
		var config = _Configs.Configs.project();
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (project) {
			expect(project.mainScene).toBeDefined();
			expect(project.mainScene.entities).toEqual(jasmine.any(Object));
			done();
		});
	});

	it('loads a slightly more complex project', function (done) {
		var config = _Configs.Configs.project(true);
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (project) {
			expect(project.mainScene).toBeDefined();
			var entity;
			for (var key in project.mainScene.entities) {
				entity = project.mainScene.entities[key];
			}
			expect(entity).toEqual(jasmine.any(_Entity.Entity));
			done();
		});
	});
});
