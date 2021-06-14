import { World as World_World } from "../../../../src/goo/entities/World";
import { TransformComponent as TransformComponent_TransformComponent } from "../../../../src/goo/entities/components/TransformComponent";
import { MeshDataComponent as MeshDataComponent_MeshDataComponent } from "../../../../src/goo/entities/components/MeshDataComponent";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponent } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { RenderSystem as RenderSystem_RenderSystem } from "../../../../src/goo/entities/systems/RenderSystem";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { ShaderBuilder as ShaderBuilder_ShaderBuilder } from "../../../../src/goo/renderer/shaders/ShaderBuilder";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/EnvironmentHandler";

describe('EnvironmentHandler', function () {
	var loader, world;

	beforeEach(function () {
		world = new World_World();

		// Pretending to be gooRunner
		world.registerComponent(TransformComponent_TransformComponent);
		world.registerComponent(MeshDataComponent_MeshDataComponent);
		world.registerComponent(MeshRendererComponent_MeshRendererComponent);
		world.setSystem(new RenderSystem_RenderSystem());
		// Faking a goorunner
		world.gooRunner = {
			world: world
		};

		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads an environment', function (done) {
		var config = Configs_Configs.environment();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (environment) {
			expect(ShaderBuilder_ShaderBuilder.GLOBAL_AMBIENT).toEqual(environment.globalAmbient);

			expect(ShaderBuilder_ShaderBuilder.FOG_SETTINGS).toEqual([environment.fog.near, environment.fog.far]);
			expect(ShaderBuilder_ShaderBuilder.FOG_COLOR).toEqual(environment.fog.color);
			expect(ShaderBuilder_ShaderBuilder.USE_FOG).toBe(environment.fog.enabled);

			expect(world._addedEntities).toContain(
				environment.weatherState.snow.snow.particleCloudEntity
			);

			done();
		});
	});
});
