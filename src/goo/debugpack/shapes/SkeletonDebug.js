Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SkeletonDebug;

var _Box = require("../../shapes/Box");

var _Box2 = _interopRequireDefault(_Box);

var _Transform = require("../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _Joint = require("../../animationpack/Joint");

var _Joint2 = _interopRequireDefault(_Joint);

var _MeshBuilder = require("../../util/MeshBuilder");

var _MeshBuilder2 = _interopRequireDefault(_MeshBuilder);

var _MeshData = require("../../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SkeletonDebug() {}
var calcTrans = new _Transform2.default();

SkeletonDebug.prototype.getMesh = function (pose) {
	var joints = pose._skeleton._joints;
	return [this._buildLines(joints), this._buildBoxes(joints)];
};

SkeletonDebug.prototype._buildBoxes = function (joints) {
	var boxBuilder = new _MeshBuilder2.default();

	var box = new _Box2.default(2, 2, 2);
	box.attributeMap.WEIGHTS = _MeshData2.default.createAttribute(4, 'Float');
	box.attributeMap.JOINTIDS = _MeshData2.default.createAttribute(4, 'Float');
	box.rebuildData();
	box.rebuild();

	for (var i = 0; i < joints.length; i++) {
		calcTrans.matrix.copy(joints[i]._inverseBindPose.matrix).invert();
		this._stuffBox(box, joints[i]);
		boxBuilder.addMeshData(box, calcTrans);
	}

	var meshes = boxBuilder.build();
	var boxes = meshes[0];
	this._buildPaletteMap(boxes, joints);
	return boxes;
};

SkeletonDebug.prototype._buildLines = function (joints) {
	var positions = [],
	    weights = [],
	    jointIds = [],
	    indices = [],
	    count = 0,
	    td = calcTrans.matrix.data;

	for (var i = 0; i < joints.length; i++) {
		var joint = joints[i];
		if (joint._parentIndex !== _Joint2.default.NO_PARENT) {
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
	var line = new _MeshData2.default(_MeshData2.default.defaultMap([_MeshData2.default.POSITION, _MeshData2.default.WEIGHTS, _MeshData2.default.JOINTIDS]), positions.length / 3, indices.length);
	line.indexModes = ['Lines'];
	line.getAttributeBuffer(_MeshData2.default.POSITION).set(positions);
	line.getAttributeBuffer(_MeshData2.default.WEIGHTS).set(weights);
	line.getAttributeBuffer(_MeshData2.default.JOINTIDS).set(jointIds);
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
module.exports = exports.default;
