Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeMouse;

var _LogicLayer = require("./LogicLayer");

var _LogicLayer2 = _interopRequireDefault(_LogicLayer);

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
 * Logic node that reads mouse input.
 * @private
 */
function LogicNodeMouse() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeMouse.logicInterface;
	this.type = 'LogicNodeMouse';

	this.eventMouseMove = function (event) {
		var mx = event.clientX;
		var my = event.clientY;
		var dx = mx - this.x;
		var dy = my - this.y;
		_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeMouse.portX, mx);
		_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeMouse.portY, my);
		_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeMouse.portDX, dx);
		_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeMouse.portDY, dy);
	}.bind(this);

	this.eventMouseDown = function (event) {
		if (event.button === 0) {
			_LogicLayer2.default.fireEvent(this.logicInstance, LogicNodeMouse.outEventLmb);
		}
		if (event.button === 2) {
			_LogicLayer2.default.fireEvent(this.logicInstance, LogicNodeMouse.outEventRmb);
		}
	}.bind(this);
}

LogicNodeMouse.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeMouse.editorName = 'Mouse';

LogicNodeMouse.prototype.onSystemStarted = function () {
	this.x = 0;
	this.y = 0;
	document.addEventListener('mousemove', this.eventMouseMove, false);
	document.addEventListener('mousedown', this.eventMouseDown, false);
};

LogicNodeMouse.prototype.onSystemStopped = function () {
	document.removeEventListener('mousemove', this.eventMouseMove);
	document.removeEventListener('mousedown', this.eventMouseDown);
};

LogicNodeMouse.logicInterface = new _LogicInterface2.default();
LogicNodeMouse.portX = LogicNodeMouse.logicInterface.addOutputProperty('x', 'float', 0);
LogicNodeMouse.portY = LogicNodeMouse.logicInterface.addOutputProperty('y', 'float', 0);
LogicNodeMouse.portDX = LogicNodeMouse.logicInterface.addOutputProperty('dx', 'float', 0);
LogicNodeMouse.portDY = LogicNodeMouse.logicInterface.addOutputProperty('dy', 'float', 0);
LogicNodeMouse.outEventLmb = LogicNodeMouse.logicInterface.addOutputEvent('lmb');
LogicNodeMouse.outEventRmb = LogicNodeMouse.logicInterface.addOutputEvent('rmb');

_LogicNodes2.default.registerType('LogicNodeMouse', LogicNodeMouse);
module.exports = exports.default;
