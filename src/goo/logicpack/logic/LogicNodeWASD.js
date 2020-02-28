Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeWASD = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeWASD_upKeys;
var LogicNodeWASD_downKeys;
var LogicNodeWASD_editorName;
var LogicNodeWASD_logicInterface;
function LogicNodeWASD() {
	_LogicNode.LogicNode.call(this);
	LogicNodeWASD_logicInterface = LogicNodeWASD_logicInterface;;
	this.type = 'LogicNodeWASD';

	var preventRepeat = {};
	this.eventListenerDown = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			return;
		}
		var keyEvent = LogicNodeWASD_downKeys[character];
		if (keyEvent) {
			preventRepeat[character] = true;
			(0, _LogicLayer.fireEvent)(this.logicInstance, keyEvent);
		}
	}.bind(this);
	this.eventListenerUp = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			preventRepeat[character] = false;
		}
		var keyEvent = LogicNodeWASD_upKeys[character];
		if (keyEvent) {
			(0, _LogicLayer.fireEvent)(this.logicInstance, keyEvent);
		}
	}.bind(this);
}

LogicNodeWASD.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeWASD_editorName = "WASD";;

LogicNodeWASD.prototype.onSystemStarted = function () {
	document.addEventListener('keydown', this.eventListenerDown);
	document.addEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD.prototype.onSystemStopped = function () {
	document.removeEventListener('keydown', this.eventListenerDown);
	document.removeEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeWASD_downKeys = {
	"w": LogicNodeWASD_logicInterface.addOutputEvent("W-down"),
	"a": LogicNodeWASD_logicInterface.addOutputEvent("A-down"),
	"s": LogicNodeWASD_logicInterface.addOutputEvent("S-down"),
	"d": LogicNodeWASD_logicInterface.addOutputEvent("D-down")
};;
LogicNodeWASD_upKeys = {
	"w": LogicNodeWASD_logicInterface.addOutputEvent("W-up"),
	"a": LogicNodeWASD_logicInterface.addOutputEvent("A-up"),
	"s": LogicNodeWASD_logicInterface.addOutputEvent("S-up"),
	"d": LogicNodeWASD_logicInterface.addOutputEvent("D-up")
};;

(0, _LogicNodes.registerType)('LogicNodeWASD', LogicNodeWASD);

var exported_LogicNodeWASD = LogicNodeWASD;

/**
 * Logic node handling WASD input.
 * @private
 */
exports.LogicNodeWASD = exported_LogicNodeWASD;
