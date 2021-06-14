import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponent } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { Material as Material_Material } from "../../../../src/goo/renderer/Material";
import { World as World_World } from "../../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";

describe('MeshRendererComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a meshRendererComponent', function (done) {
		var config = Configs_Configs.entity(['meshRenderer']);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshRendererComponent).toEqual(jasmine.any(MeshRendererComponent_MeshRendererComponent));
			expect(entity.meshRendererComponent.materials[0]).toEqual(jasmine.any(Material_Material));
			done();
		});
	});

	it('loads materials in right order', function (done) {
		var config = Configs_Configs.entity(['meshRenderer']);
		var materialConfigs = config.components.meshRenderer.materials;
		loader.preload(Configs_Configs.get());
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
			expect(entity.meshRendererComponent).toEqual(jasmine.any(MeshRendererComponent_MeshRendererComponent));
			expect(entity.meshRendererComponent.materials[0]).toEqual(jasmine.any(Material_Material));
			done();
		});
	});
});
