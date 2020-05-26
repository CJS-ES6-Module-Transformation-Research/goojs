import {     TransformComponent as srcgooentitiescomponentsTransformComponent_TransformComponentjs, } from "../../../../src/goo/entities/components/TransformComponent";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('TransformComponentHandler', function () {
	var loader;

	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);

		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a transformComponent', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['transform']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.transformComponent).toEqual(jasmine.any(srcgooentitiescomponentsTransformComponent_TransformComponentjs));
			done();
		});
	});

	it('loads the correct transform', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['transform']);
		config.components.transform.translation = [1, 2, 3];
		config.components.transform.rotation = [4, 5, 6];
		config.components.transform.scale = [7, 8, 9];

		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			var t = entity.transformComponent.transform;
			var ct = config.components.transform;
			expect(t.translation).toBeCloseToVector(srcgoomathVector3_Vector3js.fromArray(ct.translation));
			expect(t.scale).toBeCloseToVector(srcgoomathVector3_Vector3js.fromArray(ct.scale));
			var rotation = t.rotation.toAngles();
			rotation.scale(180 / Math.PI);
			expect(rotation).toBeCloseToVector(testunitloadersConfigs_Configsjs.fromArray(ct.rotation));
			done();
		});
	});

	it('updates existing transformcomponent', function (done) {
		//var component;
		var config = testunitloadersConfigs_Configsjs.entity(['transform']);

		var newConfig = testunitloadersConfigs_Configsjs.entity(['transform']);
		newConfig.components.transform.translation = [1, 2, 3];
		newConfig.id = config.id;

		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (/*entity*/) {
			//component = entity.transformComponent;

			return loader.update(config.id, newConfig);
		}).then(function (entity) {
//				expect(entity.transformComponent).toEqual(component);

			var t = entity.transformComponent.transform;
			var ct = newConfig.components.transform;
			expect(t.translation).toBeCloseToVector(srcgoomathVector3_Vector3js.fromArray(ct.translation));
			expect(t.scale).toBeCloseToVector(srcgoomathVector3_Vector3js.fromArray(ct.scale));
			var rotation = t.rotation.toAngles();
			rotation.scale(180 / Math.PI);
			expect(rotation).toBeCloseToVector(srcgoomathVector3_Vector3js.fromArray(ct.rotation));
			done();
		});
	});

	function inScene(id) {
		if (loader._world.entityManager.getEntityById(id)) {
			return true;
		}
		var addedEntities = loader._world._addedEntities;
		for (var i = 0; i < addedEntities.length; i++) {
			var entity = addedEntities[i];
			if (entity.id === id) {
				return true;
			}
		}
		return false;
	}

	xit('adds hierarchy correctly outside of scene', function (done) {
		var parentConfig = testunitloadersConfigs_Configsjs.entity(['transform']);
		var childConfig = testunitloadersConfigs_Configsjs.entity(['transform']);
		testunitloadersConfigs_Configsjs.attachChild(parentConfig, childConfig);

		loader.preload(testunitloadersConfigs_Configsjs.get());

		loader.load(parentConfig.id).then(function (entity) {
			loader._world.process();
			expect(entity.transformComponent.children.length).toBeGreaterThan(0);

			var child = entity.transformComponent.children[0];
			expect(child).toEqual(jasmine.any(srcgooentitiescomponentsTransformComponent_TransformComponentjs));
			expect(child.entity.id).toBe(childConfig.id);
			expect(child.parent).toBe(entity.transformComponent);
			expect(inScene(parentConfig.id)).toBeFalsy();
			expect(inScene(childConfig.id)).toBeFalsy();
			done();
		});
	});

	it('adds hierarchy correctly inside of scene', function (done) {
		var sceneConfig = testunitloadersConfigs_Configsjs.scene();
		var childConfig = testunitloadersConfigs_Configsjs.entity();
		var parentId = Object.keys(sceneConfig.entities)[0];
		var parentConfig = testunitloadersConfigs_Configsjs.get()[parentId];

		testunitloadersConfigs_Configsjs.attachChild(parentConfig, childConfig);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(sceneConfig.id).then(function () {
			loader._world.process();
			expect(inScene(childConfig.id)).toBeTruthy();
			expect(inScene(parentConfig.id)).toBeTruthy();
			done();
		});
	});
});
