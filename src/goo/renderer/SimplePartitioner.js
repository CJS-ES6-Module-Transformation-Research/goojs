Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SimplePartitioner;

var _Camera = require("../renderer/Camera");

var _Camera2 = _interopRequireDefault(_Camera);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Culls entities based on camera frustum and boundings
 */
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
			if (result !== _Camera2.default.Outside) {
				renderList[index++] = entity;
				entity.isVisible = true;
			} else {
				entity.isVisible = false;
			}
		}
	}
	renderList.length = index;
};
module.exports = exports.default;
