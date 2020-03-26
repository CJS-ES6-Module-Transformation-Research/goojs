import { GooRunner as srcgooentitiesGooRunner_GooRunnerjs } from "../../../../src/goo/entities/GooRunner";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Texture as srcgoorendererTexture_Texturejs } from "../../../../src/goo/renderer/Texture";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";

describe('TextureHandler', function () {
	var gooRunner, loader;

	beforeEach(function () {
		gooRunner = new srcgooentitiesGooRunner_GooRunnerjs({
			logo: false,
			manuallyStartGameLoop: true
		});
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: gooRunner.world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res/'
		});
	});

	afterEach(function () {
		gooRunner.clear();
	});

	it('loads a texture with an image', function (done) {
		var config = testunitloadersConfigs_Configsjs.texture();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (texture) {
			expect(texture).toEqual(jasmine.any(srcgoorendererTexture_Texturejs));
			expect(texture.image).toEqual(jasmine.any(Image));
			done();
		});
	});

	it('loads a texture with an SVG', function (done) {
		var config = testunitloadersConfigs_Configsjs.textureSVG();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (texture) {
			expect(texture).toEqual(jasmine.any(srcgoorendererTexture_Texturejs));
			done();
		});
	});

	it('clears a texture from the context', function (done) {
		var config = testunitloadersConfigs_Configsjs.texture();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		var t;
		loader.load(config.id).then(function (texture) {
			t = texture;
			// Allocate a dummy texture on the context
			texture.glTexture = gooRunner.renderer.context.createTexture();
			gooRunner.renderer.preloadTexture(gooRunner.renderer.context, texture);
			return loader.clear();
		}).then(function () {
			expect(t.glTexture).toBeFalsy();
			done();
		});
	});
});
