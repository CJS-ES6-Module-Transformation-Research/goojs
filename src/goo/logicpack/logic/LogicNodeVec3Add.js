Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeVec3Add = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var LogicNodeVec3Add_inportY;
var LogicNodeVec3Add_inportX;
var LogicNodeVec3Add_outportSum;
var LogicNodeVec3Add_editorName;
var LogicNodeVec3Add_logicInterface;
function LogicNodeVec3Add() {
	_LogicNode.LogicNode.call(this);
	LogicNodeVec3Add_logicInterface = LogicNodeVec3Add_logicInterface;;
	this.type = 'LogicNodeVec3Add';
}

LogicNodeVec3Add.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeVec3Add_editorName = "AddVec3";;

LogicNodeVec3Add.prototype.onInputChanged = function (instDesc) {
	var vec1 = (0, _LogicLayer.readPort)(instDesc, LogicNodeVec3Add_inportX);
	var vec2 = (0, _LogicLayer.readPort)(instDesc, LogicNodeVec3Add_inportY);

	var vec = new _Vector.Vector3();
	vec.copy(vec1).add(vec2);

	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeVec3Add_outportSum, vec);
};

LogicNodeVec3Add_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeVec3Add_outportSum = LogicNodeVec3Add_logicInterface.addOutputProperty("sum", "Vector3");;
LogicNodeVec3Add_inportX = LogicNodeVec3Add_logicInterface.addInputProperty("vec1", "Vector3", new _Vector.Vector3());;
LogicNodeVec3Add_inportY = LogicNodeVec3Add_logicInterface.addInputProperty("vec2", "Vector3", new _Vector.Vector3());;

(0, _LogicNodes.registerType)('LogicNodeVec3Add', LogicNodeVec3Add);

var exported_LogicNodeVec3Add = LogicNodeVec3Add;

/**
 * Logic node that adds Vec3 inputs.
 * @private
 */
exports.LogicNodeVec3Add = exported_LogicNodeVec3Add;
