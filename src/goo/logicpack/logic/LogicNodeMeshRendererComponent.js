import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
function LogicNodeMeshRendererComponent() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeMeshRendererComponent.logicInterface;
	this.type = 'MeshRendererComponent';
}

LogicNodeMeshRendererComponent.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMeshRendererComponent.editorName = 'MeshRendererComponent';

LogicNodeMeshRendererComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

LogicNodeMeshRendererComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = LogicLayer_LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (portID === LogicNodeMeshRendererComponent.inportAmbient && comp.materials.length > 0) {
		comp.meshRendererComponent.materials[0].uniforms.materialAmbient[0] = value[0];
		comp.materials[0].uniforms.materialAmbient[1] = value[1];
		comp.materials[0].uniforms.materialAmbient[2] = value[2];
	}
};

LogicNodeMeshRendererComponent.prototype.onEvent = function (instDesc, event) {
	var entity = LogicLayer_LogicLayerjs.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (event === LogicNodeMeshRendererComponent.inportShadows) {
		comp.castShadows = !comp.castShadows;
	} else if (event === LogicNodeMeshRendererComponent.inportHidden) {
		comp.hidden = !comp.hidden;
	}
};

LogicNodeMeshRendererComponent.logicInterface = new LogicInterface_LogicInterfacejs('Material');
LogicNodeMeshRendererComponent.inportShadows = LogicNodeMeshRendererComponent.logicInterface.addInputEvent('toggle-shadows');
LogicNodeMeshRendererComponent.inportHidden = LogicNodeMeshRendererComponent.logicInterface.addInputEvent('toggle-hidden');
LogicNodeMeshRendererComponent.inportAmbient = LogicNodeMeshRendererComponent.logicInterface.addInputProperty('ambient', 'Vector3', new mathVector3_Vector3js(0.5, 0.0, 0.0));
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