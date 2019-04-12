Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LayerLerpBlender;

var _BinaryLerpSource = require("../../animationpack/blendtree/BinaryLerpSource");

var _BinaryLerpSource2 = _interopRequireDefault(_BinaryLerpSource);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * A layer blender that uses linear interpolation to merge the results of two layers.
 */
function LayerLerpBlender() {
	this._blendWeight = null;
	this._layerA = null;
	this._layerB = null;
}

/**
 * @returns a key-value map representing the blended data from both animation layers.
 */
LayerLerpBlender.prototype.getBlendedSourceData = function () {
	// grab our data maps from the two layers...
	// set A
	var sourceAData = this._layerA.getCurrentSourceData();
	// set B
	var sourceBData = this._layerB._currentState ? this._layerB._currentState.getCurrentSourceData() : null;

	return _BinaryLerpSource2.default.combineSourceData(sourceAData, sourceBData, this._blendWeight);
};
module.exports = exports.default;
