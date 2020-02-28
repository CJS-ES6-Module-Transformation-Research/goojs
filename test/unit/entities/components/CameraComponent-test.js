import { Entity as Entityjs } from "../../../../src/goo/entities/Entity";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import * as SystemBus from "../../../../src/goo/entities/SystemBus";
import { Camera as Camerajs } from "../../../../src/goo/renderer/Camera";
import { CameraComponent as CameraComponentjs } from "../../../../src/goo/entities/components/CameraComponent";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('CameraComponent', function () {
	var world;

	beforeEach(function () {
		world = new World_Worldjs();
		world.registerComponent(CameraComponentjs);
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	it('attaches .setAsMainCamera to the host entity', function () {
		var camera = new Camerajs();
		var cameraComponent = new CameraComponentjs(camera);
		var entity = new Entityjs(world);

		entity.setComponent(cameraComponent);
		expect(entity.setAsMainCamera).toBeDefined();
	});

	describe('.setAsMainCamera', function () {
		it('sets the main camera', function () {
			var camera = new Camerajs();
			var cameraComponent = new CameraComponentjs(camera);
			var entity = new Entityjs(world);

			entity.setComponent(cameraComponent);

			var listener = jasmine.createSpy('camera-listener');
			SystemBusjs.addListener('goo.setCurrentCamera', listener);
			entity.setAsMainCamera();
			expect(listener).toHaveBeenCalledWith(
				{
					camera: camera,
					entity: entity
				},
				'goo.setCurrentCamera',
				SystemBusjs
			);
		});

		it('returns the calling entity', function () {
			var cameraComponent = new CameraComponentjs(new Camerajs());
			var entity = new Entityjs(world);

			entity.setComponent(cameraComponent);
			expect(entity.setAsMainCamera()).toBe(entity);
		});
	});

	describe('copy', function () {
		it('can copy everything from another camera component', function () {
			var original = new CameraComponentjs(new Camerajs(50, 2, 2, 2000));
			var copy = new CameraComponentjs(new Camerajs(50, 2, 2, 2000));
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a camera component', function () {
			var original = new CameraComponentjs(new Camerajs(50, 2, 2, 2000));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
