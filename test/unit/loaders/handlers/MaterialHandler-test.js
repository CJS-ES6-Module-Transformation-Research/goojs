import { World as World_World } from "../../../../src/goo/entities/World";
import { Material as Material_Material } from "../../../../src/goo/renderer/Material";
import { Shader as Shader_Shader } from "../../../../src/goo/renderer/Shader";
import { Texture as Texture_Texture } from "../../../../src/goo/renderer/Texture";
import { ShaderLib as ShaderLib_ShaderLib } from "../../../../src/goo/renderer/shaders/ShaderLib";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/MaterialHandler";

describe('MaterialHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads a material with a shader', function (done) {
		var config = Configs_Configs.material();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (material) {
			expect(material).toEqual(jasmine.any(Material_Material));
			expect(material.shader).toEqual(jasmine.any(Shader_Shader));
			done();
		});
	});

	it('loads a material with a shader and a texture', function (done) {
		var config = Configs_Configs.material();
		config.texturesMapping.DIFFUSE_MAP = {
			enabled: true,
			textureRef: Configs_Configs.texture().id
		};
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (material) {
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(material.shader).toEqual(jasmine.any(Shader_Shader));
			expect(texture).toEqual(jasmine.any(Texture_Texture));
			expect(texture.image).toEqual(jasmine.any(Image));
			done();
		});
	});

	it('loads a material with an engine shader', function (done) {
		var config = Configs_Configs.material();
		config.shaderRef = 'GOO_ENGINE_SHADERS/uber';
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (material) {
			expect(material.shader.shaderDefinition).toBe(ShaderLib_ShaderLib.uber);
			done();
		});
	});
});
