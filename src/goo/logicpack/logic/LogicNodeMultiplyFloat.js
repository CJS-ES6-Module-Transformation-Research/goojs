import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeMultiplyFloat_inportX;
var LogicNodeMultiplyFloat_outportProduct;
var LogicNodeMultiplyFloat_editorName;
var LogicNodeMultiplyFloat_logicInterface;
function LogicNodeMultiplyFloat() {
	LogicNodejs.call(this);
	LogicNodeMultiplyFloat_logicInterface = LogicNodeMultiplyFloat_logicInterface;;
	this.type = 'LogicNodeMultiplyFloat';
	this._x = this._y = 0; // REVIEW: unused?
}

LogicNodeMultiplyFloat.prototype = Object.create(LogicNodejs.prototype);
LogicNodeMultiplyFloat_editorName = "MultiplyFloat";;

LogicNodeMultiplyFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
	}
};

LogicNodeMultiplyFloat.prototype.onInputChanged = function (instDesc) {
	var x = LogicLayerjs.readPort(instDesc, LogicNodeMultiplyFloat_inportX);
	var y = this.value;
	LogicLayerjs.writeValue(instDesc, LogicNodeMultiplyFloat_outportProduct, x * y);
};

LogicNodeMultiplyFloat_logicInterface = new LogicInterfacejs();
LogicNodeMultiplyFloat_outportProduct = LogicNodeMultiplyFloat_logicInterface.addOutputProperty("product", "float");;
LogicNodeMultiplyFloat_inportX = LogicNodeMultiplyFloat_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeMultiplyFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

LogicNodesjs.registerType('LogicNodeMultiplyFloat', LogicNodeMultiplyFloat);

var exported_LogicNodeMultiplyFloat = LogicNodeMultiplyFloat;

/**
 * Logic node that multiplies two floats.
 * @private
 */
export { exported_LogicNodeMultiplyFloat as LogicNodeMultiplyFloat };