import { GooRunner as GooRunner_GooRunner } from "../../../../src/goo/entities/GooRunner";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Shader as Shader_Shader } from "../../../../src/goo/renderer/Shader";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";

describe('ShaderHandler', function () {
	var gooRunner, loader;

	beforeEach(function () {
		gooRunner = new GooRunner_GooRunner({
			logo: false,
			manuallyStartGameLoop: true
		});
		loader = new DynamicLoader_DynamicLoader({
			world: gooRunner.world,
			rootPath: 'loaders/res/'
		});
	});

	afterEach(function () {
		gooRunner.clear();
	});

	it('loads a shader', function (done) {
		var config = Configs_Configs.shader();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (shader) {
			expect(shader).toEqual(jasmine.any(Shader_Shader));
			done();
		});
	});

	it('clears shader from the GPU', function (done) {
		var config = Configs_Configs.shader();
		loader.preload(Configs_Configs.get());
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
