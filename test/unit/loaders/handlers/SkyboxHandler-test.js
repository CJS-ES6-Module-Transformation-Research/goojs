var _Entity = require("../../../../src/goo/entities/Entity");

var _TransformComponent = require("../../../../src/goo/entities/components/TransformComponent");

var _MeshDataComponent = require("../../../../src/goo/entities/components/MeshDataComponent");

var _MeshRendererComponent = require("../../../../src/goo/entities/components/MeshRendererComponent");

var _RenderSystem = require("../../../../src/goo/entities/systems/RenderSystem");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _EnvironmentHandler = require("../../../../src/goo/loaders/handlers/EnvironmentHandler");

var _World = require("../../../../src/goo/entities/World");

var _Texture = require("../../../../src/goo/renderer/Texture");

var _Material = require("../../../../src/goo/renderer/Material");

var _Box = require("../../../../src/goo/shapes/Box");

var _Sphere = require("../../../../src/goo/shapes/Sphere");

var _Configs = require("../../../../test/unit/loaders/Configs");

describe('SkyboxHandler', function () {
	var loader, world;
	beforeEach(function () {
		world = new _World.World();

		// Pretending to be gooRunner
		world.registerComponent(_TransformComponent.TransformComponent);
		world.registerComponent(_MeshDataComponent.MeshDataComponent);
		world.registerComponent(_MeshRendererComponent.MeshRendererComponent);
		world.setSystem(new _RenderSystem.RenderSystem());

		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: typeof window !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads a skybox', function (done) {
		var config = _Configs.Configs.skybox();
		loader.preload(_Configs.Configs.get());
		var renderSystem = world.getSystem('RenderSystem');
		spyOn(renderSystem, 'added');

		_EnvironmentHandler.EnvironmentHandler.currentSkyboxRef = config.id;

		loader.load(config.id).then(function (skyboxes) {
			var skybox = skyboxes[0];
			expect(skybox).toEqual(jasmine.any(_Entity.Entity));

			// expect(renderSystem.added).toHaveBeenCalledWith(skybox); //! AT: this causes problems in jasmine 2.0
			// seems like a bug in their pretty printer (skybox can't be pretty printed)
			// will comment it out for now and replace with just an id check (which is enough in this case)
			expect(renderSystem.added.calls.mostRecent().args[0].id).toEqual(skybox.id);

			expect(skybox.isSkybox).toBeTruthy();

			// Texture and material
			var material = skybox.meshRendererComponent.materials[0];
			expect(material).toEqual(jasmine.any(_Material.Material));
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(texture).toEqual(jasmine.any(_Texture.Texture));
			expect(texture.image.data.length).toBe(6);

			// Mesh
			var mesh = skybox.meshDataComponent.meshData;
			expect(mesh).toEqual(jasmine.any(_Box.Box));
			done();
		});
	});

	it('loads a skysphere', function (done) {
		var config = _Configs.Configs.skybox('sphere');
		loader.preload(_Configs.Configs.get());

		_EnvironmentHandler.EnvironmentHandler.currentSkyboxRef = config.id;

		loader.load(config.id).then(function (skyboxes) {
			var skybox = skyboxes[0];
			expect(skybox).toEqual(jasmine.any(_Entity.Entity));
			expect(skybox.isSkybox).toBeTruthy();

			// Texture and material
			var material = skybox.meshRendererComponent.materials[0];
			expect(material).toEqual(jasmine.any(_Material.Material));
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(texture).toEqual(jasmine.any(_Texture.Texture));
			expect(texture.image).toEqual(jasmine.any(Image));

			// Mesh
			var mesh = skybox.meshDataComponent.meshData;
			expect(mesh).toEqual(jasmine.any(_Sphere.Sphere));
			done();
		});
	});
});
