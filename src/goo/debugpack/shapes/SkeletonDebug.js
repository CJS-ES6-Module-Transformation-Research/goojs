import { Box as Box_Boxjs } from "../../shapes/Box";
import { Transform as Transform_Transformjs } from "../../math/Transform";
import { Joint as Joint_Jointjs } from "../../animationpack/Joint";
import { MeshBuilder as MeshBuilder_MeshBuilderjs } from "../../util/MeshBuilder";
import { MeshData as MeshData_MeshDatajs } from "../../renderer/MeshData";

function SkeletonDebug() {}
var calcTrans = new Transform_Transformjs();

SkeletonDebug.prototype.getMesh = function (pose) {
	var joints = pose._skeleton._joints;
	return [
		this._buildLines(joints),
		this._buildBoxes(joints)
	];
};

SkeletonDebug.prototype._buildBoxes = function (joints) {
	var boxBuilder = new MeshBuilder_MeshBuilderjs();

	var box = new Box_Boxjs(2, 2, 2);
	box.attributeMap.WEIGHTS = MeshData_MeshDatajs.createAttribute(4, 'Float');
	box.attributeMap.JOINTIDS = MeshData_MeshDatajs.createAttribute(4, 'Float');
	box.rebuildData();
	box.rebuild();

	for (var i = 0; i < joints.length; i++) {
		calcTrans.matrix.copy(joints[i]._inverseBindPose.matrix)
			.invert();
		this._stuffBox(box, joints[i]);
		boxBuilder.addMeshData(box, calcTrans);
	}

	var meshes = boxBuilder.build();
	var boxes = meshes[0];
	this._buildPaletteMap(boxes, joints);
	return boxes;
};

SkeletonDebug.prototype._buildLines = function (joints) {
	var positions = [], weights = [], jointIds = [],
		indices = [], count = 0, td = calcTrans.matrix.data;

	for (var i = 0; i < joints.length; i++) {
		var joint = joints[i];
		if (joint._parentIndex !== Joint_Jointjs.NO_PARENT) {
			var parentJoint = joints[joint._parentIndex];
			weights.push(1, 0, 0, 0, 1, 0, 0, 0);
			jointIds.push(joint._index, 0, 0, 0, parentJoint._index, 0, 0, 0);
			indices.push(count * 2, count * 2 + 1);
			count++;

			calcTrans.matrix.copy(joint._inverseBindPose.matrix).invert();
			positions.push(td[12], td[13], td[14]);
			calcTrans.matrix.copy(parentJoint._inverseBindPose.matrix).invert();
			positions.push(td[12], td[13], td[14]);
		}
	}
	// Lines for bones
	var line = new MeshData_MeshDatajs(
		MeshData_MeshDatajs.defaultMap([
			MeshData_MeshDatajs.POSITION,
			MeshData_MeshDatajs.WEIGHTS,
			MeshData_MeshDatajs.JOINTIDS
		]), positions.length / 3, indices.length);
	line.indexModes = ['Lines'];
	line.getAttributeBuffer(MeshData_MeshDatajs.POSITION).set(positions);
	line.getAttributeBuffer(MeshData_MeshDatajs.WEIGHTS).set(weights);
	line.getAttributeBuffer(MeshData_MeshDatajs.JOINTIDS).set(jointIds);
	line.getIndexBuffer().set(indices);

	this._buildPaletteMap(line, joints);
	return line;
};

SkeletonDebug.prototype._stuffBox = function (box, joint) {
	var weights = box.getAttributeBuffer('WEIGHTS');
	var jointIds = box.getAttributeBuffer('JOINTIDS');
	for (var i = 0; i < weights.length; i += 4) {
		weights[i] = 1;
		jointIds[i] = joint._index;
	}
};

SkeletonDebug.prototype._buildPaletteMap = function (meshData, joints) {
	var paletteMap = [];
	for (var i = 0; i < joints.length; i++) {
		paletteMap[i] = joints[i]._index;
	}
	meshData.paletteMap = paletteMap;
	meshData.weightsPerVertex = 4;
};

var exported_SkeletonDebug = SkeletonDebug;
export { exported_SkeletonDebug as SkeletonDebug };