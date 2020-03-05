import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeLightComponent_inportRange;
var LogicNodeLightComponent_inportIntensity;
var LogicNodeLightComponent_editorName;
var LogicNodeLightComponent_logicInterface;
function LogicNodeLightComponent() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeLightComponent_logicInterface = LogicNodeLightComponent_logicInterface;;
	this.type = 'LightComponent';
}

LogicNodeLightComponent.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeLightComponent_editorName = "LightComponent";;

LogicNodeLightComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

// Logic interface set-up
LogicNodeLightComponent_logicInterface = new LogicInterface_LogicInterfacejs('LightComponent');
LogicNodeLightComponent_inportIntensity = LogicNodeLightComponent_logicInterface.addInputProperty("Intensity", "float");;
LogicNodeLightComponent_inportRange = LogicNodeLightComponent_logicInterface.addInputProperty("Range", "float");;

LogicNodeLightComponent.prototype.onInputChanged = function (instDesc, propID, value) {
	var entity = LogicLayer_LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	if (propID === LogicNodeLightComponent_inportIntensity) {
		entity.lightComponent.light.intensity = value;
	} else if (propID === LogicNodeLightComponent_inportRange) {
		entity.lightComponent.light.range = value;
	}
};

LogicNodeLightComponent.logicInterface.addConfigEntry({ name: 'entityRef', type: 'entityRef', label: 'Entity'});
LogicNodes_LogicNodesjs.registerType('LightComponent', LogicNodeLightComponent);

var exported_LogicNodeLightComponent = LogicNodeLightComponent;

/**
 * Logic node connecting to the LightComponent of an entity.
 * @private
 */
export { exported_LogicNodeLightComponent as LogicNodeLightComponent };