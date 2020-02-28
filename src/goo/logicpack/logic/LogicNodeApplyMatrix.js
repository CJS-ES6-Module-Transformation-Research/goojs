Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeApplyMatrix = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var _Matrix = require("../../math/Matrix3");

var LogicNodeApplyMatrix_inportY;
var LogicNodeApplyMatrix_inportX;
var LogicNodeApplyMatrix_outportProduct;
var LogicNodeApplyMatrix_editorName;
var LogicNodeApplyMatrix_logicInterface;
function LogicNodeApplyMatrix() {
	_LogicNode.LogicNode.call(this);
	LogicNodeApplyMatrix_logicInterface = LogicNodeApplyMatrix_logicInterface;;
	this.type = 'LogicNodeApplyMatrix';
	this.vec = new _Vector.Vector3();
}

LogicNodeApplyMatrix.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeApplyMatrix_editorName = "ApplyMatrix";;

LogicNodeApplyMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = (0, _LogicLayer.readPort)(instDesc, LogicNodeApplyMatrix_inportX);
	var mat = (0, _LogicLayer.readPort)(instDesc, LogicNodeApplyMatrix_inportY);
	this.vec.copy(vec);
	mat.applyPost(this.vec);
	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeApplyMatrix_outportProduct, this.vec);
};

LogicNodeApplyMatrix_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeApplyMatrix_outportProduct = LogicNodeApplyMatrix_logicInterface.addOutputProperty("product", "Vector3");;
LogicNodeApplyMatrix_inportX = LogicNodeApplyMatrix_logicInterface.addInputProperty("vec", "Vector3", new _Vector.Vector3());;
LogicNodeApplyMatrix_inportY = LogicNodeApplyMatrix_logicInterface.addInputProperty("mat", "Matrix3", new _Matrix.Matrix3());;

(0, _LogicNodes.registerType)('LogicNodeApplyMatrix', LogicNodeApplyMatrix);

var exported_LogicNodeApplyMatrix = LogicNodeApplyMatrix;

/**
 * Logic node for vector < matrix computation
 * @private
 */
exports.LogicNodeApplyMatrix = exported_LogicNodeApplyMatrix;
