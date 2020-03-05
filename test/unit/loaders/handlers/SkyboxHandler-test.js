import { Entity as Entity_Entityjs } from "../../../../src/goo/entities/Entity";
import { TransformComponent as TransformComponent_TransformComponentjs } from "../../../../src/goo/entities/components/TransformComponent";
import { MeshDataComponent as MeshDataComponent_MeshDataComponentjs } from "../../../../src/goo/entities/components/MeshDataComponent";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponentjs } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { RenderSystem as RenderSystem_RenderSystemjs } from "../../../../src/goo/entities/systems/RenderSystem";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { EnvironmentHandler as EnvironmentHandler_EnvironmentHandlerjs } from "../../../../src/goo/loaders/handlers/EnvironmentHandler";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { Texture as Texture_Texturejs } from "../../../../src/goo/renderer/Texture";
import { Material as Material_Materialjs } from "../../../../src/goo/renderer/Material";
import { Box as Box_Boxjs } from "../../../../src/goo/shapes/Box";
import { Sphere as Sphere_Spherejs } from "../../../../src/goo/shapes/Sphere";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";

describe('SkyboxHandler', function () {
	var loader, world;
	beforeEach(function () {
		world = new World_Worldjs();

		// Pretending to be gooRunner
		world.registerComponent(TransformComponent_TransformComponentjs);
		world.registerComponent(MeshDataComponent_MeshDataComponentjs);
		world.registerComponent(MeshRendererComponent_MeshRendererComponentjs);
		world.setSystem(new RenderSystem_RenderSystemjs());

		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads a skybox', function (done) {
		var config = Configs_Configsjs.skybox();
		loader.preload(Configs_Configsjs.get());
		var renderSystem = world.getSystem('RenderSystem');
		spyOn(renderSystem, 'added');

		EnvironmentHandler_EnvironmentHandlerjs.currentSkyboxRef = config.id;

		loader.load(config.id).then(function (skyboxes) {
			var skybox = skyboxes[0];
			expect(skybox).toEqual(jasmine.any(Entity_Entityjs));

			// expect(renderSystem.added).toHaveBeenCalledWith(skybox); //! AT: this causes problems in jasmine 2.0
			// seems like a bug in their pretty printer (skybox can't be pretty printed)
			// will comment it out for now and replace with just an id check (which is enough in this case)
			expect(renderSystem.added.calls.mostRecent().args[0].id).toEqual(skybox.id);

			expect(skybox.isSkybox).toBeTruthy();

			// Texture and material
			var material = skybox.meshRendererComponent.materials[0];
			expect(material).toEqual(jasmine.any(Material_Materialjs));
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(texture).toEqual(jasmine.any(Texture_Texturejs));
			expect(texture.image.data.length).toBe(6);

			// Mesh
			var mesh = skybox.meshDataComponent.meshData;
			expect(mesh).toEqual(jasmine.any(Box_Boxjs));
			done();
		});
	});

	it('loads a skysphere', function (done) {
		var config = Configs_Configsjs.skybox('sphere');
		loader.preload(Configs_Configsjs.get());

		EnvironmentHandler_EnvironmentHandlerjs.currentSkyboxRef = config.id;

		loader.load(config.id).then(function (skyboxes) {
			var skybox = skyboxes[0];
			expect(skybox).toEqual(jasmine.any(Entity_Entityjs));
			expect(skybox.isSkybox).toBeTruthy();

			// Texture and material
			var material = skybox.meshRendererComponent.materials[0];
			expect(material).toEqual(jasmine.any(Material_Materialjs));
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(texture).toEqual(jasmine.any(Texture_Texturejs));
			expect(texture.image).toEqual(jasmine.any(Image));

			// Mesh
			var mesh = skybox.meshDataComponent.meshData;
			expect(mesh).toEqual(jasmine.any(Sphere_Spherejs));
			done();
		});
	});
});
