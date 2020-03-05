"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeLightComponent = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeLightComponent_inportRange;
var LogicNodeLightComponent_inportIntensity;
var LogicNodeLightComponent_editorName;
var LogicNodeLightComponent_logicInterface;
function LogicNodeLightComponent() {
	_LogicNode.LogicNode.call(this);
	LogicNodeLightComponent_logicInterface = LogicNodeLightComponent_logicInterface;;
	this.type = 'LightComponent';
}

LogicNodeLightComponent.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeLightComponent_editorName = "LightComponent";;

LogicNodeLightComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Logic interface set-up
LogicNodeLightComponent_logicInterface = new _LogicInterface.LogicInterface('LightComponent');
LogicNodeLightComponent_inportIntensity = LogicNodeLightComponent_logicInterface.addInputProperty("Intensity", "float");;
LogicNodeLightComponent_inportRange = LogicNodeLightComponent_logicInterface.addInputProperty("Range", "float");;

LogicNodeLightComponent.prototype.onInputChanged = function (instDesc, propID, value) {
	var entity = _LogicLayer.LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	if (propID === LogicNodeLightComponent_inportIntensity) {
		entity.lightComponent.light.intensity = value;
	} else if (propID === LogicNodeLightComponent_inportRange) {
		entity.lightComponent.light.range = value;
	}
};

LogicNodeLightComponent.logicInterface.addConfigEntry({ name: 'entityRef', type: 'entityRef', label: 'Entity' });
_LogicNodes.LogicNodes.registerType('LightComponent', LogicNodeLightComponent);

var exported_LogicNodeLightComponent = LogicNodeLightComponent;

/**
 * Logic node connecting to the LightComponent of an entity.
 * @private
 */
exports.LogicNodeLightComponent = exported_LogicNodeLightComponent;
