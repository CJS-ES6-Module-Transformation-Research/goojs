Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeConstVec3 = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var LogicNodes = _interopRequireWildcard(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var exported_LogicNodeConstVec3 = LogicNodeConstVec3;
function LogicNodeConstVec3() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeConstVec3.logicInterface;
	this.type = 'LogicNodeConstVec3';
}

LogicNodeConstVec3.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeConstVec3.editorName = 'ConstVec3';

LogicNodeConstVec3.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeConstVec3.outportVec, new _Vector.Vector3(this.x, this.y, this.z));
	}
};

LogicNodeConstVec3.prototype.onSystemStarted = function () {
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeConstVec3.outportVec, new _Vector.Vector3(this.x, this.y, this.z));
};

LogicNodes.registerType('LogicNodeConstVec3', LogicNodeConstVec3);

LogicNodeConstVec3.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeConstVec3.outportVec = LogicNodeConstVec3.logicInterface.addOutputProperty('xyz', 'Vector3');

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

/**
 * Logic node to provide a const Vec3
 * @private
 */
exports.LogicNodeConstVec3 = exported_LogicNodeConstVec3;
