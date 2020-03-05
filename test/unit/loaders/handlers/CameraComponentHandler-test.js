import { DynamicLoader as DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { World as Worldjs } from "../../../../src/goo/entities/World";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import { CameraComponent as CameraComponentjs } from "../../../../src/goo/entities/components/CameraComponent";
import { Camera as Camerajs } from "../../../../src/goo/renderer/Camera";

describe('CameraComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new Worldjs();
		loader = new DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a cameraComponent', function (done) {
		var config = Configs_Configsjs.entity(['camera']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.cameraComponent).toEqual(jasmine.any(CameraComponentjs));
			expect(entity.cameraComponent.camera).toEqual(jasmine.any(Camerajs));
			done();
		});
	});

	it('loads the correct camera settings', function (done) {
		var config = Configs_Configsjs.entity(['camera']);
		loader.preload(Configs_Configsjs.get());
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
