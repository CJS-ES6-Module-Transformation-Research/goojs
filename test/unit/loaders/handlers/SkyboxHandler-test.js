import { Entity as srcgooentitiesEntity_Entityjs } from "../../../../src/goo/entities/Entity";
import {     TransformComponent as srcgooentitiescomponentsTransformComponent_TransformComponentjs, } from "../../../../src/goo/entities/components/TransformComponent";
import {     MeshDataComponent as srcgooentitiescomponentsMeshDataComponent_MeshDataComponentjs, } from "../../../../src/goo/entities/components/MeshDataComponent";
import {     MeshRendererComponent as srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponentjs, } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { RenderSystem as srcgooentitiessystemsRenderSystem_RenderSystemjs } from "../../../../src/goo/entities/systems/RenderSystem";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import {     EnvironmentHandler as srcgooloadershandlersEnvironmentHandler_EnvironmentHandlerjs, } from "../../../../src/goo/loaders/handlers/EnvironmentHandler";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { Texture as srcgoorendererTexture_Texturejs } from "../../../../src/goo/renderer/Texture";
import { Material as srcgoorendererMaterial_Materialjs } from "../../../../src/goo/renderer/Material";
import { Box as srcgooshapesBox_Boxjs } from "../../../../src/goo/shapes/Box";
import { Sphere as srcgooshapesSphere_Spherejs } from "../../../../src/goo/shapes/Sphere";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";

describe('SkyboxHandler', function () {
	var loader, world;
	beforeEach(function () {
		world = new srcgooentitiesWorld_Worldjs();

		// Pretending to be gooRunner
		world.registerComponent(srcgooentitiescomponentsTransformComponent_TransformComponentjs);
		world.registerComponent(srcgooentitiescomponentsMeshDataComponent_MeshDataComponentjs);
		world.registerComponent(srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponentjs);
		world.setSystem(new srcgooentitiessystemsRenderSystem_RenderSystemjs());

		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads a skybox', function (done) {
		var config = testunitloadersConfigs_Configsjs.skybox();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		var renderSystem = world.getSystem('RenderSystem');
		spyOn(renderSystem, 'added');

		srcgooloadershandlersEnvironmentHandler_EnvironmentHandlerjs.currentSkyboxRef = config.id;

		loader.load(config.id).then(function (skyboxes) {
			var skybox = skyboxes[0];
			expect(skybox).toEqual(jasmine.any(srcgooentitiesEntity_Entityjs));

			// expect(renderSystem.added).toHaveBeenCalledWith(skybox); //! AT: this causes problems in jasmine 2.0
			// seems like a bug in their pretty printer (skybox can't be pretty printed)
			// will comment it out for now and replace with just an id check (which is enough in this case)
			expect(renderSystem.added.calls.mostRecent().args[0].id).toEqual(skybox.id);

			expect(skybox.isSkybox).toBeTruthy();

			// Texture and material
			var material = skybox.meshRendererComponent.materials[0];
			expect(material).toEqual(jasmine.any(srcgoorendererMaterial_Materialjs));
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(texture).toEqual(jasmine.any(srcgoorendererTexture_Texturejs));
			expect(texture.image.data.length).toBe(6);

			// Mesh
			var mesh = skybox.meshDataComponent.meshData;
			expect(mesh).toEqual(jasmine.any(srcgooshapesBox_Boxjs));
			done();
		});
	});

	it('loads a skysphere', function (done) {
		var config = testunitloadersConfigs_Configsjs.skybox('sphere');
		loader.preload(testunitloadersConfigs_Configsjs.get());

		srcgooloadershandlersEnvironmentHandler_EnvironmentHandlerjs.currentSkyboxRef = config.id;

		loader.load(config.id).then(function (skyboxes) {
			var skybox = skyboxes[0];
			expect(skybox).toEqual(jasmine.any(srcgooentitiesEntity_Entityjs));
			expect(skybox.isSkybox).toBeTruthy();

			// Texture and material
			var material = skybox.meshRendererComponent.materials[0];
			expect(material).toEqual(jasmine.any(srcgoorendererMaterial_Materialjs));
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(texture).toEqual(jasmine.any(srcgoorendererTexture_Texturejs));
			expect(texture.image).toEqual(jasmine.any(Image));

			// Mesh
			var mesh = skybox.meshDataComponent.meshData;
			expect(mesh).toEqual(jasmine.any(srcgooshapesSphere_Spherejs));
			done();
		});
	});
});
