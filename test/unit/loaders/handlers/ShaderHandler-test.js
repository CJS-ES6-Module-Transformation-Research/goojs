import { GooRunner as GooRunner_GooRunnerjs } from "../../../../src/goo/entities/GooRunner";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Shader as Shader_Shaderjs } from "../../../../src/goo/renderer/Shader";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";

describe('ShaderHandler', function () {
	var gooRunner, loader;

	beforeEach(function () {
		gooRunner = new GooRunner_GooRunnerjs({
			logo: false,
			manuallyStartGameLoop: true
		});
		loader = new DynamicLoader_DynamicLoaderjs({
			world: gooRunner.world,
			rootPath: 'loaders/res/'
		});
	});

	afterEach(function () {
		gooRunner.clear();
	});

	it('loads a shader', function (done) {
		var config = Configs_Configsjs.shader();
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (shader) {
			expect(shader).toEqual(jasmine.any(Shader_Shaderjs));
			done();
		});
	});

	it('clears shader from the GPU', function (done) {
		var config = Configs_Configsjs.shader();
		loader.preload(Configs_Configsjs.get());
		var s;
		loader.load(config.id).then(function (shader) {
			s = shader;
			shader.compile(gooRunner.renderer);
			expect(s.shaderProgram).toBeTruthy();
			expect(s.fragmentShader).toBeTruthy();
			expect(s.vertexShader).toBeTruthy();
			return loader.clear();
		}).then(function () {
			expect(s.shaderProgram).toBeFalsy();
			expect(s.fragmentShader).toBeFalsy();
			expect(s.vertexShader).toBeFalsy();
			done();
		});
	});
});
