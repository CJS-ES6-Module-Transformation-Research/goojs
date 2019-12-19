var _World = require("../../../../src/goo/entities/World");

var _TransformComponent = require("../../../../src/goo/entities/components/TransformComponent");

var _MeshDataComponent = require("../../../../src/goo/entities/components/MeshDataComponent");

var _MeshRendererComponent = require("../../../../src/goo/entities/components/MeshRendererComponent");

var _RenderSystem = require("../../../../src/goo/entities/systems/RenderSystem");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _ShaderBuilder = require("../../../../src/goo/renderer/shaders/ShaderBuilder");

var ShaderBuilder = _interopRequireWildcard(_ShaderBuilder);

require("../../../../src/goo/loaders/handlers/EnvironmentHandler");

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var Configs = require('../../../../test/unit/loaders/Configs');

describe('EnvironmentHandler', function () {
	var loader, world;

	beforeEach(function () {
		world = new _World.World();

		// Pretending to be gooRunner
		world.registerComponent(_TransformComponent.TransformComponent);
		world.registerComponent(_MeshDataComponent.MeshDataComponent);
		world.registerComponent(_MeshRendererComponent.MeshRendererComponent);
		world.setSystem(new _RenderSystem.RenderSystem());
		// Faking a goorunner
		world.gooRunner = {
			world: world
		};

		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: typeof window !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads an environment', function (done) {
		var config = Configs.environment();
		loader.preload(Configs.get());
		loader.load(config.id).then(function (environment) {
			expect(ShaderBuilder.GLOBAL_AMBIENT).toEqual(environment.globalAmbient);

			expect(ShaderBuilder.FOG_SETTINGS).toEqual([environment.fog.near, environment.fog.far]);
			expect(ShaderBuilder.FOG_COLOR).toEqual(environment.fog.color);
			expect(ShaderBuilder.USE_FOG).toBe(environment.fog.enabled);

			expect(world._addedEntities).toContain(environment.weatherState.snow.snow.particleCloudEntity);

			done();
		});
	});
});
