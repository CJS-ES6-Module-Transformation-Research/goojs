import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeWASD2() {
	LogicNode_LogicNodejs.call(this);
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
			LogicLayer_LogicLayerjs.writeValue(this.logicInstance, keyEvent.port, keyEvent.value);
		}
	}.bind(this);
	this.eventListenerUp = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			preventRepeat[character] = false;
		}
		var keyEvent = LogicNodeWASD2.downKeys[character];
		if (keyEvent) {
			LogicLayer_LogicLayerjs.writeValue(this.logicInstance, keyEvent.port, 0);
		}
	}.bind(this);
}

LogicNodeWASD2.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeWASD2.editorName = 'WASD2';

LogicNodeWASD2.prototype.onSystemStarted = function () {
	document.addEventListener('keydown', this.eventListenerDown);
	document.addEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD2.prototype.onSystemStopped = function () {
	document.removeEventListener('keydown', this.eventListenerDown);
	document.removeEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD2.logicInterface = new LogicInterface_LogicInterfacejs();
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

LogicNodes_LogicNodesjs.registerType('LogicNodeWASD2', LogicNodeWASD2);

var exported_LogicNodeWASD2 = LogicNodeWASD2;

/**
 * Logic node handling WASD input.
 * @private
 */
export { exported_LogicNodeWASD2 as LogicNodeWASD2 };