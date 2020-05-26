var srcgooentitiesWorld_WorldjsBinding = {};
import { Entity as srcgooentitiesEntity_Entityjs } from "../../../../src/goo/entities/Entity";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { SystemBusjs as srcgooentitiesSystemBus_SystemBusjsjs } from "../../../../src/goo/entities/SystemBus";
import { Camera as srcgoorendererCamera_Camerajs } from "../../../../src/goo/renderer/Camera";
import {     CameraComponent as srcgooentitiescomponentsCameraComponent_CameraComponentjs, } from "../../../../src/goo/entities/components/CameraComponent";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('CameraComponent', function () {
	var world;

	beforeEach(function () {
		srcgooentitiesWorld_Worldjs = new srcgooentitiesWorld_Worldjs();
		world.registerComponent(srcgooentitiescomponentsCameraComponent_CameraComponentjs);
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
	});

	it('attaches .setAsMainCamera to the host entity', function () {
		var camera = new srcgoorendererCamera_Camerajs();
		var cameraComponent = new srcgooentitiescomponentsCameraComponent_CameraComponentjs(camera);
		var entity = new srcgooentitiesEntity_Entityjs(world);

		entity.setComponent(cameraComponent);
		expect(entity.setAsMainCamera).toBeDefined();
	});

	describe('.setAsMainCamera', function () {
		it('sets the main camera', function () {
			var camera = new srcgoorendererCamera_Camerajs();
			var cameraComponent = new srcgooentitiescomponentsCameraComponent_CameraComponentjs(camera);
			var entity = new srcgooentitiesEntity_Entityjs(world);

			entity.setComponent(cameraComponent);

			var listener = jasmine.createSpy('camera-listener');
			srcgooentitiesSystemBus_SystemBusjsjs.addListener('goo.setCurrentCamera', listener);
			entity.setAsMainCamera();
			expect(listener).toHaveBeenCalledWith(
				{
					camera: camera,
					entity: entity
				},
				'goo.setCurrentCamera',
				srcgooentitiesSystemBus_SystemBusjsjs
			);
		});

		it('returns the calling entity', function () {
			var cameraComponent = new srcgooentitiescomponentsCameraComponent_CameraComponentjs(new srcgoorendererCamera_Camerajs());
			var entity = new srcgooentitiesEntity_Entityjs(world);

			entity.setComponent(cameraComponent);
			expect(entity.setAsMainCamera()).toBe(entity);
		});
	});

	describe('copy', function () {
		it('can copy everything from another camera component', function () {
			var original = new srcgooentitiescomponentsCameraComponent_CameraComponentjs(new srcgoorendererCamera_Camerajs(50, 2, 2, 2000));
			var copy = new srcgooentitiescomponentsCameraComponent_CameraComponentjs(new srcgoorendererCamera_Camerajs(50, 2, 2, 2000));
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a camera component', function () {
			var original = new srcgooentitiescomponentsCameraComponent_CameraComponentjs(new srcgoorendererCamera_Camerajs(50, 2, 2, 2000));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
