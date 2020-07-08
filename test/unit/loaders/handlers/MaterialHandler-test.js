import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { Material as srcgoorendererMaterial_Materialjs } from "../../../../src/goo/renderer/Material";
import { Shader as srcgoorendererShader_Shaderjs } from "../../../../src/goo/renderer/Shader";
import { Texture as srcgoorendererTexture_Texturejs } from "../../../../src/goo/renderer/Texture";
import { uber as ShaderLibjs_uber } from "../../../../src/goo/renderer/shaders/ShaderLib";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/MaterialHandler";

describe('MaterialHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads a material with a shader', function (done) {
		var config = testunitloadersConfigs_Configsjs.material();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (material) {
			expect(material).toEqual(jasmine.any(srcgoorendererMaterial_Materialjs));
			expect(material.shader).toEqual(jasmine.any(srcgoorendererShader_Shaderjs));
			done();
		});
	});

	it('loads a material with a shader and a texture', function (done) {
		var config = testunitloadersConfigs_Configsjs.material();
		config.texturesMapping.DIFFUSE_MAP = {
			enabled: true,
			textureRef: testunitloadersConfigs_Configsjs.texture().id
		};
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (material) {
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(material.shader).toEqual(jasmine.any(srcgoorendererShader_Shaderjs));
			expect(texture).toEqual(jasmine.any(srcgoorendererTexture_Texturejs));
			expect(texture.image).toEqual(jasmine.any(Image));
			done();
		});
	});

	it('loads a material with an engine shader', function (done) {
		var config = testunitloadersConfigs_Configsjs.material();
		config.shaderRef = 'GOO_ENGINE_SHADERS/uber';
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (material) {
			expect(material.shader.shaderDefinition).toBe(ShaderLibjs_uber);
			done();
		});
	});
});
