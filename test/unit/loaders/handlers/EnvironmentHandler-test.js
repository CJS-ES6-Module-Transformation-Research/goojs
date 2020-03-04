import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { TransformComponent as TransformComponentjs } from "../../../../src/goo/entities/components/TransformComponent";
import { MeshDataComponent as MeshDataComponentjs } from "../../../../src/goo/entities/components/MeshDataComponent";
import { MeshRendererComponent as MeshRendererComponentjs } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { RenderSystem as RenderSystemjs } from "../../../../src/goo/entities/systems/RenderSystem";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { ShaderBuilder as ShaderBuilderjs } from "../../../../src/goo/renderer/shaders/ShaderBuilder";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/EnvironmentHandler";

describe('EnvironmentHandler', function () {
	var loader, world;

	beforeEach(function () {
		world = new World_Worldjs();

		// Pretending to be gooRunner
		world.registerComponent(TransformComponentjs);
		world.registerComponent(MeshDataComponentjs);
		world.registerComponent(MeshRendererComponentjs);
		world.setSystem(new RenderSystemjs());
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
			expect(ShaderBuilderjs.GLOBAL_AMBIENT).toEqual(environment.globalAmbient);

			expect(ShaderBuilderjs.FOG_SETTINGS).toEqual([environment.fog.near, environment.fog.far]);
			expect(ShaderBuilderjs.FOG_COLOR).toEqual(environment.fog.color);
			expect(ShaderBuilderjs.USE_FOG).toBe(environment.fog.enabled);

			expect(world._addedEntities).toContain(
				environment.weatherState.snow.snow.particleCloudEntity
			);

			done();
		});
	});
});
