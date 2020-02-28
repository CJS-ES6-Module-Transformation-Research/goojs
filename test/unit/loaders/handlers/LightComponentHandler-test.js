import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { LightComponent as LightComponentjs } from "../../../../src/goo/entities/components/LightComponent";
import { PointLight as PointLightjs } from "../../../../src/goo/renderer/light/PointLight";
import { SpotLight as SpotLightjs } from "../../../../src/goo/renderer/light/SpotLight";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/LightComponentHandler";

describe('LightComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a lightComponent', function (done) {
		var config = Configs_Configsjs.entity(['light']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.lightComponent).toEqual(jasmine.any(LightComponentjs));
			done();
		});
	});

	it('manages to update between light types', function (done) {
		var component;
		var config = Configs_Configsjs.entity();
		var pointLight = Configs_Configsjs.component.light('PointLight');
		var spotLight = Configs_Configsjs.component.light('SpotLight');
		config.components.light = pointLight;
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			component = entity.lightComponent;
			expect(component.light).toEqual(jasmine.any(PointLightjs));

			config.components.light = spotLight;
			return loader.update(config.id, config);
		}).then(function (entity) {
			expect(entity.lightComponent).toBe(component);
			expect(entity.lightComponent.light).toEqual(jasmine.any(SpotLightjs));
			done();
		});
	});
});
