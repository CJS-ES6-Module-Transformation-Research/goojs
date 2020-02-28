Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeAdd = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeAdd_inportY;
var LogicNodeAdd_inportX;
var LogicNodeAdd_outportSum;
var LogicNodeAdd_editorName;
var LogicNodeAdd_logicInterface;
function LogicNodeAdd() {
	_LogicNode.LogicNode.call(this);
	LogicNodeAdd_logicInterface = LogicNodeAdd_logicInterface;;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeAdd_editorName = "Add";;

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = (0, _LogicLayer.readPort)(instDesc, LogicNodeAdd_inportX) + (0, _LogicLayer.readPort)(instDesc, LogicNodeAdd_inportY);

	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeAdd_outportSum, out);
};

LogicNodeAdd_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeAdd_outportSum = LogicNodeAdd_logicInterface.addOutputProperty("sum", "float");;
LogicNodeAdd_inportX = LogicNodeAdd_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeAdd_inportY = LogicNodeAdd_logicInterface.addInputProperty("y", "float", 0);;

(0, _LogicNodes.registerType)('LogicNodeAdd', LogicNodeAdd);

var exported_LogicNodeAdd = LogicNodeAdd;

/**
 * Logic node to add values.
 * @private
 */
exports.LogicNodeAdd = exported_LogicNodeAdd;
