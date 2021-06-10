import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { World as World_World } from "../../../../src/goo/entities/World";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import { CameraComponent as CameraComponent_CameraComponent } from "../../../../src/goo/entities/components/CameraComponent";
import { Camera as Camera_Camera } from "../../../../src/goo/renderer/Camera";

describe('CameraComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a cameraComponent', function (done) {
		var config = Configs_Configs.entity(['camera']);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.cameraComponent).toEqual(jasmine.any(CameraComponent_CameraComponent));
			expect(entity.cameraComponent.camera).toEqual(jasmine.any(Camera_Camera));
			done();
		});
	});

	it('loads the correct camera settings', function (done) {
		var config = Configs_Configs.entity(['camera']);
		loader.preload(Configs_Configs.get());
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
