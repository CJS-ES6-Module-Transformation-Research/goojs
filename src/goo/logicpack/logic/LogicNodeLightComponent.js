var LogicNodeLightComponent_LogicNodeLightComponent = LogicNodeLightComponent;
import { resolveEntityRef as LogicLayerjs_resolveEntityRef } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeLightComponent() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeLightComponent.logicInterface;
	this.type = 'LightComponent';
}

LogicNodeLightComponent.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeLightComponent.editorName = 'LightComponent';

LogicNodeLightComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Logic interface set-up
LogicNodeLightComponent.logicInterface = new LogicInterface_LogicInterfacejs('LightComponent');
LogicNodeLightComponent.inportIntensity = LogicNodeLightComponent.logicInterface.addInputProperty('Intensity', 'float');
LogicNodeLightComponent.inportRange = LogicNodeLightComponent.logicInterface.addInputProperty('Range', 'float');

LogicNodeLightComponent.prototype.onInputChanged = function (instDesc, propID, value) {
	var entity = LogicLayerjs_resolveEntityRef(instDesc, this.entityRef);
	if (propID === LogicNodeLightComponent.inportIntensity) {
		entity.lightComponent.light.intensity = value;
	} else if (propID === LogicNodeLightComponent.inportRange) {
		entity.lightComponent.light.range = value;
	}
};

LogicNodeLightComponent.logicInterface.addConfigEntry({ name: 'entityRef', type: 'entityRef', label: 'Entity'});
LogicNodesjs_registerType('LightComponent', LogicNodeLightComponent);

/**
 * Logic node connecting to the LightComponent of an entity.
 * @private
 */
export { LogicNodeLightComponent_LogicNodeLightComponent as LogicNodeLightComponent };