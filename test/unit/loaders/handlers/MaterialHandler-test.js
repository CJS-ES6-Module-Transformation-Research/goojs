var _World = require("../../../../src/goo/entities/World");

var _Material = require("../../../../src/goo/renderer/Material");

var _Shader = require("../../../../src/goo/renderer/Shader");

var _Texture = require("../../../../src/goo/renderer/Texture");

var _ShaderLib = require("../../../../src/goo/renderer/shaders/ShaderLib");

var ShaderLib = _interopRequireWildcard(_ShaderLib);

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

require("../../../../src/goo/loaders/handlers/MaterialHandler");

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
		var config = Configs.material();
		loader.preload(Configs.get());
		loader.load(config.id).then(function (material) {
			expect(material).toEqual(jasmine.any(_Material.Material));
			expect(material.shader).toEqual(jasmine.any(_Shader.Shader));
			done();
		});
	});

	it('loads a material with a shader and a texture', function (done) {
		var config = Configs.material();
		config.texturesMapping.DIFFUSE_MAP = {
			enabled: true,
			textureRef: Configs.texture().id
		};
		loader.preload(Configs.get());
		loader.load(config.id).then(function (material) {
			var texture = material.getTexture('DIFFUSE_MAP');
			expect(material.shader).toEqual(jasmine.any(_Shader.Shader));
			expect(texture).toEqual(jasmine.any(_Texture.Texture));
			expect(texture.image).toEqual(jasmine.any(Image));
			done();
		});
	});

	it('loads a material with an engine shader', function (done) {
		var config = Configs.material();
		config.shaderRef = 'GOO_ENGINE_SHADERS/uber';
		loader.preload(Configs.get());
		loader.load(config.id).then(function (material) {
			expect(material.shader.shaderDefinition).toBe(ShaderLib.uber);
			done();
		});
	});
});
