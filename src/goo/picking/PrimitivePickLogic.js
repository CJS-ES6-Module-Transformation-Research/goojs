var PrimitivePickLogic_PrimitivePickLogic = PrimitivePickLogic;
import { BoundingTree as pickingBoundingTree_BoundingTreejs } from "../picking/BoundingTree";
import { Ray as mathRay_Rayjs } from "../math/Ray";
import { Matrix4 as mathMatrix4_Matrix4js } from "../math/Matrix4";
function PrimitivePickLogic() {
	this.invRay = new mathRay_Rayjs();
	this.invMatrix = new mathMatrix4_Matrix4js();
}

PrimitivePickLogic.prototype.getPickResult = function (pickRay, entity) {
	// look in pick tree for intersection
	var tree = entity.meshDataComponent.meshData.__boundingTree;
	if (!tree) {
		return null;
	}

	var worldTransform = entity.transformComponent.sync().worldTransform;
	this.invMatrix.copy(worldTransform.matrix).invert();
	this.invRay.origin.set(pickRay.origin).applyPostPoint(this.invMatrix);
	this.invRay.direction.set(pickRay.direction).applyPostVector(this.invMatrix);

	var result = tree.findPick(this.invRay, entity);

	var rebuildResult = {};
	if (result.length > 0) {
		result.sort(function (a, b) {
			return a.distance - b.distance;
		});
		rebuildResult.distances = [];
		rebuildResult.points = [];
		rebuildResult.vertices = [];
		result.forEach(function (value) {
			rebuildResult.distances.push(value.distance);
			rebuildResult.points.push(value.point);
			rebuildResult.vertices.push(value.vertices);
		});
	}
	return rebuildResult;
};

PrimitivePickLogic.prototype.added = function (entity) {
	// Build boundingtree if not existing
	if (!this.isConstructed(entity)) {
		this.rebuild(entity);
	}
};

PrimitivePickLogic.prototype.removed = function (entity) {
	// clear bounding tree
	if ( entity.meshDataComponent && entity.meshDataComponent.meshData) {
		entity.meshDataComponent.meshData.__boundingTree = null;
	}
};

PrimitivePickLogic.prototype.isConstructed = function (entity) {
	return !!entity.meshDataComponent.meshData.__boundingTree;
};

PrimitivePickLogic.prototype.rebuild = function (entity) {
	// build bounding tree
	entity.meshDataComponent.meshData.__boundingTree = new pickingBoundingTree_BoundingTreejs();

	// calculate bounding tree.
	entity.meshDataComponent.meshData.__boundingTree.construct(entity);
};

/**
 * Primitive pick logic
 */
export { PrimitivePickLogic_PrimitivePickLogic as PrimitivePickLogic };