Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeMultiplyFloat = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeMultiplyFloat_inportX;
var LogicNodeMultiplyFloat_outportProduct;
var LogicNodeMultiplyFloat_editorName;
var LogicNodeMultiplyFloat_logicInterface;
function LogicNodeMultiplyFloat() {
	_LogicNode.LogicNode.call(this);
	LogicNodeMultiplyFloat_logicInterface = LogicNodeMultiplyFloat_logicInterface;;
	this.type = 'LogicNodeMultiplyFloat';
	this._x = this._y = 0; // REVIEW: unused?
}

LogicNodeMultiplyFloat.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeMultiplyFloat_editorName = "MultiplyFloat";;

LogicNodeMultiplyFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
	}
};

LogicNodeMultiplyFloat.prototype.onInputChanged = function (instDesc) {
	var x = (0, _LogicLayer.readPort)(instDesc, LogicNodeMultiplyFloat_inportX);
	var y = this.value;
	(0, _LogicLayer.writeValue)(instDesc, LogicNodeMultiplyFloat_outportProduct, x * y);
};

LogicNodeMultiplyFloat_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeMultiplyFloat_outportProduct = LogicNodeMultiplyFloat_logicInterface.addOutputProperty("product", "float");;
LogicNodeMultiplyFloat_inportX = LogicNodeMultiplyFloat_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeMultiplyFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

(0, _LogicNodes.registerType)('LogicNodeMultiplyFloat', LogicNodeMultiplyFloat);

var exported_LogicNodeMultiplyFloat = LogicNodeMultiplyFloat;

/**
 * Logic node that multiplies two floats.
 * @private
 */
exports.LogicNodeMultiplyFloat = exported_LogicNodeMultiplyFloat;
