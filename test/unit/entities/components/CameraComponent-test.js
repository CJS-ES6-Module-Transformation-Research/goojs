import { Entity as Entity_Entity } from "../../../../src/goo/entities/Entity";
import { World as World_World } from "../../../../src/goo/entities/World";
import { SystemBusjs as SystemBus } from "../../../../src/goo/entities/SystemBus";
import { Camera as Camera_Camera } from "../../../../src/goo/renderer/Camera";
import { CameraComponent as CameraComponent_CameraComponent } from "../../../../src/goo/entities/components/CameraComponent";
import { CustomMatchers as CustomMatchers_CustomMatchers } from "../../../../test/unit/CustomMatchers";

describe('CameraComponent', function () {
	var world;

	beforeEach(function () {
		world = new World_World();
		world.registerComponent(CameraComponent_CameraComponent);
		jasmine.addMatchers(CustomMatchers_CustomMatchers);
	});

	it('attaches .setAsMainCamera to the host entity', function () {
		var camera = new Camera_Camera();
		var cameraComponent = new CameraComponent_CameraComponent(camera);
		var entity = new Entity_Entity(world);

		entity.setComponent(cameraComponent);
		expect(entity.setAsMainCamera).toBeDefined();
	});

	describe('.setAsMainCamera', function () {
		it('sets the main camera', function () {
			var camera = new Camera_Camera();
			var cameraComponent = new CameraComponent_CameraComponent(camera);
			var entity = new Entity_Entity(world);

			entity.setComponent(cameraComponent);

			var listener = jasmine.createSpy('camera-listener');
			SystemBus.addListener('goo.setCurrentCamera', listener);
			entity.setAsMainCamera();
			expect(listener).toHaveBeenCalledWith(
				{
					camera: camera,
					entity: entity
				},
				'goo.setCurrentCamera',
				SystemBus
			);
		});

		it('returns the calling entity', function () {
			var cameraComponent = new CameraComponent_CameraComponent(new Camera_Camera());
			var entity = new Entity_Entity(world);

			entity.setComponent(cameraComponent);
			expect(entity.setAsMainCamera()).toBe(entity);
		});
	});

	describe('copy', function () {
		it('can copy everything from another camera component', function () {
			var original = new CameraComponent_CameraComponent(new Camera_Camera(50, 2, 2, 2000));
			var copy = new CameraComponent_CameraComponent(new Camera_Camera(50, 2, 2, 2000));
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a camera component', function () {
			var original = new CameraComponent_CameraComponent(new Camera_Camera(50, 2, 2, 2000));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
