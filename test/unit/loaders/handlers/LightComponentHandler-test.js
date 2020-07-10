import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { LightComponent as srcgooentitiescomponentsLightComponent_LightComponentjs } from "../../../../src/goo/entities/components/LightComponent";
import { PointLight as srcgoorendererlightPointLight_PointLightjs } from "../../../../src/goo/renderer/light/PointLight";
import { SpotLight as srcgoorendererlightSpotLight_SpotLightjs } from "../../../../src/goo/renderer/light/SpotLight";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/LightComponentHandler";

describe('LightComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a lightComponent', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['light']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.lightComponent).toEqual(jasmine.any(srcgooentitiescomponentsLightComponent_LightComponentjs));
			done();
		});
	});

	it('manages to update between light types', function (done) {
		var component;
		var config = testunitloadersConfigs_Configsjs.entity();
		var pointLight = testunitloadersConfigs_Configsjs.component.light('PointLight');
		var spotLight = testunitloadersConfigs_Configsjs.component.light('SpotLight');
		config.components.light = pointLight;
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			component = entity.lightComponent;
			expect(component.light).toEqual(jasmine.any(srcgoorendererlightPointLight_PointLightjs));

			config.components.light = spotLight;
			return loader.update(config.id, config);
		}).then(function (entity) {
			expect(entity.lightComponent).toBe(component);
			expect(entity.lightComponent.light).toEqual(jasmine.any(srcgoorendererlightSpotLight_SpotLightjs));
			done();
		});
	});
});
