Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeWASD;

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
function LogicNodeWASD() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeWASD.logicInterface;
	this.type = 'LogicNodeWASD';

	var preventRepeat = {};
	this.eventListenerDown = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			return;
		}
		var keyEvent = LogicNodeWASD.downKeys[character];
		if (keyEvent) {
			preventRepeat[character] = true;
			_LogicLayer2.default.fireEvent(this.logicInstance, keyEvent);
		}
	}.bind(this);
	this.eventListenerUp = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			preventRepeat[character] = false;
		}
		var keyEvent = LogicNodeWASD.upKeys[character];
		if (keyEvent) {
			_LogicLayer2.default.fireEvent(this.logicInstance, keyEvent);
		}
	}.bind(this);
}

LogicNodeWASD.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeWASD.editorName = 'WASD';

LogicNodeWASD.prototype.onSystemStarted = function () {
	document.addEventListener('keydown', this.eventListenerDown);
	document.addEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD.prototype.onSystemStopped = function () {
	document.removeEventListener('keydown', this.eventListenerDown);
	document.removeEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD.logicInterface = new _LogicInterface2.default();
LogicNodeWASD.downKeys = {
	'w': LogicNodeWASD.logicInterface.addOutputEvent('W-down'),
	'a': LogicNodeWASD.logicInterface.addOutputEvent('A-down'),
	's': LogicNodeWASD.logicInterface.addOutputEvent('S-down'),
	'd': LogicNodeWASD.logicInterface.addOutputEvent('D-down')
};
LogicNodeWASD.upKeys = {
	'w': LogicNodeWASD.logicInterface.addOutputEvent('W-up'),
	'a': LogicNodeWASD.logicInterface.addOutputEvent('A-up'),
	's': LogicNodeWASD.logicInterface.addOutputEvent('S-up'),
	'd': LogicNodeWASD.logicInterface.addOutputEvent('D-up')
};

_LogicNodes2.default.registerType('LogicNodeWASD', LogicNodeWASD);
module.exports = exports.default;
