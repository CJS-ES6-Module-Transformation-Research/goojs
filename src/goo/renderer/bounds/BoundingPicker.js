Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = BoundingPicker;

var _Ray = require('../../math/Ray');

var _Ray2 = _interopRequireDefault(_Ray);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * BoundingPicker
 */
function BoundingPicker() {}

var pickRay = new _Ray2.default();

BoundingPicker.pick = function (world, camera, x, y) {
	var entities = world.entityManager.getEntities();
	return BoundingPicker.pickFromList(world, entities, camera, x, y);
};

BoundingPicker.pickFromList = function (world, entities, camera, x, y) {
	var renderer = world.gooRunner.renderer;
	camera.getPickRay(x, y, renderer.domElement.offsetWidth, renderer.domElement.offsetHeight, pickRay);
	// var dpx = renderer.devicePixelRatio;
	// camera.getPickRay(x * dpx, y * dpx, renderer.domElement.offsetWidth, renderer.domElement.offsetHeight, pickRay);

	var pickList = [];
	for (var i = 0; i < entities.length; i++) {
		var entity = entities[i];
		var meshRendererComponent = entity.meshRendererComponent;

		if (!meshRendererComponent || !meshRendererComponent.isPickable) {
			continue;
		}

		var result = meshRendererComponent.worldBound.intersectsRayWhere(pickRay);
		if (result && result.distances.length) {
			pickList.push({
				'entity': entity,
				'intersection': result
			});
		}
	}

	pickList.sort(function (a, b) {
		return a.intersection.distances[0] - b.intersection.distances[0];
	});

	return pickList;
};
module.exports = exports.default;
