"use strict";

var _Entity = require("../../../../src/goo/entities/Entity");

var _World = require("../../../../src/goo/entities/World");

var _SystemBus = require("../../../../src/goo/entities/SystemBus");

var _Camera = require("../../../../src/goo/renderer/Camera");

var _CameraComponent = require("../../../../src/goo/entities/components/CameraComponent");

var _CustomMatchers = require("../../../../test/unit/CustomMatchers");

describe('CameraComponent', function () {
	var world;

	beforeEach(function () {
		world = new _World.World();
		world.registerComponent(_CameraComponent.CameraComponent);
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
	});

	it('attaches .setAsMainCamera to the host entity', function () {
		var camera = new _Camera.Camera();
		var cameraComponent = new _CameraComponent.CameraComponent(camera);
		var entity = new _Entity.Entity(world);

		entity.setComponent(cameraComponent);
		expect(entity.setAsMainCamera).toBeDefined();
	});

	describe('.setAsMainCamera', function () {
		it('sets the main camera', function () {
			var camera = new _Camera.Camera();
			var cameraComponent = new _CameraComponent.CameraComponent(camera);
			var entity = new _Entity.Entity(world);

			entity.setComponent(cameraComponent);

			var listener = jasmine.createSpy('camera-listener');
			_SystemBus.SystemBusjs.addListener('goo.setCurrentCamera', listener);
			entity.setAsMainCamera();
			expect(listener).toHaveBeenCalledWith({
				camera: camera,
				entity: entity
			}, 'goo.setCurrentCamera', _SystemBus.SystemBusjs);
		});

		it('returns the calling entity', function () {
			var cameraComponent = new _CameraComponent.CameraComponent(new _Camera.Camera());
			var entity = new _Entity.Entity(world);

			entity.setComponent(cameraComponent);
			expect(entity.setAsMainCamera()).toBe(entity);
		});
	});

	describe('copy', function () {
		it('can copy everything from another camera component', function () {
			var original = new _CameraComponent.CameraComponent(new _Camera.Camera(50, 2, 2, 2000));
			var copy = new _CameraComponent.CameraComponent(new _Camera.Camera(50, 2, 2, 2000));
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a camera component', function () {
			var original = new _CameraComponent.CameraComponent(new _Camera.Camera(50, 2, 2, 2000));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});