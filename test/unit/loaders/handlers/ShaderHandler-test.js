import { GooRunner as srcgooentitiesGooRunner_GooRunnerjs } from "../../../../src/goo/entities/GooRunner";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Shader as srcgoorendererShader_Shaderjs } from "../../../../src/goo/renderer/Shader";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";

describe('ShaderHandler', function () {
	var gooRunner, loader;

	beforeEach(function () {
		gooRunner = new srcgooentitiesGooRunner_GooRunnerjs({
			logo: false,
			manuallyStartGameLoop: true
		});
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: gooRunner.world,
			rootPath: 'loaders/res/'
		});
	});

	afterEach(function () {
		gooRunner.clear();
	});

	it('loads a shader', function (done) {
		var config = testunitloadersConfigs_Configsjs.shader();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (shader) {
			expect(shader).toEqual(jasmine.any(srcgoorendererShader_Shaderjs));
			done();
		});
	});

	it('clears shader from the GPU', function (done) {
		var config = testunitloadersConfigs_Configsjs.shader();
		loader.preload(testunitloadersConfigs_Configsjs.get());
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
