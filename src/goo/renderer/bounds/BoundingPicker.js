Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoundingPicker = exports.pick = undefined;

var _Ray = require("../../math/Ray");

var BoundingPicker_pickFromList;
var BoundingPicker_pick;

/**
 * BoundingPicker
 */
function BoundingPicker() {}

var pickRay = new _Ray.Ray();

exports.pick = BoundingPicker_pick = function BoundingPicker_pick(world, camera, x, y) {
    var entities = world.entityManager.getEntities();
    return BoundingPicker_pickFromList(world, entities, camera, x, y);
};;

BoundingPicker_pickFromList = function BoundingPicker_pickFromList(world, entities, camera, x, y) {
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
                "entity": entity,
                "intersection": result
            });
        }
    }

    pickList.sort(function (a, b) {
        return a.intersection.distances[0] - b.intersection.distances[0];
    });

    return pickList;
};;

exports.pick = BoundingPicker_pick;
exports.BoundingPicker = BoundingPicker;
