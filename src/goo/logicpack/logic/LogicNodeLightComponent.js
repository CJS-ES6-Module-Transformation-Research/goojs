import { LogicLayer } from "./LogicLayer";
import { LogicNode } from "./LogicNode";
import * as LogicNodes from "./LogicNodes";
import { LogicInterface } from "./LogicInterface";
function LogicNodeLightComponent() {
	LogicNode.call(this);
	this.logicInterface = LogicNodeLightComponent.logicInterface;
	this.type = 'LightComponent';
}

LogicNodeLightComponent.prototype = Object.create(LogicNode.prototype);
LogicNodeLightComponent.editorName = 'LightComponent';

LogicNodeLightComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Logic interface set-up
LogicNodeLightComponent.logicInterface = new LogicInterface('LightComponent');
LogicNodeLightComponent.inportIntensity = LogicNodeLightComponent.logicInterface.addInputProperty('Intensity', 'float');
LogicNodeLightComponent.inportRange = LogicNodeLightComponent.logicInterface.addInputProperty('Range', 'float');

LogicNodeLightComponent.prototype.onInputChanged = function (instDesc, propID, value) {
	var entity = LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	if (propID === LogicNodeLightComponent.inportIntensity) {
		entity.lightComponent.light.intensity = value;
	} else if (propID === LogicNodeLightComponent.inportRange) {
		entity.lightComponent.light.range = value;
	}
};

LogicNodeLightComponent.logicInterface.addConfigEntry({ name: 'entityRef', type: 'entityRef', label: 'Entity'});
LogicNodes.registerType('LightComponent', LogicNodeLightComponent);

var exported_LogicNodeLightComponent = LogicNodeLightComponent;

/**
 * Logic node connecting to the LightComponent of an entity.
 * @private
 */
export { exported_LogicNodeLightComponent as LogicNodeLightComponent };