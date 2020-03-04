import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3js } from "../../math/Vector3";
var LogicNodeMeshRendererComponent_inportAmbient;
var LogicNodeMeshRendererComponent_inportHidden;
var LogicNodeMeshRendererComponent_inportShadows;
var LogicNodeMeshRendererComponent_editorName;
var LogicNodeMeshRendererComponent_logicInterface;
function LogicNodeMeshRendererComponent() {
	LogicNodejs.call(this);
	LogicNodeMeshRendererComponent_logicInterface = LogicNodeMeshRendererComponent_logicInterface;;
	this.type = 'MeshRendererComponent';
}

LogicNodeMeshRendererComponent.prototype = Object.create(LogicNodejs.prototype);
LogicNodeMeshRendererComponent_editorName = "MeshRendererComponent";;

LogicNodeMeshRendererComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

LogicNodeMeshRendererComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (portID === LogicNodeMeshRendererComponent_inportAmbient && comp.materials.length > 0) {
		comp.meshRendererComponent.materials[0].uniforms.materialAmbient[0] = value[0];
		comp.materials[0].uniforms.materialAmbient[1] = value[1];
		comp.materials[0].uniforms.materialAmbient[2] = value[2];
	}
};

LogicNodeMeshRendererComponent.prototype.onEvent = function (instDesc, event) {
	var entity = LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (event === LogicNodeMeshRendererComponent_inportShadows) {
		comp.castShadows = !comp.castShadows;
	} else if (event === LogicNodeMeshRendererComponent_inportHidden) {
		comp.hidden = !comp.hidden;
	}
};

LogicNodeMeshRendererComponent_logicInterface = new LogicInterfacejs('Material');
LogicNodeMeshRendererComponent_inportShadows = LogicNodeMeshRendererComponent_logicInterface.addInputEvent("toggle-shadows");;
LogicNodeMeshRendererComponent_inportHidden = LogicNodeMeshRendererComponent_logicInterface.addInputEvent("toggle-hidden");;
LogicNodeMeshRendererComponent_inportAmbient = LogicNodeMeshRendererComponent_logicInterface.addInputProperty("ambient", "Vector3", new Vector3js(0.5, 0.0, 0.0));;
LogicNodeMeshRendererComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});
LogicNodesjs.registerType('MeshRendererComponent', LogicNodeMeshRendererComponent);

var exported_LogicNodeMeshRendererComponent = LogicNodeMeshRendererComponent;

/**
 * Logic node that connects to the MeshRendererComponent of an entity.
 * @private
 */
export { exported_LogicNodeMeshRendererComponent as LogicNodeMeshRendererComponent };