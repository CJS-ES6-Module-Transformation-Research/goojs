import { Entity as Entity_Entity } from "../../../../src/goo/entities/Entity";
import { TransformComponent as TransformComponent_TransformComponent } from "../../../../src/goo/entities/components/TransformComponent";
import { MeshDataComponent as MeshDataComponent_MeshDataComponent } from "../../../../src/goo/entities/components/MeshDataComponent";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponent } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { RenderSystem as RenderSystem_RenderSystem } from "../../../../src/goo/entities/systems/RenderSystem";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { currentSkyboxRef as EnvironmentHandlerjs_currentSkyboxRef } from "../../../../src/goo/loaders/handlers/EnvironmentHandler";
import { World as World_World } from "../../../../src/goo/entities/World";
import { Texture as Texture_Texture } from "../../../../src/goo/renderer/Texture";
import { Material as Material_Material } from "../../../../src/goo/renderer/Material";
import { Box as Box_Box } from "../../../../src/goo/shapes/Box";
import { Sphere as Sphere_Sphere } from "../../../../src/goo/shapes/Sphere";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
var EnvironmentHandlerjs_currentSkyboxRef_binding = EnvironmentHandlerjs_currentSkyboxRef;

describe('SkyboxHandler', function () {
	var loader, world;
	beforeEach(function () {
		world = new World_World();

		// Pretending to be gooRunner
		world.registerComponent(TransformComponent_TransformComponent);
		world.registerComponent(MeshDataComponent_MeshDataComponent);
		world.registerComponent(MeshRendererComponent_MeshRendererComponent);
		world.setSystem(new RenderSystem_RenderSystem());

		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads a skybox', function (done) {
		var config = Configs_Configs.skybox();
		loader.preload(Configs_Configs.get());
		var renderSystem = world.getSystem('RenderSystem');
		spyOn(renderSystem, 'added');

		EnvironmentHandlerjs_currentSkyboxRef_binding = config.id;

		loader.load(config.id).then(function (skyboxes) {
			var skybox = skyboxes[0];
			expect(skybox).toEqual(jasmine.any(Entity_Entity));

			// expect(renderSystem.added).toHaveBeenCalledWith(skybox); //! AT: this causes problems in jasmine 2.0
			// seems like a bug in their pretty printer (skybox can't be pretty printed)
			// will comment it out for now and replace with just an id check (which is enough in this case)
			expect(renderSystem.added.calls.mostRecent().args[0].id).toEqual(skybox.id);

			expect(skybox.isSkybox).toBeTruthy();

			// Texture and material
			var material = skybox.meshRendererComponent.materials[0];
			expect(material).toEqual(jasmine.any(Material_Material));
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(texture).toEqual(jasmine.any(Texture_Texture));
			expect(texture.image.data.length).toBe(6);

			// Mesh
			var mesh = skybox.meshDataComponent.meshData;
			expect(mesh).toEqual(jasmine.any(Box_Box));
			done();
		});
	});

	it('loads a skysphere', function (done) {
		var config = Configs_Configs.skybox('sphere');
		loader.preload(Configs_Configs.get());

		EnvironmentHandlerjs_currentSkyboxRef_binding = config.id;

		loader.load(config.id).then(function (skyboxes) {
			var skybox = skyboxes[0];
			expect(skybox).toEqual(jasmine.any(Entity_Entity));
			expect(skybox.isSkybox).toBeTruthy();

			// Texture and material
			var material = skybox.meshRendererComponent.materials[0];
			expect(material).toEqual(jasmine.any(Material_Material));
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(texture).toEqual(jasmine.any(Texture_Texture));
			expect(texture.image).toEqual(jasmine.any(Image));

			// Mesh
			var mesh = skybox.meshDataComponent.meshData;
			expect(mesh).toEqual(jasmine.any(Sphere_Sphere));
			done();
		});
	});
});
