import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeLightComponent_inportRange;
var LogicNodeLightComponent_inportIntensity;
var LogicNodeLightComponent_editorName;
var LogicNodeLightComponent_logicInterface;
function LogicNodeLightComponent() {
	LogicNodejs.call(this);
	LogicNodeLightComponent_logicInterface = LogicNodeLightComponent_logicInterface;;
	this.type = 'LightComponent';
}

LogicNodeLightComponent.prototype = Object.create(LogicNodejs.prototype);
LogicNodeLightComponent_editorName = "LightComponent";;

LogicNodeLightComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Logic interface set-up
LogicNodeLightComponent_logicInterface = new LogicInterfacejs('LightComponent');
LogicNodeLightComponent_inportIntensity = LogicNodeLightComponent_logicInterface.addInputProperty("Intensity", "float");;
LogicNodeLightComponent_inportRange = LogicNodeLightComponent_logicInterface.addInputProperty("Range", "float");;

LogicNodeLightComponent.prototype.onInputChanged = function (instDesc, propID, value) {
	var entity = LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	if (propID === LogicNodeLightComponent_inportIntensity) {
		entity.lightComponent.light.intensity = value;
	} else if (propID === LogicNodeLightComponent_inportRange) {
		entity.lightComponent.light.range = value;
	}
};

LogicNodeLightComponent.logicInterface.addConfigEntry({ name: 'entityRef', type: 'entityRef', label: 'Entity'});
LogicNodesjs.registerType('LightComponent', LogicNodeLightComponent);

var exported_LogicNodeLightComponent = LogicNodeLightComponent;

/**
 * Logic node connecting to the LightComponent of an entity.
 * @private
 */
export { exported_LogicNodeLightComponent as LogicNodeLightComponent };