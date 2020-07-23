"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeLightComponent = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeLightComponent_LogicNodeLightComponent = LogicNodeLightComponent;

function LogicNodeLightComponent() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeLightComponent.logicInterface;
	this.type = 'LightComponent';
}

LogicNodeLightComponent.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeLightComponent.editorName = 'LightComponent';

LogicNodeLightComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Logic interface set-up
LogicNodeLightComponent.logicInterface = new _LogicInterface.LogicInterface('LightComponent');
LogicNodeLightComponent.inportIntensity = LogicNodeLightComponent.logicInterface.addInputProperty('Intensity', 'float');
LogicNodeLightComponent.inportRange = LogicNodeLightComponent.logicInterface.addInputProperty('Range', 'float');

LogicNodeLightComponent.prototype.onInputChanged = function (instDesc, propID, value) {
	var entity = _LogicLayer.LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	if (propID === LogicNodeLightComponent.inportIntensity) {
		entity.lightComponent.light.intensity = value;
	} else if (propID === LogicNodeLightComponent.inportRange) {
		entity.lightComponent.light.range = value;
	}
};

LogicNodeLightComponent.logicInterface.addConfigEntry({ name: 'entityRef', type: 'entityRef', label: 'Entity' });
_LogicNodes.LogicNodes.registerType('LightComponent', LogicNodeLightComponent);

/**
 * Logic node connecting to the LightComponent of an entity.
 * @private
 */
exports.LogicNodeLightComponent = LogicNodeLightComponent_LogicNodeLightComponent;