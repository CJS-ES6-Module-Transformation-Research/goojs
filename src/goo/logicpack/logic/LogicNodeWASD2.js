import { writeValue as LogicLayerjs_writeValue } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeWASD2_downKeys;
var LogicNodeWASD2_editorName;
var LogicNodeWASD2_logicInterface;
function LogicNodeWASD2() {
	LogicNode_LogicNodejs.call(this);
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
			LogicLayerjs_writeValue(this.logicInstance, keyEvent.port, keyEvent.value);
		}
	}.bind(this);
	this.eventListenerUp = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			preventRepeat[character] = false;
		}
		var keyEvent = LogicNodeWASD2_downKeys[character];
		if (keyEvent) {
			LogicLayerjs_writeValue(this.logicInstance, keyEvent.port, 0);
		}
	}.bind(this);
}

LogicNodeWASD2.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeWASD2_editorName = "WASD2";;

LogicNodeWASD2.prototype.onSystemStarted = function () {
	document.addEventListener('keydown', this.eventListenerDown);
	document.addEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD2.prototype.onSystemStopped = function () {
	document.removeEventListener('keydown', this.eventListenerDown);
	document.removeEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD2_logicInterface = new LogicInterface_LogicInterfacejs();
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

LogicNodesjs_registerType('LogicNodeWASD2', LogicNodeWASD2);

var exported_LogicNodeWASD2 = LogicNodeWASD2;

/**
 * Logic node handling WASD input.
 * @private
 */
export { exported_LogicNodeWASD2 as LogicNodeWASD2 };