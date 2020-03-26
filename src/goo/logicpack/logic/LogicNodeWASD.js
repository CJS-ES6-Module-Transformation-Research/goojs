import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeWASD() {
	LogicNode_LogicNodejs.call(this);
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
			LogicLayer_LogicLayerjs.fireEvent(this.logicInstance, keyEvent);
		}
	}.bind(this);
	this.eventListenerUp = function (event) {
		var character = String.fromCharCode(event.which).toLowerCase();
		if (preventRepeat[character]) {
			preventRepeat[character] = false;
		}
		var keyEvent = LogicNodeWASD.upKeys[character];
		if (keyEvent) {
			LogicLayer_LogicLayerjs.fireEvent(this.logicInstance, keyEvent);
		}
	}.bind(this);
}

LogicNodeWASD.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeWASD.editorName = 'WASD';

LogicNodeWASD.prototype.onSystemStarted = function () {
	document.addEventListener('keydown', this.eventListenerDown);
	document.addEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD.prototype.onSystemStopped = function () {
	document.removeEventListener('keydown', this.eventListenerDown);
	document.removeEventListener('keyup', this.eventListenerUp);
};

LogicNodeWASD.logicInterface = new LogicInterface_LogicInterfacejs();
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

LogicNodes_LogicNodesjs.registerType('LogicNodeWASD', LogicNodeWASD);

var exported_LogicNodeWASD = LogicNodeWASD;

/**
 * Logic node handling WASD input.
 * @private
 */
export { exported_LogicNodeWASD as LogicNodeWASD };