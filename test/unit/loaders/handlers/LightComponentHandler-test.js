import { World as World_World } from "../../../../src/goo/entities/World";
import { LightComponent as LightComponent_LightComponent } from "../../../../src/goo/entities/components/LightComponent";
import { PointLight as PointLight_PointLight } from "../../../../src/goo/renderer/light/PointLight";
import { SpotLight as SpotLight_SpotLight } from "../../../../src/goo/renderer/light/SpotLight";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/LightComponentHandler";

describe('LightComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a lightComponent', function (done) {
		var config = Configs_Configs.entity(['light']);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.lightComponent).toEqual(jasmine.any(LightComponent_LightComponent));
			done();
		});
	});

	it('manages to update between light types', function (done) {
		var component;
		var config = Configs_Configs.entity();
		var pointLight = Configs_Configs.component.light('PointLight');
		var spotLight = Configs_Configs.component.light('SpotLight');
		config.components.light = pointLight;
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			component = entity.lightComponent;
			expect(component.light).toEqual(jasmine.any(PointLight_PointLight));

			config.components.light = spotLight;
			return loader.update(config.id, config);
		}).then(function (entity) {
			expect(entity.lightComponent).toBe(component);
			expect(entity.lightComponent.light).toEqual(jasmine.any(SpotLight_SpotLight));
			done();
		});
	});
});
