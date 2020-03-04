import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { Material as Materialjs } from "../../../../src/goo/renderer/Material";
import { Shader as Shaderjs } from "../../../../src/goo/renderer/Shader";
import { Texture as Texturejs } from "../../../../src/goo/renderer/Texture";
import { uber as ShaderLibjs_uber } from "../../../../src/goo/renderer/shaders/ShaderLib";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/MaterialHandler";

describe('MaterialHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads a material with a shader', function (done) {
		var config = Configs_Configsjs.material();
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (material) {
			expect(material).toEqual(jasmine.any(Materialjs));
			expect(material.shader).toEqual(jasmine.any(Shaderjs));
			done();
		});
	});

	it('loads a material with a shader and a texture', function (done) {
		var config = Configs_Configsjs.material();
		config.texturesMapping.DIFFUSE_MAP = {
			enabled: true,
			textureRef: Configs_Configsjs.texture().id
		};
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (material) {
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(material.shader).toEqual(jasmine.any(Shaderjs));
			expect(texture).toEqual(jasmine.any(Texturejs));
			expect(texture.image).toEqual(jasmine.any(Image));
			done();
		});
	});

	it('loads a material with an engine shader', function (done) {
		var config = Configs_Configsjs.material();
		config.shaderRef = 'GOO_ENGINE_SHADERS/uber';
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (material) {
			expect(material.shader.shaderDefinition).toBe(ShaderLibjs_uber);
			done();
		});
	});
});
