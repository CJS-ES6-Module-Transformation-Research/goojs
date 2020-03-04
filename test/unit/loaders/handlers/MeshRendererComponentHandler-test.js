import { MeshRendererComponent as MeshRendererComponentjs } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { Material as Materialjs } from "../../../../src/goo/renderer/Material";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";

describe('MeshRendererComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a meshRendererComponent', function (done) {
		var config = Configs_Configsjs.entity(['meshRenderer']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshRendererComponent).toEqual(jasmine.any(MeshRendererComponentjs));
			expect(entity.meshRendererComponent.materials[0]).toEqual(jasmine.any(Materialjs));
			done();
		});
	});

	it('loads materials in right order', function (done) {
		var config = Configs_Configsjs.entity(['meshRenderer']);
		var materialConfigs = config.components.meshRenderer.materials;
		loader.preload(Configs_Configsjs.get());
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
			expect(entity.meshRendererComponent).toEqual(jasmine.any(MeshRendererComponentjs));
			expect(entity.meshRendererComponent.materials[0]).toEqual(jasmine.any(Materialjs));
			done();
		});
	});
});
