var _MeshRendererComponent = require("../../../../src/goo/entities/components/MeshRendererComponent");

var _Material = require("../../../../src/goo/renderer/Material");

var _World = require("../../../../src/goo/entities/World");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var Configs = require('../../../../test/unit/loaders/Configs');

describe('MeshRendererComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a meshRendererComponent', function (done) {
		var config = Configs.entity(['meshRenderer']);
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshRendererComponent).toEqual(jasmine.any(_MeshRendererComponent.MeshRendererComponent));
			expect(entity.meshRendererComponent.materials[0]).toEqual(jasmine.any(_Material.Material));
			done();
		});
	});

	it('loads materials in right order', function (done) {
		var config = Configs.entity(['meshRenderer']);
		var materialConfigs = config.components.meshRenderer.materials;
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			var materials = entity.meshRendererComponent.materials;
			var sortMaterials = {};

			for (var key in materialConfigs) {
				var sortValue = materialConfigs[key].sortValue;
				sortMaterials[sortValue] = key;
			}

			var keys = Object.keys(sortMaterials).sort();
			for (var i = 0; i < keys.length; i++) {
				expect(sortMaterials[keys[i]]).toBe(materials[i].id);
			}
			expect(entity.meshRendererComponent).toEqual(jasmine.any(_MeshRendererComponent.MeshRendererComponent));
			expect(entity.meshRendererComponent.materials[0]).toEqual(jasmine.any(_Material.Material));
			done();
		});
	});
});
