import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import {     CameraComponent as srcgooentitiescomponentsCameraComponent_CameraComponentjs, } from "../../../../src/goo/entities/components/CameraComponent";
import { Camera as srcgoorendererCamera_Camerajs } from "../../../../src/goo/renderer/Camera";

describe('CameraComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a cameraComponent', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['camera']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.cameraComponent).toEqual(jasmine.any(srcgooentitiescomponentsCameraComponent_CameraComponentjs));
			expect(entity.cameraComponent.camera).toEqual(jasmine.any(srcgoorendererCamera_Camerajs));
			done();
		});
	});

	it('loads the correct camera settings', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['camera']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			var camera = entity.cameraComponent.camera;
			var cameraConfig = config.components.camera;
			for (var key in cameraConfig) {
				if (key !== 'projectionMode') {
					expect(camera[key]).toBe(cameraConfig[key]);
				}
			}
			done();
		});
	});
});
