Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeMax = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeMax_inportY;
var LogicNodeMax_inportX;
var LogicNodeMax_outportSum;
var LogicNodeMax_editorName;
var LogicNodeMax_logicInterface;
function LogicNodeMax() {
	_LogicNode.LogicNode.call(this);
	LogicNodeMax_logicInterface = LogicNodeMax_logicInterface;;
	this.type = 'LogicNodeMax';
}

LogicNodeMax.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeMax_editorName = "Max";;

LogicNodeMax.prototype.onInputChanged = function (instDesc) {
	var val1 = (0, _LogicLayer.readPort)(instDesc, LogicNodeMax_inportX);
	var val2 = (0, _LogicLayer.readPort)(instDesc, LogicNodeMax_inportY);
	var out = Math.max(val1, val2);

	(0, _LogicLayer.writeValue)(instDesc, LogicNodeMax_outportSum, out);
};

LogicNodeMax_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeMax_outportSum = LogicNodeMax_logicInterface.addOutputProperty("max", "float");;
LogicNodeMax_inportX = LogicNodeMax_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeMax_inportY = LogicNodeMax_logicInterface.addInputProperty("y", "float", 0);;

(0, _LogicNodes.registerType)('LogicNodeMax', LogicNodeMax);

var exported_LogicNodeMax = LogicNodeMax;

/**
 * Logic node that computes the max of two inputs.
 * @private
 */
exports.LogicNodeMax = exported_LogicNodeMax;
