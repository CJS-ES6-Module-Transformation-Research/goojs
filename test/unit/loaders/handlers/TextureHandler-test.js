import { GooRunner as GooRunner_GooRunner } from "../../../../src/goo/entities/GooRunner";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Texture as Texture_Texture } from "../../../../src/goo/renderer/Texture";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";

describe('TextureHandler', function () {
	var gooRunner, loader;

	beforeEach(function () {
		gooRunner = new GooRunner_GooRunner({
			logo: false,
			manuallyStartGameLoop: true
		});
		loader = new DynamicLoader_DynamicLoader({
			world: gooRunner.world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res/'
		});
	});

	afterEach(function () {
		gooRunner.clear();
	});

	it('loads a texture with an image', function (done) {
		var config = Configs_Configs.texture();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (texture) {
			expect(texture).toEqual(jasmine.any(Texture_Texture));
			expect(texture.image).toEqual(jasmine.any(Image));
			done();
		});
	});

	it('loads a texture with an SVG', function (done) {
		var config = Configs_Configs.textureSVG();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (texture) {
			expect(texture).toEqual(jasmine.any(Texture_Texture));
			done();
		});
	});

	it('clears a texture from the context', function (done) {
		var config = Configs_Configs.texture();
		loader.preload(Configs_Configs.get());
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
