import { World as World_World } from "../../../src/goo/entities/World";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../src/goo/loaders/DynamicLoader";
import { TimelineComponent as TimelineComponent_TimelineComponent } from "../../../src/goo/timelinepack/TimelineComponent";
import { Configs as Configs_Configs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/timelinepack/TimelineComponentHandler";

describe('TimelineComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a timeline component', function (done) {
		var config = Configs_Configs.entity(['timeline']);
		loader.preload(Configs_Configs.get());

		loader.load(config.id).then(function (entity) {
			expect(entity.timelineComponent).toEqual(jasmine.any(TimelineComponent_TimelineComponent));

			//
			expect(entity.timelineComponent.channels.length).toEqual(2);
			expect(entity.timelineComponent.channels[0].keyframes.length).toEqual(3);
			expect(entity.timelineComponent.channels[1].keyframes.length).toEqual(2);

			done();
		});
	});
});
