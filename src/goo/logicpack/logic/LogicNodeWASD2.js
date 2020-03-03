Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeWASD2 = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeWASD2_downKeys;
var LogicNodeWASD2_editorName;
var LogicNodeWASD2_logicInterface;
function LogicNodeWASD2() {
	_LogicNode.LogicNode.call(this);
	LogicNodeWASD2_logicInterface = LogicNodeWASD2_logicInterface;;
	this.type = 'LogicNodeWASD2';

	var preventRepeat = {};
	this.eventListenerDown = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			return;
		}
		var keyEvent = LogicNodeWASD2_downKeys[character];
		if (keyEvent) {
			preventRepeat[character] = true;
			(0, _LogicLayer.writeValue)(this.logicInstance, keyEvent.port, keyEvent.value);
		}
	}.bind(this);
	this.eventListenerUp = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			preventRepeat[character] = false;
		}
		var keyEvent = LogicNodeWASD2_downKeys[character];
		if (keyEvent) {
			(0, _LogicLayer.writeValue)(this.logicInstance, keyEvent.port, 0);
		}
	}.bind(this);
}

LogicNodeWASD2.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeWASD2_editorName = "WASD2";;

LogicNodeWASD2.prototype.onSystemStarted = function () {
	document.addEventListener('keydown', this.eventListenerDown);
	document.addEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD2.prototype.onSystemStopped = function () {
	document.removeEventListener('keydown', this.eventListenerDown);
	document.removeEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD2_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeWASD2_downKeys = {
	"w": {
		port: LogicNodeWASD2_logicInterface.addOutputProperty("W", "float", 0),
		value: 1
	},

	"a": {
		port: LogicNodeWASD2_logicInterface.addOutputProperty("A", "float", 0),
		value: 1
	},

	"s": {
		port: LogicNodeWASD2_logicInterface.addOutputProperty("S", "float", 0),
		value: -1
	},

	"d": {
		port: LogicNodeWASD2_logicInterface.addOutputProperty("D", "float", 0),
		value: -1
	}
};;

(0, _LogicNodes.registerType)('LogicNodeWASD2', LogicNodeWASD2);

var exported_LogicNodeWASD2 = LogicNodeWASD2;

/**
 * Logic node handling WASD input.
 * @private
 */
exports.LogicNodeWASD2 = exported_LogicNodeWASD2;
