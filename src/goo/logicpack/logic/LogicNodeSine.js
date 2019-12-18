Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeSine = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var LogicNodes = _interopRequireWildcard(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

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

var exported_LogicNodeSine = LogicNodeSine;
function LogicNodeSine() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeSine.logicInterface;
	this.type = 'LogicNodeSine';
	this._time = 0;
}

LogicNodeSine.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeSine.editorName = 'Sine';

LogicNodeSine.prototype.onInputChanged = function (instDesc, portID, value) {
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeSine.outportSin, Math.sin(value));
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeSine.outportCos, Math.cos(value));
};

LogicNodeSine.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeSine.outportSin = LogicNodeSine.logicInterface.addOutputProperty('Sine', 'float');
LogicNodeSine.outportCos = LogicNodeSine.logicInterface.addOutputProperty('Cosine', 'float');
LogicNodeSine.inportPhase = LogicNodeSine.logicInterface.addInputProperty('Phase', 'float', 0);

LogicNodes.registerType('LogicNodeSine', LogicNodeSine);

/**
 * Logic node that calculates sin & cos.
 * @private
 */
exports.LogicNodeSine = exported_LogicNodeSine;
