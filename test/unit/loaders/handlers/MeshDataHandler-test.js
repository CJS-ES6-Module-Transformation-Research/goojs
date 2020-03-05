import { MeshData as MeshData_MeshDatajs } from "../../../../src/goo/renderer/MeshData";
import { GooRunner as GooRunner_GooRunnerjs } from "../../../../src/goo/entities/GooRunner";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";

describe('MeshDataHandler', function () {
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

	it('loads a meshdata object', function (done) {
		var config = Configs_Configsjs.mesh();
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (mesh) {
			expect(mesh).toEqual(jasmine.any(MeshData_MeshDatajs));
			for (var key in config.attributes) {
				var view = mesh.dataViews[key];
				expect(view).toEqual(jasmine.any(Float32Array));

				var length = config.vertexCount * config.attributes[key].dimensions;
				expect(view.length).toBe(length);
			}
			done();
		}, function () {
			expect('').toEqual('Should never reach this');
			done();
		});
	});

	it('clears meshdata from the GPU', function (done) {
		var config = Configs_Configsjs.mesh();
		loader.preload(Configs_Configsjs.get());
		var m;
		loader.load(config.id).then(function (meshdata) {
			m = meshdata;
			m.vertexData.glBuffer = gooRunner.renderer.context.createBuffer();
			m.indexData.glBuffer = gooRunner.renderer.context.createBuffer();
			return loader.clear();
		}).then(function () {
			expect(m.vertexData.glBuffer).toBeFalsy();
			expect(m.indexData.glBuffer).toBeFalsy();
			done();
		});
	});
});
