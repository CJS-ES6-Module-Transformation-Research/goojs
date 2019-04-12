Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeWASD2;

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
 * Logic node handling WASD input.
 * @private
 */
function LogicNodeWASD2() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeWASD2.logicInterface;
	this.type = 'LogicNodeWASD2';

	var preventRepeat = {};
	this.eventListenerDown = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			return;
		}
		var keyEvent = LogicNodeWASD2.downKeys[character];
		if (keyEvent) {
			preventRepeat[character] = true;
			_LogicLayer2.default.writeValue(this.logicInstance, keyEvent.port, keyEvent.value);
		}
	}.bind(this);
	this.eventListenerUp = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			preventRepeat[character] = false;
		}
		var keyEvent = LogicNodeWASD2.downKeys[character];
		if (keyEvent) {
			_LogicLayer2.default.writeValue(this.logicInstance, keyEvent.port, 0);
		}
	}.bind(this);
}

LogicNodeWASD2.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeWASD2.editorName = 'WASD2';

LogicNodeWASD2.prototype.onSystemStarted = function () {
	document.addEventListener('keydown', this.eventListenerDown);
	document.addEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD2.prototype.onSystemStopped = function () {
	document.removeEventListener('keydown', this.eventListenerDown);
	document.removeEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD2.logicInterface = new _LogicInterface2.default();
LogicNodeWASD2.downKeys = {
	'w': {
		port: LogicNodeWASD2.logicInterface.addOutputProperty('W', 'float', 0),
		value: 1
	},
	'a': {
		port: LogicNodeWASD2.logicInterface.addOutputProperty('A', 'float', 0),
		value: 1
	},
	's': {
		port: LogicNodeWASD2.logicInterface.addOutputProperty('S', 'float', 0),
		value: -1
	},
	'd': {
		port: LogicNodeWASD2.logicInterface.addOutputProperty('D', 'float', 0),
		value: -1
	}
};

_LogicNodes2.default.registerType('LogicNodeWASD2', LogicNodeWASD2);
module.exports = exports.default;
