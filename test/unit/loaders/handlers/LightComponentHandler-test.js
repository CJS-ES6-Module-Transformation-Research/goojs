var _World = require("../../../../src/goo/entities/World");

var _LightComponent = require("../../../../src/goo/entities/components/LightComponent");

var _PointLight = require("../../../../src/goo/renderer/light/PointLight");

var _SpotLight = require("../../../../src/goo/renderer/light/SpotLight");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

require("../../../../src/goo/loaders/handlers/LightComponentHandler");

var Configs = require('../../../../test/unit/loaders/Configs');

describe('LightComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a lightComponent', function (done) {
		var config = Configs.entity(['light']);
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.lightComponent).toEqual(jasmine.any(_LightComponent.LightComponent));
			done();
		});
	});

	it('manages to update between light types', function (done) {
		var component;
		var config = Configs.entity();
		var pointLight = Configs.component.light('PointLight');
		var spotLight = Configs.component.light('SpotLight');
		config.components.light = pointLight;
		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			component = entity.lightComponent;
			expect(component.light).toEqual(jasmine.any(_PointLight.PointLight));

			config.components.light = spotLight;
			return loader.update(config.id, config);
		}).then(function (entity) {
			expect(entity.lightComponent).toBe(component);
			expect(entity.lightComponent.light).toEqual(jasmine.any(_SpotLight.SpotLight));
			done();
		});
	});
});
