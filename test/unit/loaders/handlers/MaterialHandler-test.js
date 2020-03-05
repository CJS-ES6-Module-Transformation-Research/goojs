import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { Material as Material_Materialjs } from "../../../../src/goo/renderer/Material";
import { Shader as Shader_Shaderjs } from "../../../../src/goo/renderer/Shader";
import { Texture as Texture_Texturejs } from "../../../../src/goo/renderer/Texture";
import { ShaderLib as ShaderLib_ShaderLibjs } from "../../../../src/goo/renderer/shaders/ShaderLib";
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
			expect(material).toEqual(jasmine.any(Material_Materialjs));
			expect(material.shader).toEqual(jasmine.any(Shader_Shaderjs));
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
			expect(material.shader).toEqual(jasmine.any(Shader_Shaderjs));
			expect(texture).toEqual(jasmine.any(Texture_Texturejs));
			expect(texture.image).toEqual(jasmine.any(Image));
			done();
		});
	});

	it('loads a material with an engine shader', function (done) {
		var config = Configs_Configsjs.material();
		config.shaderRef = 'GOO_ENGINE_SHADERS/uber';
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (material) {
			expect(material.shader.shaderDefinition).toBe(ShaderLib_ShaderLibjs.uber);
			done();
		});
	});
});
