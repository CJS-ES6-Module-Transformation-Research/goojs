var mod_LogicNodeLightComponent = LogicNodeLightComponent;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node connecting to the LightComponent of an entity.
 * @private
 */
function LogicNodeLightComponent() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeLightComponent.logicInterface;
	this.type = 'LightComponent';
}

LogicNodeLightComponent.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeLightComponent.editorName = 'LightComponent';

LogicNodeLightComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Logic interface set-up
LogicNodeLightComponent.logicInterface = new LogicInterface_LogicInterface('LightComponent');
LogicNodeLightComponent.inportIntensity = LogicNodeLightComponent.logicInterface.addInputProperty('Intensity', 'float');
LogicNodeLightComponent.inportRange = LogicNodeLightComponent.logicInterface.addInputProperty('Range', 'float');

LogicNodeLightComponent.prototype.onInputChanged = function (instDesc, propID, value) {
	var entity = LogicLayer_LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	if (propID === LogicNodeLightComponent.inportIntensity) {
		entity.lightComponent.light.intensity = value;
	} else if (propID === LogicNodeLightComponent.inportRange) {
		entity.lightComponent.light.range = value;
	}
};

LogicNodeLightComponent.logicInterface.addConfigEntry({ name: 'entityRef', type: 'entityRef', label: 'Entity'});
LogicNodes_LogicNodes.registerType('LightComponent', LogicNodeLightComponent);

/**
 * Logic node connecting to the LightComponent of an entity.
 * @private
 */
export { mod_LogicNodeLightComponent as LogicNodeLightComponent };