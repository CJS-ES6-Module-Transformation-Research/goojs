import { World as srcgooentitiesWorld_Worldjs } from "../../../src/goo/entities/World";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../src/goo/loaders/DynamicLoader";
import {     TimelineComponent as srcgootimelinepackTimelineComponent_TimelineComponentjs, } from "../../../src/goo/timelinepack/TimelineComponent";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/timelinepack/TimelineComponentHandler";

describe('TimelineComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a timeline component', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['timeline']);
		loader.preload(testunitloadersConfigs_Configsjs.get());

		loader.load(config.id).then(function (entity) {
			expect(entity.timelineComponent).toEqual(jasmine.any(srcgootimelinepackTimelineComponent_TimelineComponentjs));

			//
			expect(entity.timelineComponent.channels.length).toEqual(2);
			expect(entity.timelineComponent.channels[0].keyframes.length).toEqual(3);
			expect(entity.timelineComponent.channels[1].keyframes.length).toEqual(2);

			done();
		});
	});
});
