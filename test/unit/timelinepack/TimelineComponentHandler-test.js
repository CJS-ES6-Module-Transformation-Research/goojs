"use strict";

var _World = require("../../../src/goo/entities/World");

var _DynamicLoader = require("../../../src/goo/loaders/DynamicLoader");

var _TimelineComponent = require("../../../src/goo/timelinepack/TimelineComponent");

var _Configs = require("../../../test/unit/loaders/Configs");

require("../../../src/goo/timelinepack/TimelineComponentHandler");

describe('TimelineComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with a timeline component', function (done) {
		var config = _Configs.Configs.entity(['timeline']);
		loader.preload(_Configs.Configs.get());

		loader.load(config.id).then(function (entity) {
			expect(entity.timelineComponent).toEqual(jasmine.any(_TimelineComponent.TimelineComponent));

			//
			expect(entity.timelineComponent.channels.length).toEqual(2);
			expect(entity.timelineComponent.channels[0].keyframes.length).toEqual(3);
			expect(entity.timelineComponent.channels[1].keyframes.length).toEqual(2);

			done();
		});
	});
});
