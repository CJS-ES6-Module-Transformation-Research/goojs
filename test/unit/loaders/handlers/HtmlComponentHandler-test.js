import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { HtmlComponent as HtmlComponent_HtmlComponentjs } from "../../../../src/goo/entities/components/HtmlComponent";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/loaders/handlers/HtmlComponentHandler";

describe('HtmlComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		world.gooRunner = {
			renderer: {
				domElement: document.createElement('div')
			}
		};

		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with an htmlComponent', function (done) {
		var config = Configs_Configsjs.entity(['html']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.htmlComponent).toEqual(jasmine.any(HtmlComponent_HtmlComponentjs));
			expect(entity.htmlComponent.useTransformComponent).toBeTruthy();
			expect(/[^\-\w]/.test(entity.htmlComponent.domElement.id)).toBeFalsy();
			expect(document.getElementById(entity.htmlComponent.domElement.id)).not.toBeNull();
			done();
		}, function () {
			expect('').toEqual('Should never get here');
			done();
		});
	});

	it('removes an html entity', function (done) {
		var config = Configs_Configsjs.entity(['html']);
		loader.preload(Configs_Configsjs.get());

		var entity, htmlComponent;
		loader.load(config.id).then(function (_entity) {
			entity = _entity;
			htmlComponent = entity.htmlComponent;
			return loader.remove(config.id);
		}).then(function () {
			expect(entity.htmlComponent).toBeUndefined();
			expect(document.getElementById(htmlComponent.domElement.id)).toBeNull();
			done();
		}, function () {
			expect('').toEqual('Should never get here');
			done();
		});
	});
});
