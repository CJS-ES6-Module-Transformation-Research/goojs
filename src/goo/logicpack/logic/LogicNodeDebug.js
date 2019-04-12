Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeDebug;

var _LogicNode = require("./LogicNode");

var _LogicNode2 = _interopRequireDefault(_LogicNode);

var _LogicNodes = require("./LogicNodes");

var _LogicNodes2 = _interopRequireDefault(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

var _LogicInterface2 = _interopRequireDefault(_LogicInterface);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Logic node that writes output to the console.
 * @private
 */
function LogicNodeDebug() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeDebug.logicInterface;
	this.type = 'LogicNodeDebug';
	this._time = 0;
}

LogicNodeDebug.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeDebug.editorName = 'Debug';

LogicNodeDebug.prototype.onInputChanged = function (instDesc, portID, value) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') value port ' + portID + ' = [' + value + ']');
};

LogicNodeDebug.prototype.onEvent = function (instDesc, portID) {
	console.log('LogicNodeDebug (' + this.logicInstance.name + ') event on port ' + portID);
};

LogicNodeDebug.logicInterface = new _LogicInterface2.default();
LogicNodeDebug.inportEvent = LogicNodeDebug.logicInterface.addInputEvent('Event');
LogicNodeDebug.inportFloat = LogicNodeDebug.logicInterface.addInputProperty('FloatValue', 'float', 0);

_LogicNodes2.default.registerType('LogicNodeDebug', LogicNodeDebug);
module.exports = exports.default;
