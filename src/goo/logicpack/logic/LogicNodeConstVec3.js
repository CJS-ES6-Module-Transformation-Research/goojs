Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeConstVec3;

var _LogicLayer = require("./LogicLayer");

var _LogicLayer2 = _interopRequireDefault(_LogicLayer);

var _LogicNode = require("./LogicNode");

var _LogicNode2 = _interopRequireDefault(_LogicNode);

var _LogicNodes = require("./LogicNodes");

var _LogicNodes2 = _interopRequireDefault(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

var _LogicInterface2 = _interopRequireDefault(_LogicInterface);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Logic node to provide a const Vec3
 * @private
 */
function LogicNodeConstVec3() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeConstVec3.logicInterface;
	this.type = 'LogicNodeConstVec3';
}

LogicNodeConstVec3.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeConstVec3.editorName = 'ConstVec3';

LogicNodeConstVec3.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeConstVec3.outportVec, new _Vector2.default(this.x, this.y, this.z));
	}
};

LogicNodeConstVec3.prototype.onSystemStarted = function () {
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeConstVec3.outportVec, new _Vector2.default(this.x, this.y, this.z));
};

_LogicNodes2.default.registerType('LogicNodeConstVec3', LogicNodeConstVec3);

LogicNodeConstVec3.logicInterface = new _LogicInterface2.default();
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
module.exports = exports.default;
