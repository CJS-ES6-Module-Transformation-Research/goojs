import { World as World_Worldjs } from "../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../src/goo/loaders/DynamicLoader";
import { TimelineComponent as TimelineComponentjs } from "../../../src/goo/timelinepack/TimelineComponent";
import { Configs as Configs_Configsjs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/timelinepack/TimelineComponentHandler";

describe('TimelineComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a timeline component', function (done) {
		var config = Configs_Configsjs.entity(['timeline']);
		loader.preload(Configs_Configsjs.get());

		loader.load(config.id).then(function (entity) {
			expect(entity.timelineComponent).toEqual(jasmine.any(TimelineComponentjs));

			//
			expect(entity.timelineComponent.channels.length).toEqual(2);
			expect(entity.timelineComponent.channels[0].keyframes.length).toEqual(3);
			expect(entity.timelineComponent.channels[1].keyframes.length).toEqual(2);

			done();
		});
	});
});
