import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
var LogicNodeMeshRendererComponent_inportAmbient;
var LogicNodeMeshRendererComponent_inportHidden;
var LogicNodeMeshRendererComponent_inportShadows;
var LogicNodeMeshRendererComponent_editorName;
var LogicNodeMeshRendererComponent_logicInterface;
function LogicNodeMeshRendererComponent() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeMeshRendererComponent_logicInterface = LogicNodeMeshRendererComponent_logicInterface;;
	this.type = 'MeshRendererComponent';
}

LogicNodeMeshRendererComponent.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMeshRendererComponent_editorName = "MeshRendererComponent";;

LogicNodeMeshRendererComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

LogicNodeMeshRendererComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = LogicLayer_LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (portID === LogicNodeMeshRendererComponent_inportAmbient && comp.materials.length > 0) {
		comp.meshRendererComponent.materials[0].uniforms.materialAmbient[0] = value[0];
		comp.materials[0].uniforms.materialAmbient[1] = value[1];
		comp.materials[0].uniforms.materialAmbient[2] = value[2];
	}
};

LogicNodeMeshRendererComponent.prototype.onEvent = function (instDesc, event) {
	var entity = LogicLayer_LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (event === LogicNodeMeshRendererComponent_inportShadows) {
		comp.castShadows = !comp.castShadows;
	} else if (event === LogicNodeMeshRendererComponent_inportHidden) {
		comp.hidden = !comp.hidden;
	}
};

LogicNodeMeshRendererComponent_logicInterface = new LogicInterface_LogicInterfacejs('Material');
LogicNodeMeshRendererComponent_inportShadows = LogicNodeMeshRendererComponent_logicInterface.addInputEvent("toggle-shadows");;
LogicNodeMeshRendererComponent_inportHidden = LogicNodeMeshRendererComponent_logicInterface.addInputEvent("toggle-hidden");;
LogicNodeMeshRendererComponent_inportAmbient = LogicNodeMeshRendererComponent_logicInterface.addInputProperty("ambient", "Vector3", new Vector3_Vector3js(0.5, 0.0, 0.0));;
LogicNodeMeshRendererComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});
LogicNodes_LogicNodesjs.registerType('MeshRendererComponent', LogicNodeMeshRendererComponent);

var exported_LogicNodeMeshRendererComponent = LogicNodeMeshRendererComponent;

/**
 * Logic node that connects to the MeshRendererComponent of an entity.
 * @private
 */
export { exported_LogicNodeMeshRendererComponent as LogicNodeMeshRendererComponent };