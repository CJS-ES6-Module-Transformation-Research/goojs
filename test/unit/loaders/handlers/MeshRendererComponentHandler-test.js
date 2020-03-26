import {     MeshRendererComponent as srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponentjs, } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { Material as srcgoorendererMaterial_Materialjs } from "../../../../src/goo/renderer/Material";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";

describe('MeshRendererComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a meshRendererComponent', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['meshRenderer']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshRendererComponent).toEqual(jasmine.any(srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponentjs));
			expect(entity.meshRendererComponent.materials[0]).toEqual(jasmine.any(srcgoorendererMaterial_Materialjs));
			done();
		});
	});

	it('loads materials in right order', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['meshRenderer']);
		var materialConfigs = config.components.meshRenderer.materials;
		loader.preload(testunitloadersConfigs_Configsjs.get());
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
			expect(entity.meshRendererComponent).toEqual(jasmine.any(srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponentjs));
			expect(entity.meshRendererComponent.materials[0]).toEqual(jasmine.any(srcgoorendererMaterial_Materialjs));
			done();
		});
	});
});
