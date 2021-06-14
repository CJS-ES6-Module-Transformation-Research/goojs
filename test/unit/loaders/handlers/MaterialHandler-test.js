"use strict";

var _World = require("../../../../src/goo/entities/World");

var _Material = require("../../../../src/goo/renderer/Material");

var _Shader = require("../../../../src/goo/renderer/Shader");

var _Texture = require("../../../../src/goo/renderer/Texture");

var _ShaderLib = require("../../../../src/goo/renderer/shaders/ShaderLib");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _Configs = require("../../../../test/unit/loaders/Configs");

require("../../../../src/goo/loaders/handlers/MaterialHandler");

describe('MaterialHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: typeof window !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads a material with a shader', function (done) {
		var config = _Configs.Configs.material();
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (material) {
			expect(material).toEqual(jasmine.any(_Material.Material));
			expect(material.shader).toEqual(jasmine.any(_Shader.Shader));
			done();
		});
	});

	it('loads a material with a shader and a texture', function (done) {
		var config = _Configs.Configs.material();
		config.texturesMapping.DIFFUSE_MAP = {
			enabled: true,
			textureRef: _Configs.Configs.texture().id
		};
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (material) {
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(material.shader).toEqual(jasmine.any(_Shader.Shader));
			expect(texture).toEqual(jasmine.any(_Texture.Texture));
			expect(texture.image).toEqual(jasmine.any(Image));
			done();
		});
	});

	it('loads a material with an engine shader', function (done) {
		var config = _Configs.Configs.material();
		config.shaderRef = 'GOO_ENGINE_SHADERS/uber';
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (material) {
			expect(material.shader.shaderDefinition).toBe(_ShaderLib.ShaderLib.uber);
			done();
		});
	});
});