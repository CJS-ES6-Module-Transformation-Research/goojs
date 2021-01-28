var mod_LogicNodeMeshRendererComponent = LogicNodeMeshRendererComponent;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";

/**
 * Logic node that connects to the MeshRendererComponent of an entity.
 * @private
 */
function LogicNodeMeshRendererComponent() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeMeshRendererComponent.logicInterface;
	this.type = 'MeshRendererComponent';
}

LogicNodeMeshRendererComponent.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeMeshRendererComponent.editorName = 'MeshRendererComponent';

LogicNodeMeshRendererComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

LogicNodeMeshRendererComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = LogicLayer_LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (portID === LogicNodeMeshRendererComponent.inportAmbient && comp.materials.length > 0) {
		comp.meshRendererComponent.materials[0].uniforms.materialAmbient[0] = value[0];
		comp.materials[0].uniforms.materialAmbient[1] = value[1];
		comp.materials[0].uniforms.materialAmbient[2] = value[2];
	}
};

LogicNodeMeshRendererComponent.prototype.onEvent = function (instDesc, event) {
	var entity = LogicLayer_LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (event === LogicNodeMeshRendererComponent.inportShadows) {
		comp.castShadows = !comp.castShadows;
	} else if (event === LogicNodeMeshRendererComponent.inportHidden) {
		comp.hidden = !comp.hidden;
	}
};

LogicNodeMeshRendererComponent.logicInterface = new LogicInterface_LogicInterface('Material');
LogicNodeMeshRendererComponent.inportShadows = LogicNodeMeshRendererComponent.logicInterface.addInputEvent('toggle-shadows');
LogicNodeMeshRendererComponent.inportHidden = LogicNodeMeshRendererComponent.logicInterface.addInputEvent('toggle-hidden');
LogicNodeMeshRendererComponent.inportAmbient = LogicNodeMeshRendererComponent.logicInterface.addInputProperty('ambient', 'Vector3', new Vector3_Vector3(0.5, 0.0, 0.0));
LogicNodeMeshRendererComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});
LogicNodes_LogicNodes.registerType('MeshRendererComponent', LogicNodeMeshRendererComponent);

/**
 * Logic node that connects to the MeshRendererComponent of an entity.
 * @private
 */
export { mod_LogicNodeMeshRendererComponent as LogicNodeMeshRendererComponent };