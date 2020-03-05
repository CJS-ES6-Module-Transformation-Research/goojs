import { TransformComponent as TransformComponent_TransformComponentjs } from "../../../../src/goo/entities/components/TransformComponent";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import { Vector3 as Vector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('TransformComponentHandler', function () {
	var loader;

	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);

		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a transformComponent', function (done) {
		var config = Configs_Configsjs.entity(['transform']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.transformComponent).toEqual(jasmine.any(TransformComponent_TransformComponentjs));
			done();
		});
	});

	it('loads the correct transform', function (done) {
		var config = Configs_Configsjs.entity(['transform']);
		config.components.transform.translation = [1, 2, 3];
		config.components.transform.rotation = [4, 5, 6];
		config.components.transform.scale = [7, 8, 9];

		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			var t = entity.transformComponent.transform;
			var ct = config.components.transform;
			expect(t.translation).toBeCloseToVector(Vector3_Vector3js.fromArray(ct.translation));
			expect(t.scale).toBeCloseToVector(Vector3_Vector3js.fromArray(ct.scale));
			var rotation = t.rotation.toAngles();
			rotation.scale(180 / Math.PI);
			expect(rotation).toBeCloseToVector(Vector3_Vector3js.fromArray(ct.rotation));
			done();
		});
	});

	it('updates existing transformcomponent', function (done) {
		//var component;
		var config = Configs_Configsjs.entity(['transform']);

		var newConfig = Configs_Configsjs.entity(['transform']);
		newConfig.components.transform.translation = [1, 2, 3];
		newConfig.id = config.id;

		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (/*entity*/) {
			//component = entity.transformComponent;

			return loader.update(config.id, newConfig);
		}).then(function (entity) {
//				expect(entity.transformComponent).toEqual(component);

			var t = entity.transformComponent.transform;
			var ct = newConfig.components.transform;
			expect(t.translation).toBeCloseToVector(Vector3_Vector3js.fromArray(ct.translation));
			expect(t.scale).toBeCloseToVector(Vector3_Vector3js.fromArray(ct.scale));
			var rotation = t.rotation.toAngles();
			rotation.scale(180 / Math.PI);
			expect(rotation).toBeCloseToVector(Vector3_Vector3js.fromArray(ct.rotation));
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
		var parentConfig = Configs_Configsjs.entity(['transform']);
		var childConfig = Configs_Configsjs.entity(['transform']);
		Configs_Configsjs.attachChild(parentConfig, childConfig);

		loader.preload(Configs_Configsjs.get());

		loader.load(parentConfig.id).then(function (entity) {
			loader._world.process();
			expect(entity.transformComponent.children.length).toBeGreaterThan(0);

			var child = entity.transformComponent.children[0];
			expect(child).toEqual(jasmine.any(TransformComponent_TransformComponentjs));
			expect(child.entity.id).toBe(childConfig.id);
			expect(child.parent).toBe(entity.transformComponent);
			expect(inScene(parentConfig.id)).toBeFalsy();
			expect(inScene(childConfig.id)).toBeFalsy();
			done();
		});
	});

	it('adds hierarchy correctly inside of scene', function (done) {
		var sceneConfig = Configs_Configsjs.scene();
		var childConfig = Configs_Configsjs.entity();
		var parentId = Object.keys(sceneConfig.entities)[0];
		var parentConfig = Configs_Configsjs.get()[parentId];

		Configs_Configsjs.attachChild(parentConfig, childConfig);
		loader.preload(Configs_Configsjs.get());
		loader.load(sceneConfig.id).then(function () {
			loader._world.process();
			expect(inScene(childConfig.id)).toBeTruthy();
			expect(inScene(parentConfig.id)).toBeTruthy();
			done();
		});
	});
});
