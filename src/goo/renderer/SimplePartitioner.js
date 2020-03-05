"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SimplePartitioner = undefined;

var _Camera = require("../renderer/Camera");

function SimplePartitioner() {}

SimplePartitioner.prototype.added = function () {
	// needed for things like quadtrees etc
};

SimplePartitioner.prototype.removed = function () {
	// needed for things like quadtrees etc
};

SimplePartitioner.prototype.process = function (camera, entities, renderList) {
	var index = 0;
	for (var i = 0; i < entities.length; i++) {
		var entity = entities[i];

		if (entity.skip || entity.meshRendererComponent.hidden) {
			entity.isVisible = false;
			continue;
		}

		if (entity.meshRendererComponent.cullMode === 'Never') {
			renderList[index++] = entity;
			entity.isVisible = true;
		} else {
			var bounds = entity.meshRendererComponent.worldBound;
			var result = camera.contains(bounds);
			if (result !== _Camera.Camera.Outside) {
				renderList[index++] = entity;
				entity.isVisible = true;
			} else {
				entity.isVisible = false;
			}
		}
	}
	renderList.length = index;
};

var exported_SimplePartitioner = SimplePartitioner;

/**
 * Culls entities based on camera frustum and boundings
 */
exports.SimplePartitioner = exported_SimplePartitioner;
