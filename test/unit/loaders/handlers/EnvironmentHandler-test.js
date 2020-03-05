import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { TransformComponent as TransformComponent_TransformComponentjs } from "../../../../src/goo/entities/components/TransformComponent";
import { MeshDataComponent as MeshDataComponent_MeshDataComponentjs } from "../../../../src/goo/entities/components/MeshDataComponent";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponentjs } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { RenderSystem as RenderSystem_RenderSystemjs } from "../../../../src/goo/entities/systems/RenderSystem";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { ShaderBuilder as ShaderBuilder_ShaderBuilderjs } from "../../../../src/goo/renderer/shaders/ShaderBuilder";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/EnvironmentHandler";

describe('EnvironmentHandler', function () {
	var loader, world;

	beforeEach(function () {
		world = new World_Worldjs();

		// Pretending to be gooRunner
		world.registerComponent(TransformComponent_TransformComponentjs);
		world.registerComponent(MeshDataComponent_MeshDataComponentjs);
		world.registerComponent(MeshRendererComponent_MeshRendererComponentjs);
		world.setSystem(new RenderSystem_RenderSystemjs());
		// Faking a goorunner
		world.gooRunner = {
			world: world
		};

		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads an environment', function (done) {
		var config = Configs_Configsjs.environment();
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (environment) {
			expect(ShaderBuilder_ShaderBuilderjs.GLOBAL_AMBIENT).toEqual(environment.globalAmbient);

			expect(ShaderBuilder_ShaderBuilderjs.FOG_SETTINGS).toEqual([environment.fog.near, environment.fog.far]);
			expect(ShaderBuilder_ShaderBuilderjs.FOG_COLOR).toEqual(environment.fog.color);
			expect(ShaderBuilder_ShaderBuilderjs.USE_FOG).toBe(environment.fog.enabled);

			expect(world._addedEntities).toContain(
				environment.weatherState.snow.snow.particleCloudEntity
			);

			done();
		});
	});
});
