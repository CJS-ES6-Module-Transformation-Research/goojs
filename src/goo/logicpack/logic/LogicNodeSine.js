Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeSine = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeSine_inportPhase;
var LogicNodeSine_outportCos;
var LogicNodeSine_outportSin;
var LogicNodeSine_editorName;
var LogicNodeSine_logicInterface;
function LogicNodeSine() {
	_LogicNode.LogicNode.call(this);
	LogicNodeSine_logicInterface = LogicNodeSine_logicInterface;;
	this.type = 'LogicNodeSine';
	this._time = 0;
}

LogicNodeSine.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeSine_editorName = "Sine";;

LogicNodeSine.prototype.onInputChanged = function (instDesc, portID, value) {
	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeSine_outportSin, Math.sin(value));
	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeSine_outportCos, Math.cos(value));
};

LogicNodeSine_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeSine_outportSin = LogicNodeSine_logicInterface.addOutputProperty("Sine", "float");;
LogicNodeSine_outportCos = LogicNodeSine_logicInterface.addOutputProperty("Cosine", "float");;
LogicNodeSine_inportPhase = LogicNodeSine_logicInterface.addInputProperty("Phase", "float", 0);;

(0, _LogicNodes.registerType)('LogicNodeSine', LogicNodeSine);

var exported_LogicNodeSine = LogicNodeSine;

/**
 * Logic node that calculates sin & cos.
 * @private
 */
exports.LogicNodeSine = exported_LogicNodeSine;
