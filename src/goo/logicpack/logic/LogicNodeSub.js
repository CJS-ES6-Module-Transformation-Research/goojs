Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeSub = undefined;

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

function LogicNodeSub() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeSub.logicInterface;
	this.type = 'LogicNodeSub';
}

LogicNodeSub.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeSub.editorName = 'Sub';

LogicNodeSub.prototype.onInputChanged = function (instDesc /*, portID, value */) {
	var out = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeSub.inportX) - _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeSub.inportY);

	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeSub.outportSum, out);
};

LogicNodeSub.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeSub.outportSum = LogicNodeSub.logicInterface.addOutputProperty('sum', 'float');
LogicNodeSub.inportX = LogicNodeSub.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeSub.inportY = LogicNodeSub.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes.registerType('LogicNodeSub', LogicNodeSub);

var exported_LogicNodeSub = LogicNodeSub;

/**
 * Logic node that subtracts inputs.
 * @private
 */
exports.LogicNodeSub = exported_LogicNodeSub;
