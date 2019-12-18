Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeAdd = undefined;

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

function LogicNodeAdd() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeAdd.logicInterface;
	this.type = 'LogicNodeAdd';
}

LogicNodeAdd.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeAdd.editorName = 'Add';

LogicNodeAdd.prototype.onInputChanged = function (instDesc) {
	var out = _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeAdd.inportX) + _LogicLayer.LogicLayer.readPort(instDesc, LogicNodeAdd.inportY);

	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeAdd.outportSum, out);
};

LogicNodeAdd.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeAdd.outportSum = LogicNodeAdd.logicInterface.addOutputProperty('sum', 'float');
LogicNodeAdd.inportX = LogicNodeAdd.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeAdd.inportY = LogicNodeAdd.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes.registerType('LogicNodeAdd', LogicNodeAdd);

var exported_LogicNodeAdd = LogicNodeAdd;

/**
 * Logic node to add values.
 * @private
 */
exports.LogicNodeAdd = exported_LogicNodeAdd;
