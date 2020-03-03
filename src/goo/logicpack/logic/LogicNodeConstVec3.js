Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeConstVec3 = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var LogicNodeConstVec3_outportVec;
var LogicNodeConstVec3_editorName;
var LogicNodeConstVec3_logicInterface;
function LogicNodeConstVec3() {
	_LogicNode.LogicNode.call(this);
	LogicNodeConstVec3_logicInterface = LogicNodeConstVec3_logicInterface;;
	this.type = 'LogicNodeConstVec3';
}

LogicNodeConstVec3.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeConstVec3_editorName = "ConstVec3";;

LogicNodeConstVec3.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeConstVec3_outportVec, new _Vector.Vector3(this.x, this.y, this.z));
	}
};

LogicNodeConstVec3.prototype.onSystemStarted = function () {
	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeConstVec3_outportVec, new _Vector.Vector3(this.x, this.y, this.z));
};

(0, _LogicNodes.registerType)('LogicNodeConstVec3', LogicNodeConstVec3);

LogicNodeConstVec3_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeConstVec3_outportVec = LogicNodeConstVec3_logicInterface.addOutputProperty("xyz", "Vector3");;

LogicNodeConstVec3.logicInterface.addConfigEntry({
	name: 'x',
	type: 'float',
	label: 'X'
});

LogicNodeConstVec3.logicInterface.addConfigEntry({
	name: 'y',
	type: 'float',
	label: 'Y'
});

LogicNodeConstVec3.logicInterface.addConfigEntry({
	name: 'z',
	type: 'float',
	label: 'Z'
});

var exported_LogicNodeConstVec3 = LogicNodeConstVec3;

/**
 * Logic node to provide a const Vec3
 * @private
 */
exports.LogicNodeConstVec3 = exported_LogicNodeConstVec3;
